from flask import Blueprint, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Invoice, User, Order
import io

invoices_bp = Blueprint('invoices', __name__)

@invoices_bp.route('/', methods=['GET'])
@jwt_required()
def get_invoices():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role == 'admin':
        invoices = Invoice.query.order_by(Invoice.created_at.desc()).all()
    else:
        invoices = Invoice.query.join(Order).filter(Order.user_id == user_id).order_by(Invoice.created_at.desc()).all()
    
    return jsonify([i.to_dict() for i in invoices])

@invoices_bp.route('/<int:invoice_id>', methods=['GET'])
@jwt_required()
def get_invoice(invoice_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    invoice = Invoice.query.get_or_404(invoice_id)
    
    if user.role != 'admin' and invoice.order.user_id != user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    return jsonify(invoice.to_dict())

@invoices_bp.route('/<int:invoice_id>/download', methods=['GET'])
@jwt_required()
def download_invoice(invoice_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    invoice = Invoice.query.get_or_404(invoice_id)
    
    if user.role != 'admin' and invoice.order.user_id != user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Create text file for download
    file_data = invoice.content.encode('utf-8')
    file_stream = io.BytesIO(file_data)
    file_stream.seek(0)
    
    return send_file(
        file_stream,
        as_attachment=True,
        download_name=f'invoice-{invoice.invoice_number}.txt',
        mimetype='text/plain'
    )