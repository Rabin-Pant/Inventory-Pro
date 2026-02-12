from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Category, User

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('/', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([c.to_dict() for c in categories])

@categories_bp.route('/', methods=['POST'])
@jwt_required()
def create_category():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    
    if user.role != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    
    data = request.get_json()
    
    if Category.query.filter_by(name=data['name']).first():
        return jsonify({'error': 'Category already exists'}), 400
    
    category = Category(name=data['name'])
    db.session.add(category)
    db.session.commit()
    
    return jsonify(category.to_dict()), 201

@categories_bp.route('/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    
    if user.role != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    
    category = Category.query.get_or_404(category_id)
    
    # Check if category has products
    if category.products:
        return jsonify({'error': f'Cannot delete category "{category.name}" because it has {len(category.products)} products'}), 400
    
    db.session.delete(category)
    db.session.commit()
    
    return jsonify({'message': 'Category deleted successfully'})