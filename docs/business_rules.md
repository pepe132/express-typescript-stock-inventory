# 🧠 Business Rules – Smart Inventory AI

---

## 📌 Overview

Este documento define las reglas de negocio críticas del sistema.
Estas reglas deben respetarse en TODOS los módulos (controllers, services, queries).

Su objetivo es garantizar:

* Consistencia de datos
* Integridad del inventario
* Seguridad multi-tenant
* Correcta ejecución de flujos críticos

---

# 🏢 Multi-Tenant Rules

* Todas las entidades relacionadas con negocio deben incluir `company_id`
* Todas las consultas deben filtrar por `company_id`
* Un usuario SOLO puede acceder a datos de su empresa
* Está prohibido acceder a datos de otra empresa

---

# 🔐 Authentication & Security

* Todas las rutas protegidas requieren autenticación (JWT)
* El usuario autenticado debe inyectarse en cada request
* Las contraseñas deben almacenarse encriptadas
* Nunca retornar `password_hash` en responses
* Validar inputs en todas las peticiones

---

# 🧟 Soft Delete

* Ninguna entidad debe eliminarse físicamente
* Se debe usar `deleted_at`
* Las consultas deben excluir registros eliminados
* Se puede restaurar un registro si es necesario

---

# 📦 Products

* El `sku` debe ser único
* Todo producto debe pertenecer a una categoría
* Todo producto debe pertenecer a una empresa
* No se deben eliminar productos con historial (soft delete únicamente)

---

# 🏪 Warehouses

* Todo almacén pertenece a una empresa
* No se deben eliminar almacenes con inventario activo

---

# 📊 Inventory (CRÍTICO)

* El inventario NO debe modificarse directamente
* El inventario es una representación del estado actual
* Todo cambio de stock debe generarse mediante un movimiento

---

# 🔄 Inventory Movements (FUENTE DE VERDAD)

* Todo cambio en inventario debe generar un registro en `inventory_movements`
* Tipos válidos:

  * `IN` (entrada)
  * `OUT` (salida)
* Todo movimiento debe tener:

  * producto
  * cantidad
  * tipo
  * usuario
  * referencia (venta o compra)
* Los movimientos NO deben editarse ni eliminarse

---

# 💰 Sales (FLUJO CRÍTICO)

## Reglas generales:

* Toda venta debe ejecutarse dentro de una transacción
* Una venta debe generar:

  * registro en `sales`
  * registros en `sale_items`
  * movimientos de inventario (type: OUT)
* Si alguna operación falla → rollback total

---

## Validaciones:

* El producto debe existir
* El stock debe ser suficiente
* No se permite stock negativo (configurable)

---

## Efectos:

* Disminuye inventario
* Genera movimientos tipo `OUT`

---

# 📥 Purchases

## Reglas generales:

* Toda compra debe ejecutarse dentro de una transacción
* Una compra debe generar:

  * registro en `purchases`
  * registros en `purchase_items`
  * movimientos de inventario (type: IN)

---

## Efectos:

* Incrementa inventario
* Genera movimientos tipo `IN`

---

# 🚨 Alerts

* Se debe generar una alerta cuando:

  stock < min_stock

* Las alertas pueden marcarse como leídas

* No se deben eliminar alertas

---

# 📈 Reports

* Los reportes deben basarse en datos históricos (sales, movements)
* No deben depender únicamente del estado actual del inventario

---

# 🤖 Predictions (ML)

* Las predicciones deben basarse en datos históricos de ventas
* Cada predicción debe almacenarse con:

  * versión de modelo
  * fecha de predicción
* Las predicciones NO deben modificar directamente el inventario

---

# 💥 Transactions

* Las siguientes operaciones DEBEN usar transacciones:

  * Crear venta
  * Crear compra
* Si cualquier paso falla → rollback completo

---

# 🔍 Data Integrity

* No se permiten datos huérfanos (FK obligatorias)
* Validar existencia de relaciones antes de insertar
* Evitar duplicados innecesarios

---

# 🚀 Conclusion

Estas reglas son obligatorias para garantizar:

* Consistencia del sistema
* Escalabilidad
* Seguridad
* Correcta integración con Machine Learning

TODO el código generado (manual o por IA) debe respetar este documento.
