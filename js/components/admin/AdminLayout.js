function AdminLayout() {
    const { currentPage, setCurrentPage, logout, user, orders, loadOrders } = useAppContext();

    React.useEffect(() => {
        loadOrders();
    }, []);

    const menuItems = [
        { id: 'admin-dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
        { id: 'admin-products', label: 'Products', icon: 'bi-box-seam' },
        { id: 'admin-categories', label: 'Categories', icon: 'bi-tags' },
        { id: 'admin-orders', label: 'Orders', icon: 'bi-cart-check' },
        { id: 'admin-invoices', label: 'Invoices', icon: 'bi-receipt' },
    ];

    const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;

    return (
        <div className="admin-layout">
            <div className="admin-sidebar">
                <div className="admin-sidebar-brand">
                    <i className="bi bi-box-seam"></i>
                    InventoryPro
                </div>
                <div className="admin-sidebar-nav">
                    {menuItems.map(item => (
                        <a
                            key={item.id}
                            href="#"
                            className={`admin-sidebar-link ${currentPage === item.id ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(item.id);
                            }}
                        >
                            <i className={`bi ${item.icon}`}></i>
                            {item.label}
                            {item.id === 'admin-orders' && pendingOrders > 0 && (
                                <span className="badge badge-danger" style={{ marginLeft: 'auto' }}>
                                    {pendingOrders}
                                </span>
                            )}
                        </a>
                    ))}
                    <a
                        href="#"
                        className="admin-sidebar-link"
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}
                        style={{ marginTop: '20px', background: 'rgba(220, 53, 69, 0.2)', color: '#ff6b6b' }}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        Logout
                    </a>
                </div>
            </div>
            <div className="admin-main-content">
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Welcome, {user?.name}</h4>
                    <span className="badge badge-primary">{user?.role}</span>
                </div>
                {currentPage === 'admin-dashboard' && <AdminDashboard />}
                {currentPage === 'admin-products' && <AdminProducts />}
                {currentPage === 'admin-categories' && <AdminCategories />}
                {currentPage === 'admin-orders' && <AdminOrders />}
                {currentPage === 'admin-invoices' && <AdminInvoices />}
            </div>
        </div>
    );
}

window.AdminLayout = AdminLayout;