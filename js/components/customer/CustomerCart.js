function CustomerCart() {
    const { cart, updateCartQuantity, removeFromCart, placeOrder, setCurrentPage } = useAppContext();
    const [checkout, setCheckout] = React.useState(false);

    const total = cart?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
    const shippingCost = 10.00;
    const tax = total * 0.08;
    const finalTotal = total + shippingCost + tax;

    if (checkout) {
        return <CheckoutForm 
            total={finalTotal} 
            subtotal={total}
            shipping={shippingCost}
            tax={tax}
            onBack={() => setCheckout(false)} 
        />;
    }

    if (!cart || cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="bi bi-cart-x" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                <h4 style={{ marginTop: '15px' }}>Your cart is empty</h4>
                <p style={{ color: '#6c757d' }}>Add some products to get started</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentPage('customer-products')}
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '20px' }}>Shopping Cart</h2>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card">
                        <div style={{ overflow: 'auto' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <img 
                                                        src={item.image} 
                                                        style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }}
                                                        alt={item.name}
                                                    />
                                                    <div>
                                                        <strong>{item.name}</strong>
                                                        <div style={{ color: '#6c757d', fontSize: '14px' }}>{item.category}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${item.price?.toFixed(2)}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <button 
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{ padding: '0 10px' }}>{item.quantity}</span>
                                                    <button 
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div style={{ padding: '20px', borderBottom: '1px solid #e1e5e9' }}>
                            <h5 style={{ margin: 0 }}>Order Summary</h5>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Subtotal:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Shipping:</span>
                                    <span>${shippingCost.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Tax (8%):</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <h5 style={{ margin: 0 }}>Total:</h5>
                                <h5 style={{ margin: 0, color: '#667eea' }}>${finalTotal.toFixed(2)}</h5>
                            </div>
                            <button 
                                className="btn btn-primary"
                                onClick={() => setCheckout(true)}
                                style={{ width: '100%' }}
                            >
                                <i className="bi bi-arrow-right"></i> Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

window.CustomerCart = CustomerCart;