// API Service for backend communication
const API_BASE_URL = 'http://172.22.196.63:5000/api';

// Token management
let authToken = localStorage.getItem('token');

const ApiService = {
    setToken: (token) => {
        authToken = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    },

    getHeaders: () => {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        return headers;
    },

    // Auth endpoints
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    getCurrentUser: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    // Products endpoints
    getProducts: async () => {
        const response = await fetch(`${API_BASE_URL}/products/`);
        if (!response.ok) throw await response.json();
        return response.json();
    },

    createProduct: async (product) => {
        const response = await fetch(`${API_BASE_URL}/products/`, {
            method: 'POST',
            headers: ApiService.getHeaders(),
            body: JSON.stringify(product)
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    updateProduct: async (productId, product) => {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: ApiService.getHeaders(),
            body: JSON.stringify(product)
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    deleteProduct: async (productId) => {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    // Categories endpoints
    getCategories: async () => {
        const response = await fetch(`${API_BASE_URL}/categories/`);
        if (!response.ok) throw await response.json();
        return response.json();
    },

    createCategory: async (name) => {
        const response = await fetch(`${API_BASE_URL}/categories/`, {
            method: 'POST',
            headers: ApiService.getHeaders(),
            body: JSON.stringify({ name })
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    deleteCategory: async (categoryId) => {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
            method: 'DELETE',
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    // Orders endpoints
    getOrders: async () => {
        const response = await fetch(`${API_BASE_URL}/orders/`, {
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    createOrder: async (orderData) => {
        const response = await fetch(`${API_BASE_URL}/orders/`, {
            method: 'POST',
            headers: ApiService.getHeaders(),
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    updateOrderStatus: async (orderId, statusData) => {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
            method: 'PUT',
            headers: ApiService.getHeaders(),
            body: JSON.stringify(statusData)
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    // Invoices endpoints
    getInvoices: async () => {
        const response = await fetch(`${API_BASE_URL}/invoices/`, {
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    downloadInvoice: async (invoiceId) => {
        const response = await fetch(`${API_BASE_URL}/invoices/${invoiceId}/download`, {
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${invoiceId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
};

// Make it global
window.ApiService = ApiService;