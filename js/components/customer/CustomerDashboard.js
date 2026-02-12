function CustomerDashboard() {
    const { setCurrentPage, orders, user } = useAppContext();

    const userOrders = orders?.filter(order => order.customer_email === user?.email) || [];
    const pendingOrders = userOrders.filter(o => o.status === 'pending').length;
    const totalSpent = userOrders.reduce((sum, order) => 
        sum + (order.final_total || order.total), 0
    );

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '30px' }}>Welcome back, {user?.name}!</h2>
            
            <div className="row">
                <div className="col-md-4">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-bag-check"></i>
                        </div>
                        <div className="stat-value">{userOrders.length}</div>
                        <div className="stat-label">Total Orders</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="stat-icon">
                            <i className="bi bi-clock-history"></i>
                        </div>
                        <div className="stat-value">{pendingOrders}</div>
                        <div className="stat-label">Pending Orders</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="stat-icon">
                            <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="stat-value">${totalSpent.toFixed(0)}</div>
                        <div className="stat-label">Total Spent</div>
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-md-6">
                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                        <i className="bi bi-grid" style={{ fontSize: '64px', color: '#667eea', marginBottom: '20px' }}></i>
                        <h4>Browse Products</h4>
                        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                            Explore our wide range of products
                        </p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setCurrentPage('customer-products')}
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                        <i className="bi bi-bag-check" style={{ fontSize: '64px', color: '#667eea', marginBottom: '20px' }}></i>
                        <h4>My Orders</h4>
                        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                            Track and view your order history
                        </p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setCurrentPage('customer-orders')}
                        >
                            View Orders
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

window.CustomerDashboard = CustomerDashboard;