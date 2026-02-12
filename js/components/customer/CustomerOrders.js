function CustomerOrders() {
    const { orders, user, setCurrentPage } = useAppContext();

    const userOrders = orders?.filter(order => order.customer_email === user?.email) || [];

    if (userOrders.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="bi bi-bag-x" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                <h4 style={{ marginTop: '15px' }}>No orders yet</h4>
                <p style={{ color: '#6c757d' }}>Start shopping to see your orders here</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentPage('customer-products')}
                >
                    Browse Products
                </button>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'warning';
            case 'processing': return 'info';
            case 'shipped': return 'primary';
            case 'delivered': return 'success';
            case 'cancelled': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '20px' }}>My Orders</h2>
            <div className="row">
                {userOrders.map(order => (
                    <div key={order.id} className="col-12" style={{ marginBottom: '20px' }}>
                        <div className="card">
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>Order #{order.order_number?.slice(-6)}</h4>
                                        <p style={{ color: '#6c757d', marginBottom: '0' }}>
                                            Placed on {new Date(order.date).toLocaleString()}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span className={`badge badge-${getStatusColor(order.status)}`} style={{ fontSize: '14px' }}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                        <h4 style={{ marginTop: '10px', color: '#667eea' }}>
                                            ${(order.final_total || order.total).toFixed(2)}
                                        </h4>
                                    </div>
                                </div>
                                
                                <div className="order-details">
                                    <h5 style={{ marginBottom: '15px' }}>Order Details</h5>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Shipping Address:</strong>
                                        <p style={{ margin: '5px 0', color: '#6c757d' }}>{order.shipping_address}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Payment Method:</strong>
                                        <p style={{ margin: '5px 0', color: '#6c757d' }}>
                                            {order.payment_method === 'credit_card' ? 'Credit Card' : 
                                             order.payment_method === 'paypal' ? 'PayPal' : 
                                             'Cash on Delivery'}
                                        </p>
                                    </div>
                                    {order.delivery_date && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <strong>Estimated Delivery:</strong>
                                            <p style={{ margin: '5px 0', color: '#6c757d' }}>
                                                {new Date(order.delivery_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                    {order.admin_notes && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <strong>Admin Notes:</strong>
                                            <p style={{ margin: '5px 0', color: '#6c757d' }}>{order.admin_notes}</p>
                                        </div>
                                    )}
                                    
                                    <hr style={{ margin: '15px 0' }} />
                                    
                                    <h6 style={{ marginBottom: '10px' }}>Items Ordered:</h6>
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="order-item">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img 
                                                    src={item.image} 
                                                    style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} 
                                                    alt={item.name} 
                                                />
                                                <div>
                                                    <strong>{item.name}</strong>
                                                    <div style={{ color: '#6c757d', fontSize: '14px' }}>Qty: {item.quantity}</div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div>${item.price?.toFixed(2)} each</div>
                                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

window.CustomerOrders = CustomerOrders;