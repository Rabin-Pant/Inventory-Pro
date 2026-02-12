// API Service for backend communication
const API_BASE_URL = 'http://172.22.196.63:5000/api';

// Token management
let authToken = localStorage.getItem('token');

const ApiService = {
    // ===== TOKEN MANAGEMENT =====
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

    // ===== AUTH ENDPOINTS =====
    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                phone: userData.phone || '',
                address: userData.address || ''
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
        }
        return response.json();
    },

    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }
        return response.json();
    },

    getCurrentUser: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    updateProfile: async (profileData) => {
        const response = await fetch(`${API_BASE_URL}/auth/update`, {
            method: 'PUT',
            headers: ApiService.getHeaders(),
            body: JSON.stringify(profileData)
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    // ===== PRODUCTS ENDPOINTS =====
    getProducts: async () => {
        const response = await fetch(`${API_BASE_URL}/products/`);
        if (!response.ok) throw await response.json();
        return response.json();
    },

    getProduct: async (productId) => {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);
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

    // ===== CATEGORIES ENDPOINTS =====
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

    // ===== ORDERS ENDPOINTS =====
    getOrders: async () => {
        const response = await fetch(`${API_BASE_URL}/orders/`, {
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    getOrder: async (orderId) => {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
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
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to place order');
        }
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

    // ===== INVOICES ENDPOINTS =====
    getInvoices: async () => {
        const response = await fetch(`${API_BASE_URL}/invoices/`, {
            headers: ApiService.getHeaders()
        });
        if (!response.ok) throw await response.json();
        return response.json();
    },

    getInvoice: async (invoiceId) => {
        const response = await fetch(`${API_BASE_URL}/invoices/${invoiceId}`, {
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