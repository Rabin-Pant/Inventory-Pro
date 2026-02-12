function CheckoutForm({ total, subtotal, shipping, tax, onBack }) {
    const { placeOrder, user } = useAppContext();
    const [formData, setFormData] = React.useState({
        address: user?.address || '',
        phone: user?.phone || '',
        paymentMethod: 'credit_card'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        placeOrder(formData);
    };

    return (
        <React.Fragment>
            <h2 style={{ marginBottom: '20px' }}>Checkout</h2>
            <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div style={{ padding: '20px', borderBottom: '1px solid #e1e5e9' }}>
                            <h5 style={{ margin: 0 }}>Shipping Information</h5>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Shipping Address</label>
                                    <textarea 
                                        className="form-control"
                                        rows="3"
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input 
                                        type="tel"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Payment Method</label>
                                    <select 
                                        className="form-control"
                                        value={formData.paymentMethod}
                                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                                        required
                                    >
                                        <option value="credit_card">Credit Card</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="cod">Cash on Delivery</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                    <button type="button" className="btn btn-secondary" onClick={onBack}>
                                        Back to Cart
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Place Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card">
                        <div style={{ padding: '20px', borderBottom: '1px solid #e1e5e9' }}>
                            <h5 style={{ margin: 0 }}>Order Summary</h5>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Shipping:</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Tax (8%):</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5 style={{ margin: 0 }}>Total:</h5>
                                <h5 style={{ margin: 0, color: '#667eea' }}>${total.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

window.CheckoutForm = CheckoutForm;