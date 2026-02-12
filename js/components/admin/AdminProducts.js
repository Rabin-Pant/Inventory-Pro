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

window.AdminProducts = AdminProducts;