from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Order, OrderItem, Product, User, Invoice
from datetime import datetime
import random
import string

orders_bp = Blueprint('orders', __name__)

def generate_order_number():
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"ORD-{timestamp}-{random_str}"

def generate_invoice_content(order):
    content = f"""========================================
          INVOICE - ORDER #{order.order_number}
========================================

Order Date: {order.created_at.strftime('%Y-%m-%d %H:%M:%S')}
Customer: {order.user.name}
Email: {order.user.email}
Phone: {order.phone}
Shipping Address: {order.shipping_address}
Payment Method: {order.payment_method}
Status: {order.status.upper()}

----------------------------------------
            ORDER ITEMS
----------------------------------------

"""
    
    for idx, item in enumerate(order.items, 1):
        content += f"{idx}. {item.product_name}\n"
        content += f"   Category: {item.category}\n"
        content += f"   Price: ${item.product_price:.2f}\n"
        content += f"   Quantity: {item.quantity}\n"
        content += f"   Subtotal: ${(item.product_price * item.quantity):.2f}\n\n"
    
    content += f"""----------------------------------------
              SUMMARY
----------------------------------------

Subtotal: ${order.total:.2f}
Shipping: ${order.shipping_cost:.2f}
Tax (8%): ${order.tax:.2f}
----------------------------------------
TOTAL: ${order.final_total:.2f}
========================================

Thank you for your purchase!
InventoryPro System
"""
    return content

@orders_bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role == 'admin':
        orders = Order.query.order_by(Order.created_at.desc()).all()
    else:
        orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    
    return jsonify([o.to_dict() for o in orders])

@orders_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    order = Order.query.get_or_404(order_id)
    
    if user.role != 'admin' and order.user_id != user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    return jsonify(order.to_dict())

@orders_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    data = request.get_json()
    
    # Calculate totals
    subtotal = 0
    items_data = []
    
    for item in data['items']:
        product = Product.query.get(item['id'])
        if not product:
            return jsonify({'error': f'Product {item["id"]} not found'}), 400
        
        if product.stock < item['quantity']:
            return jsonify({'error': f'Insufficient stock for {product.name}'}), 400
        
        subtotal += product.price * item['quantity']
        items_data.append({
            'product': product,
            'quantity': item['quantity']
        })
    
    shipping_cost = 10.00
    tax = subtotal * 0.08
    final_total = subtotal + shipping_cost + tax
    
    # Create order
    order = Order(
        order_number=generate_order_number(),
        user_id=user_id,
        total=subtotal,
        shipping_cost=shipping_cost,
        tax=tax,
        final_total=final_total,
        shipping_address=data['shipping_address'],
        phone=data['phone'],
        payment_method=data['payment_method'],
        status='pending'
    )
    
    db.session.add(order)
    db.session.flush()
    
    # Create order items and update stock
    for item_data in items_data:
        product = item_data['product']
        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            product_name=product.name,
            product_price=product.price,
            quantity=item_data['quantity'],
            category=product.category_rel.name,
            image=product.image
        )
        db.session.add(order_item)
        
        # Update stock
        product.stock -= item_data['quantity']
    
    db.session.flush()
    
    # Generate and save invoice
    invoice_content = generate_invoice_content(order)
    invoice = Invoice(
        order_id=order.id,
        invoice_number=f"INV-{order.order_number[4:]}",
        content=invoice_content
    )
    db.session.add(invoice)
    
    db.session.commit()
    
    return jsonify(order.to_dict()), 201

@orders_bp.route('/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'error': 'Admin access required'}), 403
    
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    
    order.status = data.get('status', order.status)
    
    if 'delivery_date' in data and data['delivery_date']:
        order.delivery_date = datetime.fromisoformat(data['delivery_date'].replace('Z', '+00:00'))
    
    order.admin_notes = data.get('admin_notes', order.admin_notes)
    
    db.session.commit()
    
    return jsonify(order.to_dict())