<div align="center">
  
  # 🏬 InventoryPro
  ### *Full Stack Inventory Management System*
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python&logoColor=white)](https://python.org)
  [![Flask](https://img.shields.io/badge/Flask-2.3.3-black?logo=flask&logoColor=white)](https://flask.palletsprojects.com)
  [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org)
  [![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)](https://sqlite.org)
  [![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=json-web-tokens&logoColor=white)](https://jwt.io)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

  <h3>
    <a href="#-features">Features</a> •
    <a href="#-demo">Demo</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-api-documentation">API</a> •
    <a href="#-screenshots">Screenshots</a>
  </h3>

  <img src="https://via.placeholder.com/1000x400/667eea/ffffff?text=InventoryPro+Dashboard" alt="InventoryPro Banner" width="100%">
  
  <p><i>A complete, production-ready inventory management system with role-based access control, real-time stock tracking, and automated invoice generation.</i></p>
  
  <p>
    <a href="https://github.com/Rabin-Pant/Inventory-Pro">
      <img src="https://img.shields.io/github/stars/Rabin-Pant/Inventory-Pro?style=social" alt="stars">
    </a>
    <a href="https://github.com/Rabin-Pant/Inventory-Pro/fork">
      <img src="https://img.shields.io/github/forks/Rabin-Pant/Inventory-Pro?style=social" alt="forks">
    </a>
    <a href="https://github.com/Rabin-Pant/Inventory-Pro/issues">
      <img src="https://img.shields.io/github/issues/Rabin-Pant/Inventory-Pro" alt="issues">
    </a>
  </p>
</div>

---

## ✨ Features

<div align="center">
  
| 👑 **Admin** | 👤 **Customer** | 🔧 **Core** |
|-------------|----------------|-------------|
| ✅ Dashboard Analytics | ✅ Browse Products | ✅ JWT Authentication |
| ✅ Product CRUD | ✅ Shopping Cart | ✅ Role-Based Access |
| ✅ Category Management | ✅ Place Orders | ✅ RESTful API |
| ✅ Order Processing | ✅ Order History | ✅ SQLite Database |
| ✅ Invoice Overview | ✅ Download Invoices | ✅ Responsive Design |
| ✅ Stock Alerts | ✅ Profile Management | ✅ Error Handling |

</div>

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Rabin-Pant/Inventory-Pro.git
cd Inventory-Pro

# Set up backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

# Set up frontend (in another terminal)
python -m http.server 5500
