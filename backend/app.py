from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db, User, Category, Product, Order, Invoice
from routes.auth import auth_bp
from routes.products import products_bp
from routes.orders import orders_bp
from routes.categories import categories_bp
from routes.invoices import invoices_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app, origins=['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5500'])
    db.init_app(app)
    jwt = JWTManager(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')
    app.register_blueprint(categories_bp, url_prefix='/api/categories')
    app.register_blueprint(invoices_bp, url_prefix='/api/invoices')
    
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy'})
    
    return app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Create sample data if database is empty
        if Category.query.count() == 0:
            categories = [
                Category(name='Electronics'),
                Category(name='Sports'),
                Category(name='Home Appliances'),
                Category(name='Books')
            ]
            db.session.add_all(categories)
            db.session.commit()
            
            # Sample products
            products = [
                Product(
                    name='Smartphone X',
                    category_id=1,
                    price=699.99,
                    stock=50,
                    image='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    description='Latest smartphone with advanced features'
                ),
                Product(
                    name='Wireless Headphones',
                    category_id=1,
                    price=149.99,
                    stock=100,
                    image='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    description='Noise-cancelling wireless headphones'
                ),
                Product(
                    name='Laptop Pro',
                    category_id=1,
                    price=1299.99,
                    stock=25,
                    image='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    description='High-performance laptop for professionals'
                ),
                Product(
                    name='Running Shoes',
                    category_id=2,
                    price=89.99,
                    stock=75,
                    image='https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    description='Comfortable running shoes for athletes'
                ),
                Product(
                    name='Coffee Maker',
                    category_id=3,
                    price=129.99,
                    stock=40,
                    image='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    description='Automatic coffee maker with timer'
                ),
                Product(
                    name='Fiction Book Set',
                    category_id=4,
                    price=49.99,
                    stock=60,
                    image='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    description='Collection of bestselling fiction books'
                ),
                Product(
                    name='Yoga Mat',
                    category_id=2,
                    price=34.99,
                    stock=85,
                    image='https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    description='Non-slip yoga mat with carrying strap'
                ),
                Product(
                    name='Bluetooth Speaker',
                    category_id=1,
                    price=79.99,
                    stock=45,
                    image='https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                    description='Portable waterproof Bluetooth speaker'
                )
            ]
            db.session.add_all(products)
            db.session.commit()
            
            # Create admin user
            admin = User(
                email='admin@inventorypro.com',
                name='Admin',
                role='admin',
                phone='1234567890',
                address='Admin Office'
            )
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            
            # Create demo customer
            customer = User(
                email='customer@example.com',
                name='John Doe',
                role='customer',
                phone='9876543210',
                address='123 Main St, City, Country'
            )
            customer.set_password('customer123')
            db.session.add(customer)
            db.session.commit()
    
    app.run(debug=True, host='0.0.0.0', port=5000)