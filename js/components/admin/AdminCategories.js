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
        <React.Fragment>
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
        </React.Fragment>
    );
}

window.AdminCategories = AdminCategories;