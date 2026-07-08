# 🧠 Smart Inventory AI – System Actions & Context

## 📌 Overview

Smart Inventory AI es una plataforma SaaS multi-tenant para la gestión de inventarios, ventas, compras y análisis predictivo.

El sistema permite a múltiples empresas:

* Gestionar productos y stock
* Registrar ventas y compras
* Mantener trazabilidad mediante movimientos
* Generar reportes
* Integrar predicción de demanda (ML)

---

# 🧱 System Modules

* Auth
* Users & Roles
* Companies (Multi-tenant)
* Categories
* Products
* Warehouses
* Inventory
* Inventory Movements
* Sales
* Purchases
* Alerts
* Reports
* Predictions (ML)

---

# ⚙️ System Actions

## 🔐 Auth

* registerUser
* loginUser
* getProfile

---

## 👥 Users

* createUser
* getUsersByCompany
* getUserById
* updateUser
* deleteUser (soft delete)
* changeUserRole

---

## 🏢 Companies

* createCompany
* getCompany
* updateCompany

---

## 📦 Categories

* createCategory
* getCategories
* getCategoryById
* updateCategory
* deleteCategory

---

## 📦 Products

* createProduct
* getProducts (filters: category, name)
* getProductById
* updateProduct
* deleteProduct (soft delete)

---

## 🏪 Warehouses

* createWarehouse
* getWarehouses
* getWarehouseById
* updateWarehouse
* deleteWarehouse

---

## 📊 Inventory (READ ONLY)

* getInventory
* getInventoryByProduct
* getInventoryByWarehouse

⚠️ Inventory must NOT be modified directly.

---

## 🔄 Inventory Movements (READ ONLY)

* getMovements
* filterMovements (product, date, type)

⚠️ Movements are generated automatically.

---

## 💰 Sales (CRITICAL FLOW)

* createSale
* getSales
* getSaleById

### Internal Logic:

* validate products
* validate stock
* calculate total
* create sale
* create sale items
* decrease inventory
* create movement (type: OUT)
* use database transaction

---

## 📥 Purchases

* createPurchase
* getPurchases
* getPurchaseById

### Internal Logic:

* create purchase
* create purchase items
* increase inventory
* create movement (type: IN)
* use database transaction

---

## 🚨 Alerts

* getAlerts
* markAlertAsRead

### Automatic Trigger:

if stock < min_stock → create alert

---

## 📈 Reports

* getSalesByDateRange
* getTopSellingProducts
* getInventoryStatus

---

## 🤖 Predictions (ML)

* getPredictionByProduct
* generatePrediction (optional)
* getPredictionHistory

---

# 🔐 Global Rules

## 🏢 Multi-tenant

* All queries must filter by company_id
* Users can only access their company data

---

## 🔄 Inventory Integrity

* Inventory cannot be modified directly
* Only changes via:

  * Sales
  * Purchases

---

## 💥 Transactions

* Sales and Purchases MUST use transactions

---

## 🧟 Soft Delete

* All deletions use paranoid mode (deleted_at)

---

## 🔒 Security

* All protected routes require JWT authentication

---

# 🧠 Developer Notes (for AI tools)

When generating code:

* Use TypeScript
* Use Express
* Use Sequelize ORM
* Follow controller → service architecture
* Use async/await
* Handle errors properly
* Respect all business rules above
* Use transactions where required
* Type all the code if it is necessary

---

# 🚀 Goal

Build a production-ready backend that:

* Ensures data consistency
* Maintains full traceability
* Supports multiple companies
* Is scalable and ML-ready
