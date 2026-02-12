function RegisterModal({ onClose, onSwitchToLogin }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    
    const { ApiService } = window;

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Full name is required');
            return;
        }
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await ApiService.register({
                name,
                email,
                password,
                phone,
                address
            });
            setSuccess(true);
            setTimeout(() => {
                onSwitchToLogin();
            }, 2000);
        } catch (error) {
            setError(error.message || 'Registration failed. Email may already be in use.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="modal" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3 style={{ color: '#28a745' }}>✅ Registration Successful!</h3>
                        <button 
                            onClick={onClose}
                            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="modal-body" style={{ textAlign: 'center', padding: '40px' }}>
                        <i className="bi bi-check-circle" style={{ fontSize: '64px', color: '#28a745' }}></i>
                        <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Welcome, {name}!</h4>
                        <p style={{ color: '#6c757d' }}>Your account has been created successfully.</p>
                        <p style={{ color: '#6c757d' }}>Redirecting you to login...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                <div className="modal-header">
                    <h3><i className="bi bi-person-plus" style={{ marginRight: '10px', color: '#667eea' }}></i> Create Customer Account</h3>
                    <button 
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{ 
                                padding: '12px', 
                                background: '#ffebee', 
                                color: '#c62828', 
                                borderRadius: '4px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <i className="bi bi-exclamation-triangle"></i>
                                <span>{error}</span>
                            </div>
                        )}
                        
                        <div className="form-group">
                            <label className="form-label">
                                <i className="bi bi-person"></i> Full Name <span style={{ color: '#dc3545' }}>*</span>
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">
                                <i className="bi bi-envelope"></i> Email Address <span style={{ color: '#dc3545' }}>*</span>
                            </label>
                            <input 
                                type="email" 
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="yourname@example.com"
                                required
                            />
                            <small style={{ color: '#6c757d', fontSize: '12px' }}>
                                We'll never share your email. Use a real email address.
                            </small>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        <i className="bi bi-lock"></i> Password <span style={{ color: '#dc3545' }}>*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 6 characters"
                                        required
                                        minLength="6"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        <i className="bi bi-lock-fill"></i> Confirm Password <span style={{ color: '#dc3545' }}>*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter password"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">
                                <i className="bi bi-telephone"></i> Phone Number (Optional)
                            </label>
                            <input 
                                type="tel" 
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 234 567 8900"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">
                                <i className="bi bi-house"></i> Shipping Address (Optional)
                            </label>
                            <textarea 
                                className="form-control"
                                rows="2"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Street, City, State, ZIP"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            style={{ width: '100%', marginTop: '10px' }}
                            disabled={loading}
                        >
                            {loading ? (
                                <span>
                                    <i className="bi bi-arrow-repeat spinning"></i> Creating Account...
                                </span>
                            ) : (
                                <span>
                                    <i className="bi bi-person-plus"></i> Register
                                </span>
                            )}
                        </button>
                        
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <span style={{ color: '#6c757d' }}>Already have an account? </span>
                            <button 
                                type="button"
                                onClick={onSwitchToLogin}
                                style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    color: '#667eea', 
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    fontWeight: '500'
                                }}
                            >
                                Sign In Here
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

window.RegisterModal = RegisterModal;