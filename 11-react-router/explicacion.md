# React Router — Navegación sin recargar la página

---

## El problema que resuelve

En una web tradicional, cada link recarga toda la página desde el servidor. Tu app React vive en **una sola página** (SPA), pero el usuario espera poder:

- Navegar con URLs: `/products`, `/about`, `/users/42`
- Usar el botón "atrás" del navegador
- Compartir un link directo a una sección
- Que la URL refleje lo que está viendo

React Router maneja todo esto: cambia la URL y renderiza el componente correcto **sin recargar la página**.

---

## La analogía: Las pestañas de un navegador

Imagina tu app como un edificio con muchas habitaciones (páginas). React Router es el **mapa del edificio**:

- La URL es la **dirección** de la habitación: `/cocina`, `/baño`, `/dormitorio`
- El Router es el **portero** que te lleva a la habitación correcta
- `<Link>` es como **caminar** de una habitación a otra (sin salir del edificio)
- Un `<a href>` normal es como **salir del edificio y volver a entrar** (recarga toda la página)

---

## Setup

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* Navegación — siempre visible */}
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/about">Acerca de</Link>
      </nav>

      {/* Contenido — cambia según la URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Los conceptos clave:

- **`<BrowserRouter>`**: envuelve toda la app, habilita el routing
- **`<Routes>`**: contenedor de rutas (solo renderiza la que coincide)
- **`<Route>`**: define una ruta — "cuando la URL sea X, renderiza Y"
- **`<Link>`**: navega sin recargar (reemplaza a `<a href>`)

---

## Link vs `<a href>`

```jsx
// ❌ Recarga toda la página — pierde el estado de React
<a href="/products">Productos</a>

// ✅ Navega sin recargar — mantiene el estado
<Link to="/products">Productos</Link>

// ✅ NavLink — igual que Link pero sabe si está activo
<NavLink
  to="/products"
  style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
>
  Productos
</NavLink>
```

---

## Rutas dinámicas con parámetros

Para URLs como `/users/42` o `/products/laptop`:

```jsx
import { useParams } from "react-router-dom";

// En las rutas:
<Route path="/users/:userId" element={<UserProfile />} />

// En el componente:
function UserProfile() {
  const { userId } = useParams();  // "42" si la URL es /users/42

  return <h1>Perfil del usuario {userId}</h1>;
}
```

`:userId` es un **parámetro dinámico** — cualquier valor en esa posición se captura.

---

## Rutas anidadas (Nested Routes)

Para layouts con secciones compartidas:

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Estas rutas se renderizan DENTRO de Layout */}
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

```jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
      </nav>

      {/* Outlet = "aquí va la ruta hija activa" */}
      <main>
        <Outlet />
      </main>

      <footer>© 2024</footer>
    </div>
  );
}
```

- `<Outlet />` es el **placeholder** donde se renderiza la ruta hija activa
- `index` = la ruta por defecto (cuando la URL es exactamente `/`)
- El nav y footer están en Layout → **siempre visibles**

---

## Navegación programática

Para navegar desde código (después de un submit, login, etc.):

```jsx
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await login(data);
    navigate("/dashboard");  // Redirige después del login
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

```jsx
// Variantes:
navigate("/products");       // Ir a /products
navigate(-1);                // Ir atrás (como el botón del navegador)
navigate("/login", { replace: true });  // Reemplaza en el historial
                                         // (no puede volver atrás)
```

---

## Ruta 404 (No encontrada)

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  {/* Catch-all: cualquier URL que no coincida */}
  <Route path="*" element={<NotFound />} />
</Routes>

function NotFound() {
  return (
    <div>
      <h1>404 — Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
```

`path="*"` coincide con **cualquier** URL que no matcheó antes.

---

## Rutas protegidas (autenticación)

Patrón para páginas que requieren login:

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useAuth();  // tu context de auth

  if (!user) {
    // No autenticado → redirige al login
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Uso:
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## Search params (query strings)

Para URLs como `/products?search=laptop&category=tech`:

```jsx
import { useSearchParams } from "react-router-dom";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";

  function handleSearch(value) {
    setSearchParams({ search: value, category });
  }

  return (
    <div>
      <input
        value={search}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Buscar..."
      />
      <p>Categoría: {category}</p>
    </div>
  );
}
```

La ventaja: los filtros están en la URL → se pueden compartir y persistir.

---

## Hooks de React Router — resumen

| Hook | Para qué |
|---|---|
| `useParams()` | Leer parámetros dinámicos (`:id`) |
| `useNavigate()` | Navegar programáticamente |
| `useSearchParams()` | Leer/escribir query strings (`?key=value`) |
| `useLocation()` | Leer la URL actual (`pathname`, `search`, `hash`) |
| `useMatch()` | Verificar si una ruta coincide |

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es React Router? | Librería de navegación para SPAs — cambia la URL sin recargar |
| ¿Link vs `<a>`? | Link navega sin recargar, `<a>` recarga toda la página |
| ¿Qué es Outlet? | Placeholder donde se renderiza la ruta hija activa |
| ¿Cómo hago rutas dinámicas? | `path="/users/:id"` + `useParams()` |
| ¿Cómo protejo rutas? | Componente wrapper que verifica auth y redirige con `<Navigate>` |
| ¿Cómo navego desde código? | `useNavigate()` |
| ¿Ruta 404? | `<Route path="*" element={<NotFound />} />` al final |
