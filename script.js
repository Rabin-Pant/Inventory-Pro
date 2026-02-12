// Context for sharing state across components
const { createContext, useContext } = React;

const AppContext = createContext();

// Custom hook for using context
function useAppContext() {
    return useContext(AppContext);
}

// Home Page Component
function HomePage() {
    const { login } = useAppContext();
    const [showLogin, setShowLogin] = React.useState(false);
    const [loginRole, setLoginRole] = React.useState('customer');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showRegister, setShowRegister] = React.useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email && password) {
            await login(email, password, loginRole);
            setShowLogin(false);
        }
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
                <div className="modal" onClick={() => setShowLogin(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{loginRole === 'admin' ? 'Admin Login' : 'Customer Login'}</h3>
                            <button 
                                onClick={() => setShowLogin(false)}
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
            )}

            <footer className="footer">
                <div className="container" style={{ textAlign: 'center' }}>
                    <p>&copy; 2024 InventoryPro. All rights reserved.</p>
                </div>
            </footer>
        </React.Fragment>
    );
}

// Admin Layout
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
    <div className="admin-layout" style={{ display: 'flex' }}>
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

// Admin Dashboard Component
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
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
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

// Admin Products Component
function AdminProducts() {
    const { products, categories, addProduct, updateProduct, deleteProduct } = useAppContext();
    const [showModal, setShowModal] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterCategory, setFilterCategory] = React.useState('all');

    const filteredProducts = products?.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    }) || [];

    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Products Management</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                        setEditingProduct(null);
                        setShowModal(true);
                    }}
                >
                    <i className="bi bi-plus-lg"></i> Add Product
                </button>
            </div>

            <div className="card" style={{ marginBottom: '20px' }}>
                <div style={{ padding: '20px' }}>
                    <div className="row">
                        <div className="col-md-8">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-control"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img 
                                        src={product.image} 
                                        style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
                                        alt={product.name}
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price?.toFixed(2)}</td>
                                <td>
                                    <span className={`badge ${product.stock < 10 ? 'badge-danger' : 'badge-success'}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-info btn-sm"
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setShowModal(true);
                                        }}
                                        style={{ marginRight: '5px' }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <ProductModal 
                    product={editingProduct}
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                    onSave={(productData) => {
                        if (editingProduct) {
                            updateProduct(editingProduct.id, productData);
                        } else {
                            addProduct(productData);
                        }
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                />
            )}
        </React.Fragment>
    );
}

// Product Modal Component
function ProductModal({ product, onClose, onSave }) {
    const { categories } = useAppContext();
    const [formData, setFormData] = React.useState({
        name: product?.name || '',
        category: product?.category || categories?.[0]?.name || '',
        price: product?.price || '',
        stock: product?.stock || '',
        image: product?.image || '',
        description: product?.description || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        });
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{product ? 'Edit Product' : 'Add Product'}</h3>
                    <button 
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Product Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select 
                                className="form-control"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                required
                            >
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Price ($)</label>
                                    <input 
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Stock</label>
                                    <input 
                                        type="number"
                                        className="form-control"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Image URL</label>
                            <input 
                                type="url"
                                className="form-control"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-control"
                                rows="3"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {product ? 'Update' : 'Add'} Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Admin Categories Component
function AdminCategories() {
    const { categories, addCategory, deleteCategory } = useAppContext();
    const [showModal, setShowModal] = React.useState(false);
    const [categoryName, setCategoryName] = React.useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (categoryName.trim()) {
            addCategory(categoryName.trim());
            setCategoryName('');
            setShowModal(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Categories Management</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-plus-lg"></i> Add Category
                </button>
            </div>

            <div className="row">
                {categories?.map(category => (
                    <div key={category.id} className="col-md-4" style={{ marginBottom: '20px' }}>
                        <div className="card">
                            <div style={{ padding: '30px', textAlign: 'center' }}>
                                <i className="bi bi-tag" style={{ fontSize: '48px', color: '#667eea', marginBottom: '15px' }}></i>
                                <h4>{category.name}</h4>
                                <p style={{ color: '#6c757d', marginBottom: '15px' }}>
                                    {category.count} {category.count === 1 ? 'product' : 'products'}
                                </p>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteCategory(category.id)}
                                    disabled={category.count > 0}
                                    title={category.count > 0 ? "Cannot delete category with products" : ""}
                                >
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Add Category</h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddCategory}>
                                <div className="form-group">
                                    <label className="form-label">Category Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="Enter category name"
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Admin Orders Component
function AdminOrders() {
    const { orders, updateOrderStatus } = useAppContext();
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [filterStatus, setFilterStatus] = React.useState('all');

    const filteredOrders = filterStatus === 'all' 
        ? orders 
        : orders?.filter(o => o.status === filterStatus);

    return (
        <>
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
        </>
    );
}

// Order Details Modal
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

// Admin Invoices Component
function AdminInvoices() {
    const { ApiService } = window;
    const [invoices, setInvoices] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        try {
            const data = await ApiService.getInvoices();
            setInvoices(data);
        } catch (error) {
            console.error('Failed to load invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (invoiceId) => {
        try {
            await ApiService.downloadInvoice(invoiceId);
        } catch (error) {
            alert('Failed to download invoice');
        }
    };

    if (loading) {
        return <div>Loading invoices...</div>;
    }

    return (
        <>
            <h2 style={{ marginBottom: '20px' }}>Invoices</h2>
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Order #</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map(invoice => (
                            <tr key={invoice.id}>
                                <td>#{invoice.order_number}</td>
                                <td>#{invoice.order_number}</td>
                                <td>{invoice.customer_name}</td>
                                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                                <td>${invoice.total?.toFixed(2)}</td>
                                <td>
                                    <button 
                                        className="btn btn-info btn-sm"
                                        onClick={() => handleDownload(invoice.id)}
                                    >
                                        <i className="bi bi-download"></i> Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {invoices.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                                    <i className="bi bi-receipt" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                                    <p style={{ marginTop: '10px' }}>No invoices found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

// Customer Layout
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
        <>
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
        </>
    );
}

// Customer Dashboard Component
function CustomerDashboard() {
    const { setCurrentPage, orders, user } = useAppContext();

    const userOrders = orders?.filter(order => order.customer_email === user?.email) || [];
    const pendingOrders = userOrders.filter(o => o.status === 'pending').length;
    const deliveredOrders = userOrders.filter(o => o.status === 'delivered').length;
    const totalSpent = userOrders.reduce((sum, order) => 
        sum + (order.final_total || order.total), 0
    );

    return (
        <>
            <h2 style={{ marginBottom: '30px' }}>Welcome back, {user?.name}!</h2>
            
            <div className="row">
                <div className="col-md-4">
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="stat-icon">
                            <i className="bi bi-bag-check"></i>
                        </div>
                        <div className="stat-value">{userOrders.length}</div>
                        <div className="stat-label">Total Orders</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="stat-icon">
                            <i className="bi bi-clock-history"></i>
                        </div>
                        <div className="stat-value">{pendingOrders}</div>
                        <div className="stat-label">Pending Orders</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="stat-icon">
                            <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="stat-value">${totalSpent.toFixed(0)}</div>
                        <div className="stat-label">Total Spent</div>
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-md-6">
                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                        <i className="bi bi-grid" style={{ fontSize: '64px', color: '#667eea', marginBottom: '20px' }}></i>
                        <h4>Browse Products</h4>
                        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                            Explore our wide range of products
                        </p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setCurrentPage('customer-products')}
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                        <i className="bi bi-bag-check" style={{ fontSize: '64px', color: '#667eea', marginBottom: '20px' }}></i>
                        <h4>My Orders</h4>
                        <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                            Track and view your order history
                        </p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setCurrentPage('customer-orders')}
                        >
                            View Orders
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// Customer Products Component
function CustomerProducts() {
    const { products, categories, addToCart } = useAppContext();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterCategory, setFilterCategory] = React.useState('all');

    const filteredProducts = products?.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory && product.stock > 0;
    }) || [];

    return (
        <>
            <h2 style={{ marginBottom: '20px' }}>Products</h2>

            <div className="card" style={{ marginBottom: '20px' }}>
                <div style={{ padding: '20px' }}>
                    <div className="row">
                        <div className="col-md-8">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-control"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {filteredProducts.map(product => (
                    <div key={product.id} className="col-md-4" style={{ marginBottom: '20px' }}>
                        <div className="card product-card">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="product-image"
                            />
                            <div className="product-body">
                                <h5 className="product-title">{product.name}</h5>
                                <p className="product-description">{product.description}</p>
                                <div style={{ marginBottom: '10px' }}>
                                    <span className="badge badge-primary">{product.category}</span>
                                    <span className="badge badge-success" style={{ marginLeft: '5px' }}>
                                        {product.stock} in stock
                                    </span>
                                </div>
                                <div className="product-price">${product.price?.toFixed(2)}</div>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        addToCart(product);
                                        alert('Product added to cart!');
                                    }}
                                    style={{ width: '100%' }}
                                >
                                    <i className="bi bi-cart-plus"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <i className="bi bi-search" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                    <h4 style={{ marginTop: '15px' }}>No products found</h4>
                    <p style={{ color: '#6c757d' }}>Try adjusting your search or filter</p>
                </div>
            )}
        </>
    );
}

// Customer Cart Component
function CustomerCart() {
    const { cart, updateCartQuantity, removeFromCart, placeOrder, setCurrentPage } = useAppContext();
    const [checkout, setCheckout] = React.useState(false);

    const total = cart?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
    const shippingCost = 10.00;
    const tax = total * 0.08;
    const finalTotal = total + shippingCost + tax;

    if (checkout) {
        return <CheckoutForm 
            total={finalTotal} 
            subtotal={total}
            shipping={shippingCost}
            tax={tax}
            onBack={() => setCheckout(false)} 
        />;
    }

    if (!cart || cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="bi bi-cart-x" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                <h4 style={{ marginTop: '15px' }}>Your cart is empty</h4>
                <p style={{ color: '#6c757d' }}>Add some products to get started</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentPage('customer-products')}
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <>
            <h2 style={{ marginBottom: '20px' }}>Shopping Cart</h2>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card">
                        <div style={{ overflow: 'auto' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <img 
                                                        src={item.image} 
                                                        style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }}
                                                        alt={item.name}
                                                    />
                                                    <div>
                                                        <strong>{item.name}</strong>
                                                        <div style={{ color: '#6c757d', fontSize: '14px' }}>{item.category}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${item.price?.toFixed(2)}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <button 
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{ padding: '0 10px' }}>{item.quantity}</span>
                                                    <button 
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div style={{ padding: '20px', borderBottom: '1px solid #e1e5e9' }}>
                            <h5 style={{ margin: 0 }}>Order Summary</h5>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Subtotal:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Shipping:</span>
                                    <span>${shippingCost.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Tax (8%):</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <h5 style={{ margin: 0 }}>Total:</h5>
                                <h5 style={{ margin: 0, color: '#667eea' }}>${finalTotal.toFixed(2)}</h5>
                            </div>
                            <button 
                                className="btn btn-primary"
                                onClick={() => setCheckout(true)}
                                style={{ width: '100%' }}
                            >
                                <i className="bi bi-arrow-right"></i> Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Checkout Form Component
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
        <>
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
        </>
    );
}

// Customer Orders Component
function CustomerOrders() {
    const { orders, user, setCurrentPage } = useAppContext();

    const userOrders = orders?.filter(order => order.customer_email === user?.email) || [];

    if (userOrders.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="bi bi-bag-x" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                <h4 style={{ marginTop: '15px' }}>No orders yet</h4>
                <p style={{ color: '#6c757d' }}>Start shopping to see your orders here</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentPage('customer-products')}
                >
                    Browse Products
                </button>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'warning';
            case 'processing': return 'info';
            case 'shipped': return 'primary';
            case 'delivered': return 'success';
            case 'cancelled': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <>
            <h2 style={{ marginBottom: '20px' }}>My Orders</h2>
            <div className="row">
                {userOrders.map(order => (
                    <div key={order.id} className="col-12" style={{ marginBottom: '20px' }}>
                        <div className="card">
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>Order #{order.order_number?.slice(-6)}</h4>
                                        <p style={{ color: '#6c757d', marginBottom: '0' }}>
                                            Placed on {new Date(order.date).toLocaleString()}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span className={`badge badge-${getStatusColor(order.status)}`} style={{ fontSize: '14px' }}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                        <h4 style={{ marginTop: '10px', color: '#667eea' }}>
                                            ${(order.final_total || order.total).toFixed(2)}
                                        </h4>
                                    </div>
                                </div>
                                
                                <div className="order-details">
                                    <h5 style={{ marginBottom: '15px' }}>Order Details</h5>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Shipping Address:</strong>
                                        <p style={{ margin: '5px 0', color: '#6c757d' }}>{order.shipping_address}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Payment Method:</strong>
                                        <p style={{ margin: '5px 0', color: '#6c757d' }}>
                                            {order.payment_method === 'credit_card' ? 'Credit Card' : 
                                             order.payment_method === 'paypal' ? 'PayPal' : 
                                             'Cash on Delivery'}
                                        </p>
                                    </div>
                                    {order.delivery_date && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <strong>Estimated Delivery:</strong>
                                            <p style={{ margin: '5px 0', color: '#6c757d' }}>
                                                {new Date(order.delivery_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                    {order.admin_notes && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <strong>Admin Notes:</strong>
                                            <p style={{ margin: '5px 0', color: '#6c757d' }}>{order.admin_notes}</p>
                                        </div>
                                    )}
                                    
                                    <hr style={{ margin: '15px 0' }} />
                                    
                                    <h6 style={{ marginBottom: '10px' }}>Items Ordered:</h6>
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
                                            <div style={{ textAlign: 'right' }}>
                                                <div>${item.price?.toFixed(2)} each</div>
                                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

// Customer Invoices Component
function CustomerInvoices() {
    const { ApiService } = window;
    const [invoices, setInvoices] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        try {
            const data = await ApiService.getInvoices();
            setInvoices(data);
        } catch (error) {
            console.error('Failed to load invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (invoiceId) => {
        try {
            await ApiService.downloadInvoice(invoiceId);
        } catch (error) {
            alert('Failed to download invoice');
        }
    };

    if (loading) {
        return <div>Loading invoices...</div>;
    }

    if (invoices.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="bi bi-receipt" style={{ fontSize: '48px', color: '#6c757d' }}></i>
                <h4 style={{ marginTop: '15px' }}>No invoices yet</h4>
                <p style={{ color: '#6c757d' }}>Your invoices will appear here after placing orders</p>
            </div>
        );
    }

    return (
        <>
            <h2 style={{ marginBottom: '20px' }}>My Invoices</h2>
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map(invoice => (
                            <tr key={invoice.id}>
                                <td>#{invoice.order_number}</td>
                                <td>#{invoice.order_number}</td>
                                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                                <td>${invoice.total?.toFixed(2)}</td>
                                <td>
                                    <button 
                                        className="btn btn-info btn-sm"
                                        onClick={() => handleDownload(invoice.id)}
                                    >
                                        <i className="bi bi-download"></i> Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

// Main App Component
const { useState, useEffect } = React;

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [userRole, setUserRole] = useState(null);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Check for existing session on load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            ApiService.setToken(token);
            loadCurrentUser();
        }
        loadInitialData();
    }, []);

    const loadCurrentUser = async () => {
        try {
            const userData = await ApiService.getCurrentUser();
            setUser(userData);
            setUserRole(userData.role);
            setCurrentPage(userData.role === 'admin' ? 'admin-dashboard' : 'customer-dashboard');
            
            // Load user's cart from localStorage
            const savedCart = localStorage.getItem(`cart_${userData.email}`);
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Failed to load user:', error);
            localStorage.removeItem('token');
            ApiService.setToken(null);
        }
    };

    const loadInitialData = async () => {
        try {
            const [productsData, categoriesData] = await Promise.all([
                ApiService.getProducts(),
                ApiService.getCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to load initial data:', error);
        }
    };

    const loadOrders = async () => {
        try {
            const ordersData = await ApiService.getOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error('Failed to load orders:', error);
        }
    };

    const login = async (email, password, role) => {
        try {
            setLoading(true);
            const response = await ApiService.login(email, password);
            
            if (response.user.role !== role) {
                alert(`This account is registered as ${response.user.role}, not ${role}`);
                return;
            }
            
            ApiService.setToken(response.access_token);
            setUser(response.user);
            setUserRole(response.user.role);
            
            // Load orders
            await loadOrders();
            
            if (response.user.role === 'admin') {
                setCurrentPage('admin-dashboard');
            } else {
                // Load customer's cart
                const savedCart = localStorage.getItem(`cart_${response.user.email}`);
                if (savedCart) {
                    setCart(JSON.parse(savedCart));
                }
                setCurrentPage('customer-dashboard');
            }
        } catch (error) {
            alert(error.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        ApiService.setToken(null);
        setUser(null);
        setUserRole(null);
        setCart([]);
        setOrders([]);
        setCurrentPage('home');
        localStorage.removeItem('token');
    };

    const addToCart = (product, quantity = 1) => {
        const existing = cart.find(item => item.id === product.id);
        let updatedCart;
        
        if (existing) {
            updatedCart = cart.map(item => 
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity }];
        }
        
        setCart(updatedCart);
        if (user) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        if (user) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
        }
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            const updatedCart = cart.map(item => 
                item.id === productId ? { ...item, quantity } : item
            );
            setCart(updatedCart);
            if (user) {
                localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
            }
        }
    };

    const placeOrder = async (customerInfo) => {
        try {
            setLoading(true);
            
            const orderData = {
                items: cart.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                })),
                shipping_address: customerInfo.address,
                phone: customerInfo.phone,
                payment_method: customerInfo.paymentMethod
            };
            
            const newOrder = await ApiService.createOrder(orderData);
            
            // Update local state
            setOrders([newOrder, ...orders]);
            
            // Update product stock
            const updatedProducts = products.map(product => {
                const cartItem = cart.find(item => item.id === product.id);
                if (cartItem) {
                    return {
                        ...product,
                        stock: product.stock - cartItem.quantity
                    };
                }
                return product;
            });
            setProducts(updatedProducts);
            
            // Clear cart
            setCart([]);
            if (user) {
                localStorage.setItem(`cart_${user.email}`, JSON.stringify([]));
            }
            
            alert('Order placed successfully!');
            setCurrentPage('customer-orders');
            await loadOrders();
            
        } catch (error) {
            alert(error.error || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status, deliveryDate, notes) => {
        try {
            const updatedOrder = await ApiService.updateOrderStatus(orderId, {
                status,
                delivery_date: deliveryDate,
                admin_notes: notes
            });
            
            setOrders(orders.map(order => 
                order.id === orderId ? updatedOrder : order
            ));
            
            alert('Order updated successfully');
        } catch (error) {
            alert(error.error || 'Failed to update order');
        }
    };

    const addProduct = async (product) => {
        try {
            const newProduct = await ApiService.createProduct(product);
            setProducts([...products, newProduct]);
            alert('Product added successfully');
        } catch (error) {
            alert(error.error || 'Failed to add product');
        }
    };

    const updateProduct = async (productId, updatedData) => {
        try {
            const updatedProduct = await ApiService.updateProduct(productId, updatedData);
            setProducts(products.map(product => 
                product.id === productId ? updatedProduct : product
            ));
            alert('Product updated successfully');
        } catch (error) {
            alert(error.error || 'Failed to update product');
        }
    };

    const deleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await ApiService.deleteProduct(productId);
                setProducts(products.filter(product => product.id !== productId));
                alert('Product deleted successfully');
            } catch (error) {
                alert(error.error || 'Failed to delete product');
            }
        }
    };

    const addCategory = async (name) => {
        try {
            const newCategory = await ApiService.createCategory(name);
            setCategories([...categories, newCategory]);
            alert('Category added successfully');
        } catch (error) {
            alert(error.error || 'Failed to add category');
        }
    };

    const deleteCategory = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await ApiService.deleteCategory(categoryId);
                setCategories(categories.filter(cat => cat.id !== categoryId));
                alert('Category deleted successfully');
            } catch (error) {
                alert(error.error || 'Cannot delete category with existing products');
            }
        }
    };

    const contextValue = {
        currentPage,
        setCurrentPage,
        userRole,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        placeOrder,
        orders,
        loadOrders,
        updateOrderStatus,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        deleteCategory,
        user,
        login,
        logout,
        loading,
        ApiService
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="app">
                {loading && (
                    <div style={{ 
                        position: 'fixed', 
                        top: '20px', 
                        right: '20px', 
                        zIndex: 9999,
                        background: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <span className="badge badge-primary">Loading...</span>
                    </div>
                )}
                {!userRole ? (
                    <HomePage />
                ) : userRole === 'admin' ? (
                    <AdminLayout />
                ) : (
                    <CustomerLayout />
                )}
            </div>
        </AppContext.Provider>
    );
}

// Make ApiService available globally
window.ApiService = ApiService;

// Render App - ONLY ONCE!
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);