/**
 * EJERCICIO 11 — React Router
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 *
 * IMPORTANTE: Necesitás instalar React Router:
 *   npm install react-router-dom
 *
 * Estos ejercicios se ejecutan en tu proyecto de práctica (mi-practica).
 * Copia el contenido en src/App.jsx para probarlos.
 */

// import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate, useSearchParams, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 11A — Rutas básicas (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea una app con 3 páginas y navegación.
 *
 * Requisitos:
 * 1. BrowserRouter envuelve toda la app
 * 2. Navbar con 3 Links: Inicio (/), Productos (/products), Contacto (/contact)
 * 3. Usa NavLink en vez de Link para resaltar el link activo (fontWeight bold)
 * 4. 3 componentes de página:
 *    - Home: <h1>Inicio</h1> y un párrafo de bienvenida
 *    - Products: <h1>Productos</h1> y una lista de 5 productos
 *    - Contact: <h1>Contacto</h1> y un formulario simple (nombre + email)
 * 5. Ruta 404: <Route path="*"> que muestra "Página no encontrada" con Link a /
 * 6. El navbar siempre visible arriba
 *
 * Pista:
 *   <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
 */
export function BasicRouterApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 11B — Rutas dinámicas y nested routes (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea una app de blog con rutas anidadas y parámetros dinámicos.
 *
 * Datos:
 *   const POSTS = [
 *     { id: "1", title: "Intro a React", body: "React es una librería..." },
 *     { id: "2", title: "Hooks explicados", body: "Los hooks permiten..." },
 *     { id: "3", title: "React Router", body: "Para navegar en SPAs..." },
 *   ];
 *
 * Rutas:
 *   /              → Home
 *   /blog          → Lista de posts (BlogIndex)
 *   /blog/:postId  → Detalle de un post (BlogPost)
 *
 * Requisitos:
 * 1. Layout con Outlet para rutas anidadas
 * 2. BlogIndex: lista de posts con Links a /blog/{id}
 * 3. BlogPost: usa useParams() para leer postId y mostrar el post
 *    - Si el post no existe, mostrar "Post no encontrado" con Link a /blog
 * 4. Navbar con links a Home y Blog
 * 5. Usa <Route index> para BlogIndex como ruta por defecto de /blog
 *
 * Estructura de rutas:
 *   <Route path="/" element={<Layout />}>
 *     <Route index element={<Home />} />
 *     <Route path="blog" element={<BlogLayout />}>
 *       <Route index element={<BlogIndex />} />
 *       <Route path=":postId" element={<BlogPost />} />
 *     </Route>
 *     <Route path="*" element={<NotFound />} />
 *   </Route>
 */
export function BlogApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 11C — Navegación programática y search params (★★★)
// ─────────────────────────────────────────────
/**
 * Crea una app de productos con búsqueda en la URL.
 *
 * Datos:
 *   const PRODUCTS = [
 *     { id: "1", name: "Laptop", category: "tech", price: 999 },
 *     { id: "2", name: "Camiseta", category: "ropa", price: 25 },
 *     { id: "3", name: "Auriculares", category: "tech", price: 149 },
 *     { id: "4", name: "Pantalón", category: "ropa", price: 45 },
 *     { id: "5", name: "Monitor", category: "tech", price: 349 },
 *     { id: "6", name: "Zapatillas", category: "ropa", price: 89 },
 *   ];
 *
 * Rutas:
 *   /products           → Lista de productos con filtros
 *   /products/:id       → Detalle de producto
 *
 * Requisitos:
 * 1. ProductList: usa useSearchParams para leer/escribir filtros en la URL
 *    - ?search=laptop → filtra por nombre
 *    - ?category=tech → filtra por categoría
 *    - Los filtros se combinan
 * 2. Input de búsqueda y select de categoría que actualizan la URL
 *    (no estado local — los filtros viven en la URL)
 * 3. Cada producto es un Link a /products/:id
 * 4. ProductDetail: muestra detalle con botón "Volver" que usa useNavigate(-1)
 * 5. Si cambias la URL manualmente (?search=monitor), la UI se actualiza
 *
 * Pista: setSearchParams({ search: "...", category: "..." })
 */
export function ProductSearchApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 11D — Rutas protegidas con auth (★★★)
// ─────────────────────────────────────────────
/**
 * Crea una app con rutas públicas y protegidas.
 *
 * Rutas:
 *   /           → Home (pública)
 *   /login      → LoginPage (pública, redirige a /dashboard si ya está autenticado)
 *   /dashboard  → Dashboard (protegida)
 *   /settings   → Settings (protegida)
 *
 * Requisitos:
 * 1. AuthContext con estado user (null | { name, role })
 *    - login(name): setUser({ name, role: "user" })
 *    - logout(): setUser(null)
 * 2. ProtectedRoute: componente wrapper
 *    - Si no hay user → <Navigate to="/login" replace />
 *    - Si hay user → renderiza children
 * 3. LoginPage:
 *    - Si ya está autenticado → <Navigate to="/dashboard" replace />
 *    - Formulario con input de nombre y botón "Login"
 *    - Al hacer login, usa useNavigate para ir a /dashboard
 * 4. Dashboard: muestra "Bienvenido, {name}" y botón logout
 *    - Al logout, navega a /
 * 5. Settings: muestra configuración (cualquier contenido)
 * 6. Navbar: muestra links diferentes según si hay user o no
 *    - Sin auth: Home, Login
 *    - Con auth: Home, Dashboard, Settings, botón Logout
 *
 * Pista: ProtectedRoute es así:
 *   function ProtectedRoute({ children }) {
 *     const { user } = useAuth();
 *     if (!user) return <Navigate to="/login" replace />;
 *     return children;
 *   }
 */
export function AuthRouterApp() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 11A:
 * // import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
 * //
 * // function Home() { return <div><h1>Inicio</h1><p>Bienvenido a la app</p></div>; }
 * // function Products() {
 * //   const items = ["Laptop", "Mouse", "Teclado", "Monitor", "Auriculares"];
 * //   return <div><h1>Productos</h1><ul>{items.map(i => <li key={i}>{i}</li>)}</ul></div>;
 * // }
 * // function Contact() {
 * //   return (
 * //     <div>
 * //       <h1>Contacto</h1>
 * //       <form onSubmit={e => e.preventDefault()}>
 * //         <input placeholder="Nombre" /><br/>
 * //         <input placeholder="Email" /><br/>
 * //         <button type="submit">Enviar</button>
 * //       </form>
 * //     </div>
 * //   );
 * // }
 * // function NotFound() { return <div><h1>404</h1><NavLink to="/">Volver al inicio</NavLink></div>; }
 * //
 * // function Navbar() {
 * //   const linkStyle = ({ isActive }) => ({
 * //     fontWeight: isActive ? "bold" : "normal",
 * //     marginRight: 12,
 * //   });
 * //   return (
 * //     <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
 * //       <NavLink to="/" style={linkStyle}>Inicio</NavLink>
 * //       <NavLink to="/products" style={linkStyle}>Productos</NavLink>
 * //       <NavLink to="/contact" style={linkStyle}>Contacto</NavLink>
 * //     </nav>
 * //   );
 * // }
 * //
 * // export function BasicRouterApp() {
 * //   return (
 * //     <BrowserRouter>
 * //       <Navbar />
 * //       <main style={{ padding: 16 }}>
 * //         <Routes>
 * //           <Route path="/" element={<Home />} />
 * //           <Route path="/products" element={<Products />} />
 * //           <Route path="/contact" element={<Contact />} />
 * //           <Route path="*" element={<NotFound />} />
 * //         </Routes>
 * //       </main>
 * //     </BrowserRouter>
 * //   );
 * // }
 *
 *
 * // 11B:
 * // import { BrowserRouter, Routes, Route, Link, useParams, Outlet } from "react-router-dom";
 * //
 * // const POSTS = [
 * //   { id: "1", title: "Intro a React", body: "React es una librería para construir interfaces..." },
 * //   { id: "2", title: "Hooks explicados", body: "Los hooks permiten usar estado en funciones..." },
 * //   { id: "3", title: "React Router", body: "Para navegar en SPAs sin recargar la página..." },
 * // ];
 * //
 * // function Layout() {
 * //   return (
 * //     <div>
 * //       <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
 * //         <Link to="/" style={{ marginRight: 12 }}>Home</Link>
 * //         <Link to="/blog">Blog</Link>
 * //       </nav>
 * //       <main style={{ padding: 16 }}><Outlet /></main>
 * //     </div>
 * //   );
 * // }
 * //
 * // function Home() { return <h1>Home</h1>; }
 * //
 * // function BlogLayout() { return <div><h1>Blog</h1><Outlet /></div>; }
 * //
 * // function BlogIndex() {
 * //   return (
 * //     <ul>
 * //       {POSTS.map(p => (
 * //         <li key={p.id}><Link to={`/blog/${p.id}`}>{p.title}</Link></li>
 * //       ))}
 * //     </ul>
 * //   );
 * // }
 * //
 * // function BlogPost() {
 * //   const { postId } = useParams();
 * //   const post = POSTS.find(p => p.id === postId);
 * //   if (!post) return <div><p>Post no encontrado</p><Link to="/blog">Volver</Link></div>;
 * //   return <div><h2>{post.title}</h2><p>{post.body}</p><Link to="/blog">← Volver</Link></div>;
 * // }
 * //
 * // function NotFound() { return <div><h1>404</h1><Link to="/">Inicio</Link></div>; }
 * //
 * // export function BlogApp() {
 * //   return (
 * //     <BrowserRouter>
 * //       <Routes>
 * //         <Route path="/" element={<Layout />}>
 * //           <Route index element={<Home />} />
 * //           <Route path="blog" element={<BlogLayout />}>
 * //             <Route index element={<BlogIndex />} />
 * //             <Route path=":postId" element={<BlogPost />} />
 * //           </Route>
 * //           <Route path="*" element={<NotFound />} />
 * //         </Route>
 * //       </Routes>
 * //     </BrowserRouter>
 * //   );
 * // }
 *
 *
 * // 11C:
 * // import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
 * //
 * // const PRODUCTS = [
 * //   { id: "1", name: "Laptop", category: "tech", price: 999 },
 * //   { id: "2", name: "Camiseta", category: "ropa", price: 25 },
 * //   { id: "3", name: "Auriculares", category: "tech", price: 149 },
 * //   { id: "4", name: "Pantalón", category: "ropa", price: 45 },
 * //   { id: "5", name: "Monitor", category: "tech", price: 349 },
 * //   { id: "6", name: "Zapatillas", category: "ropa", price: 89 },
 * // ];
 * //
 * // function ProductList() {
 * //   const [searchParams, setSearchParams] = useSearchParams();
 * //   const search = searchParams.get("search") || "";
 * //   const category = searchParams.get("category") || "all";
 * //
 * //   const filtered = PRODUCTS.filter(p => {
 * //     const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
 * //     const matchCategory = category === "all" || p.category === category;
 * //     return matchSearch && matchCategory;
 * //   });
 * //
 * //   function updateFilters(key, value) {
 * //     const params = Object.fromEntries(searchParams);
 * //     if (value && value !== "all") params[key] = value;
 * //     else delete params[key];
 * //     setSearchParams(params);
 * //   }
 * //
 * //   return (
 * //     <div>
 * //       <h1>Productos</h1>
 * //       <input placeholder="Buscar..." value={search} onChange={e => updateFilters("search", e.target.value)} />
 * //       <select value={category} onChange={e => updateFilters("category", e.target.value)}>
 * //         <option value="all">Todas</option>
 * //         <option value="tech">Tech</option>
 * //         <option value="ropa">Ropa</option>
 * //       </select>
 * //       <p>{filtered.length} resultados</p>
 * //       <ul>
 * //         {filtered.map(p => (
 * //           <li key={p.id}><Link to={`/products/${p.id}`}>{p.name} — ${p.price}</Link></li>
 * //         ))}
 * //       </ul>
 * //     </div>
 * //   );
 * // }
 * //
 * // function ProductDetail() {
 * //   const { id } = useParams();
 * //   const navigate = useNavigate();
 * //   const product = PRODUCTS.find(p => p.id === id);
 * //   if (!product) return <p>Producto no encontrado</p>;
 * //   return (
 * //     <div>
 * //       <h1>{product.name}</h1>
 * //       <p>Categoría: {product.category}</p>
 * //       <p>Precio: ${product.price}</p>
 * //       <button onClick={() => navigate(-1)}>← Volver</button>
 * //     </div>
 * //   );
 * // }
 * //
 * // export function ProductSearchApp() {
 * //   return (
 * //     <BrowserRouter>
 * //       <Routes>
 * //         <Route path="/products" element={<ProductList />} />
 * //         <Route path="/products/:id" element={<ProductDetail />} />
 * //       </Routes>
 * //     </BrowserRouter>
 * //   );
 * // }
 *
 *
 * // 11D:
 * // import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom";
 * // import { createContext, useContext, useState } from "react";
 * //
 * // const AuthContext = createContext(null);
 * // function AuthProvider({ children }) {
 * //   const [user, setUser] = useState(null);
 * //   const login = (name) => setUser({ name, role: "user" });
 * //   const logout = () => setUser(null);
 * //   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
 * // }
 * // function useAuth() {
 * //   const ctx = useContext(AuthContext);
 * //   if (!ctx) throw new Error("useAuth fuera de AuthProvider");
 * //   return ctx;
 * // }
 * //
 * // function ProtectedRoute({ children }) {
 * //   const { user } = useAuth();
 * //   if (!user) return <Navigate to="/login" replace />;
 * //   return children;
 * // }
 * //
 * // function Navbar() {
 * //   const { user, logout } = useAuth();
 * //   const navigate = useNavigate();
 * //   const style = ({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal", marginRight: 12 });
 * //   return (
 * //     <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
 * //       <NavLink to="/" style={style}>Home</NavLink>
 * //       {user ? (
 * //         <>
 * //           <NavLink to="/dashboard" style={style}>Dashboard</NavLink>
 * //           <NavLink to="/settings" style={style}>Settings</NavLink>
 * //           <button onClick={() => { logout(); navigate("/"); }}>Logout ({user.name})</button>
 * //         </>
 * //       ) : (
 * //         <NavLink to="/login" style={style}>Login</NavLink>
 * //       )}
 * //     </nav>
 * //   );
 * // }
 * //
 * // function Home() { return <h1>Home (pública)</h1>; }
 * //
 * // function LoginPage() {
 * //   const { user, login } = useAuth();
 * //   const navigate = useNavigate();
 * //   const [name, setName] = useState("");
 * //   if (user) return <Navigate to="/dashboard" replace />;
 * //   return (
 * //     <form onSubmit={e => { e.preventDefault(); login(name); navigate("/dashboard"); }}>
 * //       <h1>Login</h1>
 * //       <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" />
 * //       <button type="submit" disabled={!name}>Entrar</button>
 * //     </form>
 * //   );
 * // }
 * //
 * // function Dashboard() {
 * //   const { user } = useAuth();
 * //   return <div><h1>Dashboard</h1><p>Bienvenido, {user.name}</p></div>;
 * // }
 * //
 * // function Settings() { return <div><h1>Settings</h1><p>Configuración de la cuenta</p></div>; }
 * //
 * // export function AuthRouterApp() {
 * //   return (
 * //     <BrowserRouter>
 * //       <AuthProvider>
 * //         <Navbar />
 * //         <main style={{ padding: 16 }}>
 * //           <Routes>
 * //             <Route path="/" element={<Home />} />
 * //             <Route path="/login" element={<LoginPage />} />
 * //             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 * //             <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
 * //           </Routes>
 * //         </main>
 * //       </AuthProvider>
 * //     </BrowserRouter>
 * //   );
 * // }
 */
