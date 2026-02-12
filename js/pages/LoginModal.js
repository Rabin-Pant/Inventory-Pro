function LoginModal({ role, onClose, email, setEmail, password, setPassword, handleLogin }) {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{role === 'admin' ? 'Admin Login' : 'Customer Login'}</h3>
                    <button 
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '6px' }}>
                            <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                                <strong>Demo Credentials:</strong><br />
                                Admin: admin@inventorypro.com / admin123<br />
                                Customer: customer@example.com / customer123
                            </p>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

window.LoginModal = LoginModal;