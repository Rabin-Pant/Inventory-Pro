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
            
            await loadOrders();
            
            if (response.user.role === 'admin') {
                setCurrentPage('admin-dashboard');
            } else {
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
            setOrders([newOrder, ...orders]);
            
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

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);