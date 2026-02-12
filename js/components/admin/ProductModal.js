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

window.ProductModal = ProductModal;