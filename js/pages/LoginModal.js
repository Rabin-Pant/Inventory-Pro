function LoginModal({ role, onClose, onSwitchToRegister, email, setEmail, password, setPassword, handleLogin }) {
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
                                placeholder="yourname@example.com"
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
                        
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                            Login
                        </button>
                        
                        {role === 'customer' && (
                            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                <span style={{ color: '#6c757d' }}>Don't have an account? </span>
                                <button 
                                    type="button"
                                    onClick={onSwitchToRegister}  // ← FIXED: No more alert!
                                    style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        color: '#667eea', 
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Register here
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

window.LoginModal = LoginModal;