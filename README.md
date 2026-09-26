# 🦙 QORI - Artesanías de Alpaca Premium

Tienda e-commerce de artesanías hechas a mano con fibra de alpaca peruana.

## Tecnologías

### Frontend
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS 3** 
- **React Context** (Carrito de compras)
- **Lucide React** (Iconos)

### Backend
- **Node.js + Express**
- **PostgreSQL**
- **JWT Authentication**
- **bcrypt** (Password hashing)

## Instalación

### Requisitos Previos
- Node.js 18+ 
- PostgreSQL 14+

### 1. Frontend (Next.js)

```bash
# En la raíz del proyecto
npm install
npm run dev
```

El frontend se ejecutará en `http://localhost:3000`

### 2. Backend (Express)

```bash
# Entrar al directorio backend
cd backend

# Instalar dependencias
npm install

# Copiar y configurar variables de entorno
cp .env .env.local
# Edita .env con tus credenciales de PostgreSQL

# Inicializar la base de datos
npm run db:init

# Poblar datos de ejemplo
npm run db:seed

# Iniciar servidor
npm run dev
```

El backend se ejecutará en `http://localhost:4000`

## API Endpoints

### Productos
- `GET /api/products` - Listar productos (filtros, paginación, orden)
- `GET /api/products/:slug` - Detalle de producto + relacionados
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto (soft delete)

### Categorías
- `GET /api/categories` - Listar categorías con conteo
- `GET /api/categories/:slug` - Categoría con sus productos

### Usuarios
- `POST /api/users/register` - Registrar usuario
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users/profile` - Ver perfil (auth)
- `PUT /api/users/profile` - Actualizar perfil (auth)

### Pedidos
- `POST /api/orders` - Crear pedido (auth)
- `GET /api/orders` - Mis pedidos (auth)
- `GET /api/orders/:orderNumber` - Detalle de pedido (auth)

## Estructura del Proyecto

```
karfront/
├── src/
│   ├── app/
│   │   ├── globals.css          # Estilos globales + Tailwind
│   │   ├── layout.tsx           # Layout raíz
│   │   └── page.tsx             # Página principal
│   ├── components/
│   │   ├── Header.tsx           # Navegación
│   │   ├── Hero.tsx             # Banner principal
│   │   ├── FeaturedCategories.tsx
│   │   ├── ProductGrid.tsx      # Grid con filtros
│   │   ├── ProductCard.tsx      # Tarjeta de producto
│   │   ├── CartPanel.tsx        # Panel lateral del carrito
│   │   ├── AboutSection.tsx     # Nuestra historia
│   │   ├── Newsletter.tsx       # Suscripción
│   │   └── Footer.tsx           # Footer completo
│   ├── context/
│   │   └── CartContext.tsx      # Estado del carrito
│   └── lib/
│       └── products.ts          # Datos de productos
├── public/
│   └── images/                  # Imágenes de productos
├── backend/
│   ├── server.js                # Servidor Express
│   ├── db/
│   │   ├── pool.js              # Conexión PostgreSQL
│   │   ├── init.js              # Crear tablas
│   │   └── seed.js              # Datos iniciales
│   └── routes/
│       ├── products.js          # CRUD productos
│       ├── users.js             # Auth + perfiles
│       ├── orders.js            # Pedidos
│       └── categories.js        # Categorías
└── package.json
```

## Credenciales de prueba

- **Admin**: admin@qori.pe / admin123

---

Hecho con ❤️ en Perú 🇵🇪
