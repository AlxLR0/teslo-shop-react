# Teslo Shop

Bienvenido a **Teslo Shop**, una tienda online inspirada en Teslo con estilo moderno, navegación rápida y un panel de administración listo para gestionar el catálogo.

Explora productos, filtra por categoría, talla y precio, busca tu próximo favorito y administra el inventario desde una interfaz pensada para usar sin complicaciones.

## 🚀 Prueba la app

Entra directamente a la tienda:

**[Visitar Teslo Shop](https://teslo-shop-style.netlify.app/)**

## ✨ Qué ofrece

### Tienda

- Catálogo completo de productos
- Navegación por hombres, mujeres y niños
- Buscador compatible con mayúsculas y minúsculas
- Filtros por talla y rango de precio
- Paginación
- Vista detallada de cada producto
- Inicio de sesión y registro de usuarios
- Acceso al panel según el rol del usuario

### Administración

- Panel con resumen general
- Lista completa de productos
- Buscador de productos
- Creación y edición de productos
- Gestión de nombre, precio, inventario, género, tallas y etiquetas
- Carga de imágenes
- Eliminación visual de imágenes asociadas a un producto
- Estados de carga al guardar cambios

## 🛠️ Tecnologías

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Axios
- Tailwind CSS
- shadcn/ui
- Lucide React
- Sonner

## 🗂️ Rutas principales

| Ruta | Descripción |
| --- | --- |
| `/` | Página principal y catálogo |
| `/gender/men` | Productos para hombres |
| `/gender/women` | Productos para mujeres |
| `/gender/kid` | Productos para niños |
| `/product/:idSlug` | Detalle de producto |
| `/auth/login` | Inicio de sesión |
| `/auth/register` | Registro |
| `/admin` | Panel de administración |
| `/admin/products` | Gestión de productos |
| `/admin/products/:id` | Edición de producto |

## 📦 Instalación local

Requisitos:

- Node.js 18 o superior
- npm

Clona el proyecto y entra en la carpeta:

```bash
git clone <URL_DEL_REPOSITORIO>
cd teslo-shop-react
```

Instala las dependencias:

```bash
npm install
```

Crea el archivo de entorno a partir de la plantilla:

```bash
cp .env.template .env
```

En Windows PowerShell puedes crearla así:

```powershell
Copy-Item .env.template .env
```

Configura la API:

```env
VITE_API_URL=http://localhost:3000/api
```

Inicia el proyecto:

```bash
npm run dev
```

Abre la dirección que muestre Vite, normalmente:

```text
http://localhost:5173
```

## 🧪 Comandos disponibles

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## 📁 Organización básica

- `src/shop`: tienda, filtros, catálogo y detalle de productos
- `src/admin`: dashboard y administración de productos
- `src/auth`: login, registro y manejo de autenticación
- `src/components`: componentes compartidos
- `src/api`: configuración de Axios
- `src/lib`: utilidades comunes
- `src/interfaces`: tipos principales de datos
