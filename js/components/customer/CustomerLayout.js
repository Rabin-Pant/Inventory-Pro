function CustomerLayout() {
    const { currentPage, setCurrentPage, logout, user, cart, loadOrders } = useAppContext();

    React.useEffect(() => {
        loadOrders();
    }, []);

    const menuItems = [
        { id: 'customer-dashboard', label: 'Dashboard', icon: 'bi-house' },
        { id: 'customer-products', label: 'Products', icon: 'bi-grid' },
        { id: 'customer-cart', label: 'Cart', icon: 'bi-cart', badge: cart?.length },
        { id: 'customer-orders', label: 'My Orders', icon: 'bi-bag-check' },
        { id: 'customer-invoices', label: 'Invoices', icon: 'bi-receipt' },
    ];

    return (
        <React.Fragment>
            <nav className="navbar">
                <div className="container navbar-container">
                    <a href="#" className="navbar-brand">
                        <i className="bi bi-box-seam"></i>
                        InventoryPro
                    </a>
                    <ul className="navbar-nav">
                        {menuItems.map(item => (
                            <li key={item.id}>
                                <a
                                    href="#"
                                    className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(item.id);
                                    }}
                                    style={{ position: 'relative' }}
                                >
                                    <i className={`bi ${item.icon}`}></i>
                                    {item.label}
                                    {item.badge > 0 && (
                                        <span className="cart-badge">{item.badge}</span>
                                    )}
                                </a>
                            </li>
                        ))}
                        <li>
                            <span style={{ marginRight: '15px', color: '#667eea' }}>
                                <i className="bi bi-person-circle"></i> {user?.name}
                            </span>
                            <button 
                                className="btn btn-danger btn-sm"
                                onClick={logout}
                            >
                                <i className="bi bi-box-arrow-right"></i>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container" style={{ marginTop: '30px', marginBottom: '50px' }}>
                {currentPage === 'customer-dashboard' && <CustomerDashboard />}
                {currentPage === 'customer-products' && <CustomerProducts />}
                {currentPage === 'customer-cart' && <CustomerCart />}
                {currentPage === 'customer-orders' && <CustomerOrders />}
                {currentPage === 'customer-invoices' && <CustomerInvoices />}
            </div>
        </React.Fragment>
    );
}

window.CustomerLayout = CustomerLayout;