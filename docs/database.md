# 🧱 Database Design – Smart Inventory AI

---

## 📌 Overview

La base de datos está diseñada para soportar un sistema **multi-tenant** de gestión de inventario con trazabilidad completa.

Cada entidad pertenece a una empresa (`company_id`) para garantizar aislamiento de datos.

El sistema sigue el principio:

> El estado actual (inventory) es derivado del historial (inventory_movements)

---

# 🏢 Core Entities

---

## 🏢 Companies

Representa una empresa dentro del sistema (multi-tenant).

**Fields:**

* id (PK)
* name
* created_at
* updated_at
* deleted_at

---

## 👥 Roles

Define los roles del sistema.

**Fields:**

* id (PK)
* name (admin, supervisor, employee)
* created_at
* updated_at
* deleted_at

---

## 👤 Users

Usuarios del sistema.

**Fields:**

* id (PK)
* name
* email (unique)
* password_hash
* role_id (FK → roles.id)
* company_id (FK → companies.id)
* created_at
* updated_at
* deleted_at

---

# 📦 Catalog

---

## 📦 Categories

Clasificación de productos.

**Fields:**

* id (PK)
* name
* company_id (FK)
* created_at
* updated_at
* deleted_at

---

## 📦 Products

Información de productos.

**Fields:**

* id (PK)
* name
* description
* price
* cost
* sku (unique)
* category_id (FK → categories.id)
* company_id (FK → companies.id)
* created_at
* updated_at
* deleted_at

---

# 🏪 Inventory System

---

## 🏪 Warehouses

Almacenes físicos o virtuales.

**Fields:**

* id (PK)
* name
* location
* company_id (FK)
* created_at
* updated_at
* deleted_at

---

## 📊 Inventory

Estado actual del stock por producto y almacén.

**Fields:**

* id (PK)
* product_id (FK → products.id)
* warehouse_id (FK → warehouses.id)
* stock
* min_stock
* created_at
* updated_at
* deleted_at

---

## 🔄 Inventory Movements

Historial completo de cambios en inventario.

**Fields:**

* id (PK)
* product_id (FK → products.id)
* warehouse_id (FK → warehouses.id)
* type (ENUM: IN | OUT)
* quantity
* reason (SALE, PURCHASE, ADJUSTMENT)
* reference_id (relación con venta o compra)
* user_id (FK → users.id)
* created_at
* updated_at
* deleted_at

---

# 💰 Sales System

---

## 💰 Sales

Representa una venta.

**Fields:**

* id (PK)
* company_id (FK → companies.id)
* user_id (FK → users.id)
* total
* created_at
* updated_at
* deleted_at

---

## 📦 Sale Items

Detalle de productos vendidos.

**Fields:**

* id (PK)
* sale_id (FK → sales.id)
* product_id (FK → products.id)
* quantity
* price
* subtotal
* created_at
* updated_at
* deleted_at

---

# 📥 Purchase System

---

## 📥 Purchases

Representa una compra a proveedor.

**Fields:**

* id (PK)
* company_id (FK → companies.id)
* total
* created_at
* updated_at
* deleted_at

---

## 📦 Purchase Items

Detalle de productos comprados.

**Fields:**

* id (PK)
* purchase_id (FK → purchases.id)
* product_id (FK → products.id)
* quantity
* cost
* subtotal
* created_at
* updated_at
* deleted_at

---

# 🚨 Alerts

---

## 🚨 Alerts

Notificaciones del sistema (ej. stock bajo).

**Fields:**

* id (PK)
* product_id (FK → products.id)
* type (LOW_STOCK)
* message
* is_read
* created_at
* updated_at
* deleted_at

---

# 🤖 Predictions (ML)

---

## 🤖 Predictions

Resultados de modelos de predicción de demanda.

**Fields:**

* id (PK)
* product_id (FK → products.id)
* predicted_demand
* prediction_date
* model_version
* created_at
* updated_at
* deleted_at

---

# 🔗 Relationships Summary

* companies → users (1:N)
* roles → users (1:N)
* companies → products (1:N)
* categories → products (1:N)
* products → inventory (1:N)
* warehouses → inventory (1:N)
* products → inventory_movements (1:N)
* sales → sale_items (1:N)
* purchases → purchase_items (1:N)

---

# 🧠 Key Design Principles

---

## 🔄 Inventory Integrity

* El stock NO es fuente de verdad
* La fuente de verdad son los movimientos

---

## 🏢 Multi-tenant

* Todas las entidades relevantes tienen `company_id`
* Queries deben filtrar por empresa

---

## 🧟 Soft Delete

* Todas las tablas usan `deleted_at`
* No se eliminan registros físicamente

---

## 💥 Transactions

* Ventas y compras deben ejecutarse en transacciones

---

## 🔍 Traceability

* Cada cambio en inventario queda registrado en `inventory_movements`

---

# 🚀 Conclusion

La base de datos está diseñada para:

* Garantizar consistencia
* Soportar múltiples empresas
* Mantener trazabilidad completa
* Escalar a features avanzados como ML
