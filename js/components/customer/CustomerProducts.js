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
        <React.Fragment>
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
        </React.Fragment>
    );
}

window.CustomerProducts = CustomerProducts;