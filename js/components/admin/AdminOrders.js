function AdminOrders() {
    const { orders, updateOrderStatus } = useAppContext();
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [filterStatus, setFilterStatus] = React.useState('all');

    const filteredOrders = filterStatus === 'all' 
        ? orders 
        : orders?.filter(o => o.status === filterStatus);

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '20px' }}>Orders Management</h2>

            <div className="card" style={{ marginBottom: '20px' }}>
                <div style={{ padding: '20px' }}>
                    <select 
                        className="form-control"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders?.map(order => (
                            <tr key={order.id}>
                                <td>#{order.order_number?.slice(-6)}</td>
                                <td>{order.customer_name}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
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
                                <td>
                                    <button 
                                        className="btn btn-info btn-sm"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <i className="bi bi-eye"></i> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <OrderDetailsModal 
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdateStatus={updateOrderStatus}
                />
            )}
        </React.Fragment>
    );
}

window.AdminOrders = AdminOrders;