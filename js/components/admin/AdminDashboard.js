function AdminDashboard() {
    const { products, orders } = useAppContext();

    const totalRevenue = orders?.reduce((sum, order) => 
        sum + (order.final_total || order.total), 0
    ) || 0;
    const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
    const lowStockProducts = products?.filter(p => p.stock < 10).length || 0;

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '30px' }}>Dashboard Overview</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="bi bi-box-seam"></i>
                        </div>
                        <div className="stat-value">{products?.length || 0}</div>
                        <div className="stat-label">Total Products</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="stat-icon">
                            <i className="bi bi-cart-check"></i>
                        </div>
                        <div className="stat-value">{orders?.length || 0}</div>
                        <div className="stat-label">Total Orders</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="stat-icon">
                            <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="stat-value">${totalRevenue.toFixed(0)}</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                        <div className="stat-icon">
                            <i className="bi bi-exclamation-triangle"></i>
                        </div>
                        <div className="stat-value">{lowStockProducts}</div>
                        <div className="stat-label">Low Stock Items</div>
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-md-6">
                    <div className="card">
                        <div style={{ padding: '20px', borderBottom: '1px solid #e1e5e9' }}>
                            <h5 style={{ margin: 0 }}>Recent Orders</h5>
                        </div>
                        <div style={{ padding: '20px' }}>
                            {!orders || orders.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#6c757d' }}>No orders yet</p>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Customer</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.slice(0, 5).map(order => (
                                            <tr key={order.id}>
                                                <td>#{order.order_number?.slice(-6)}</td>
                                                <td>{order.customer_name}</td>
                                                <td>${(order.final_total || order.total).toFixed(2)}</td>
                                                <td>
                                                    <span className={`badge badge-${
                                                        order.status === 'pending' ? 'warning' :
                                                        order.status === 'processing' ? 'info' :
                                                        order.status === 'shipped' ? 'primary' :
                                                        order.status === 'delivered' ? 'success' :
                                                        'danger'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div style={{ padding: '20px', borderBottom: '1px solid #e1e5e9' }}>
                            <h5 style={{ margin: 0 }}>Low Stock Products</h5>
                        </div>
                        <div style={{ padding: '20px' }}>
                            {lowStockProducts === 0 ? (
                                <p style={{ textAlign: 'center', color: '#6c757d' }}>All products are well stocked</p>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Stock</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.filter(p => p.stock < 10).map(product => (
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td>{product.stock}</td>
                                                <td>
                                                    <span className="badge badge-danger">
                                                        Low Stock
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

window.AdminDashboard = AdminDashboard;