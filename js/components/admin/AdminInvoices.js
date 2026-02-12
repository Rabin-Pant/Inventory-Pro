function AdminInvoices() {
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
        <React.Fragment>
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
        </React.Fragment>
    );
}

window.AdminInvoices = AdminInvoices;