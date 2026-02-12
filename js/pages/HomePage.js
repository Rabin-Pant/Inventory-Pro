function HomePage() {
    const { login } = useAppContext();
    const [showLogin, setShowLogin] = React.useState(false);
    const [showRegister, setShowRegister] = React.useState(false);
    const [loginRole, setLoginRole] = React.useState('customer');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email && password) {
            await login(email, password, loginRole);
            setShowLogin(false);
        }
    };

    const switchToRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const switchToLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    return (
        <React.Fragment>
            <nav className="navbar">
                <div className="container navbar-container">
                    <a href="#" className="navbar-brand">
                        <i className="bi bi-box-seam"></i>
                        InventoryPro
                    </a>
                    <ul className="navbar-nav">
                        <li>
                            <button 
                                className="btn btn-outline"
                                onClick={() => {
                                    setLoginRole('customer');
                                    setShowLogin(true);
                                }}
                            >
                                Customer Login
                            </button>
                        </li>
                        <li>
                            <button 
                                className="btn btn-primary"
                                onClick={() => {
                                    setLoginRole('admin');
                                    setShowLogin(true);
                                }}
                            >
                                Admin Login
                            </button>
                        </li>
                        <li>
                            <button 
                                className="btn btn-success"
                                onClick={() => setShowRegister(true)}
                                style={{ background: '#28a745' }}
                            >
                                <i className="bi bi-person-plus"></i> Register
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <section className="hero-section">
                <div className="container">
                    <h1 className="hero-title">InventoryPro</h1>
                    <p className="hero-description">
                        Complete Inventory Management System for Modern Businesses
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button 
                            className="btn btn-lg"
                            style={{ background: 'white', color: '#667eea' }}
                            onClick={() => {
                                setLoginRole('customer');
                                setShowLogin(true);
                            }}
                        >
                            Shop Now
                        </button>
                        <button 
                            className="btn btn-outline btn-lg"
                            style={{ borderColor: 'white', color: 'white' }}
                            onClick={() => {
                                setLoginRole('admin');
                                setShowLogin(true);
                            }}
                        >
                            Admin Access
                        </button>
                    </div>
                </div>
            </section>

            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card" style={{ textAlign: 'center', height: '100%' }}>
                                <i className="feature-icon bi bi-box-seam"></i>
                                <h3>Product Management</h3>
                                <p style={{ color: '#6c757d' }}>
                                    Easily manage your inventory with our intuitive interface
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card" style={{ textAlign: 'center', height: '100%' }}>
                                <i className="feature-icon bi bi-cart-check"></i>
                                <h3>Order Tracking</h3>
                                <p style={{ color: '#6c757d' }}>
                                    Track orders from placement to delivery in real-time
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card" style={{ textAlign: 'center', height: '100%' }}>
                                <i className="feature-icon bi bi-graph-up"></i>
                                <h3>Analytics</h3>
                                <p style={{ color: '#6c757d' }}>
                                    Get insights into your business with detailed reports
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showLogin && (
                <LoginModal 
                    role={loginRole} 
                    onClose={() => setShowLogin(false)} 
                    onSwitchToRegister={switchToRegister}
                    email={email} 
                    setEmail={setEmail} 
                    password={password} 
                    setPassword={setPassword} 
                    handleLogin={handleLogin} 
                />
            )}

            {showRegister && (
                <RegisterModal 
                    onClose={() => setShowRegister(false)}
                    onSwitchToLogin={switchToLogin}
                />
            )}

            <footer className="footer">
                <div className="container" style={{ textAlign: 'center' }}>
                    <p>&copy; 2024 InventoryPro. All rights reserved.</p>
                </div>
            </footer>
        </React.Fragment>
    );
}

window.HomePage = HomePage;