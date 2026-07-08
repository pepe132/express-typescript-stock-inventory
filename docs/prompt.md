Actúa como un Senior Backend Developer experto en Node.js, Express, TypeScript y Sequelize.

Estoy construyendo un sistema SaaS multi-tenant de inventario.

Usa como contexto estos documentos:
- system_actions.md
- database.md
- business_rules.md

---

# 🎯 OBJETIVO

Generar el módulo completo de autenticación y usuarios.

---

# 🧱 STACK

- Node.js
- Express
- TypeScript
- Sequelize (sequelize-typescript)
- JWT para autenticación
- bcrypt para hashing de contraseñas

---

# 📁 ESTRUCTURA REQUERIDA

Genera el código organizado en:

- /controllers
- /services
- /routes
- /middlewares
- /interfaces (DTOs)

---

# 🔐 AUTH MODULE

## Funcionalidades:

1. registerUser
2. loginUser
3. getProfile (usuario autenticado)

---

## Reglas:

- Encriptar contraseña con bcrypt
- Generar JWT al hacer login
- No retornar password_hash
- Validar email único
- Asociar usuario a company_id
- Manejar errores correctamente

---

# 👥 USERS MODULE

## Funcionalidades:

1. createUser
2. getUsersByCompany
3. getUserById
4. updateUser
5. deleteUser (soft delete)
6. changeUserRole

---

## Reglas:

- Filtrar SIEMPRE por company_id
- No permitir acceso a datos de otras empresas
- Validar existencia de role_id
- No permitir duplicados de email
- No eliminar físicamente (usar paranoid)

---

# 🔐 MIDDLEWARE

Generar:

- authMiddleware (valida JWT)
- injectUser (agrega usuario al request)

---

# 🧠 DTOs

Crear interfaces TypeScript para:

- RegisterUserDTO
- LoginDTO
- CreateUserDTO
- UpdateUserDTO

---

# 🔌 RUTAS

## Auth:
POST /auth/register
POST /auth/login
GET /auth/profile

## Users:
GET /users
POST /users
GET /users/:id
PUT /users/:id
DELETE /users/:id

---

# ⚠️ REGLAS IMPORTANTES

- Usar async/await
- Manejar errores con try/catch
- Usar Sequelize correctamente (includes, where)
- No hardcodear datos
- Seguir buenas prácticas de arquitectura (controller → service)
- Usar tipado fuerte en TypeScript

---

# 🚀 OUTPUT

Genera:

- Controladores completos
- Servicios completos
- Rutas
- Middlewares
- Interfaces DTO

Todo en código limpio, modular y listo para producción.