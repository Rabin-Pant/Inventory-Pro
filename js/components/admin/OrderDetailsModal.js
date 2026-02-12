function OrderDetailsModal({ order, onClose, onUpdateStatus }) {
    const [status, setStatus] = React.useState(order.status);
    const [deliveryDate, setDeliveryDate] = React.useState(
        order.delivery_date ? new Date(order.delivery_date).toISOString().split('T')[0] : ''
    );
    const [notes, setNotes] = React.useState(order.admin_notes || '');

    const handleUpdate = () => {
        onUpdateStatus(order.id, status, deliveryDate ? new Date(deliveryDate).toISOString() : null, notes);
        onClose();
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
                <div className="modal-header">
                    <h3>Order Details #{order.order_number?.slice(-6)}</h3>
                    <button 
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <div style={{ marginBottom: '20px' }}>
                        <h5>Customer Information</h5>
                        <p><strong>Name:</strong> {order.customer_name}</p>
                        <p><strong>Email:</strong> {order.customer_email}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Address:</strong> {order.shipping_address}</p>
                        <p><strong>Payment:</strong> {order.payment_method}</p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h5>Order Items</h5>
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
                                <div>
                                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h5>Order Total</h5>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span>Subtotal:</span>
                            <span>${order.total?.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span>Shipping:</span>
                            <span>${order.shipping_cost?.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Tax:</span>
                            <span>${order.tax?.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Total:</strong>
                            <strong>${(order.final_total || order.total).toFixed(2)}</strong>
                        </div>
                    </div>

                    <div>
                        <h5>Update Order Status</h5>
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select 
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Delivery Date (Optional)</label>
                            <input 
                                type="date"
                                className="form-control"
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Admin Notes (Optional)</label>
                            <textarea 
                                className="form-control"
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add notes about this order..."
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Update Order
                    </button>
                </div>
            </div>
        </div>
    );
}

window.OrderDetailsModal = OrderDetailsModal;