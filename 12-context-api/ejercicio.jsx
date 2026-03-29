/**
 * EJERCICIO 10 — Context API
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { createContext, useContext, useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 10A — ThemeContext básico (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un sistema de tema (dark/light) con Context.
 *
 * Requisitos:
 * 1. Crear ThemeContext con createContext
 * 2. ThemeProvider: componente que envuelve children con el Provider
 *    - Estado: theme ("light" | "dark")
 *    - Provee: { theme, toggleTheme }
 * 3. useTheme: custom hook que consume el contexto
 *    - Debe lanzar error si se usa fuera del Provider
 * 4. Header: muestra el tema actual y un botón para cambiar
 * 5. Card: un div que cambia sus estilos según el tema
 *    - light: fondo blanco, texto negro
 *    - dark: fondo #333, texto blanco
 * 6. ThemeApp: componente raíz que envuelve todo con ThemeProvider
 *
 * Estructura:
 *   <ThemeProvider>
 *     <Header />
 *     <Card>Contenido de ejemplo</Card>
 *   </ThemeProvider>
 *
 * Pista: ThemeProvider usa useState internamente y pasa { theme, toggleTheme } como value.
 */
// Tu código aquí: ThemeContext, ThemeProvider, useTheme, Header, Card

export function ThemeApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 10B — AuthContext con login/logout (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un sistema de autenticación con Context.
 *
 * Requisitos:
 * 1. AuthContext + AuthProvider:
 *    - Estado: user (null = no autenticado, { name, email } = autenticado)
 *    - Provee: { user, login, logout }
 *    - login(name, email): setUser({ name, email })
 *    - logout(): setUser(null)
 * 2. useAuth: custom hook con validación
 * 3. LoginForm: formulario con nombre y email
 *    - Solo se muestra si NO hay usuario autenticado
 *    - Al submit: llama a login(name, email)
 * 4. UserPanel: muestra los datos del usuario y botón logout
 *    - Solo se muestra si HAY usuario autenticado
 * 5. Navbar: muestra "Hola, {name}" si está autenticado, o "No autenticado" si no
 * 6. AuthApp: componente raíz
 *
 * Estructura:
 *   <AuthProvider>
 *     <Navbar />
 *     <main>
 *       {user ? <UserPanel /> : <LoginForm />}
 *     </main>
 *   </AuthProvider>
 *
 * Pista: LoginForm tiene estado LOCAL para sus inputs (nombre, email).
 *        Al hacer submit, llama a login() del contexto.
 */
// Tu código aquí: AuthContext, AuthProvider, useAuth, LoginForm, UserPanel, Navbar

export function AuthApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 10C — Carrito de compras con Context (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un mini e-commerce con Context para el carrito.
 *
 * Componentes y requisitos:
 *
 * 1. CartContext + CartProvider:
 *    - Estado: items (array de { id, name, price, quantity })
 *    - Provee: { items, addItem, removeItem, updateQuantity, total, itemCount }
 *    - addItem(product): si ya existe, incrementa quantity. Si no, agrega con quantity=1
 *    - removeItem(id): elimina del carrito
 *    - updateQuantity(id, quantity): si quantity <= 0, elimina. Si no, actualiza
 *    - total: suma de (price * quantity) de todos los items — estado derivado
 *    - itemCount: suma de todas las quantities — estado derivado
 *
 * 2. ProductCatalog: lista de productos con botón "Agregar al carrito"
 *    const CATALOG = [
 *      { id: 1, name: "Camiseta", price: 25 },
 *      { id: 2, name: "Pantalón", price: 45 },
 *      { id: 3, name: "Zapatos", price: 80 },
 *      { id: 4, name: "Gorra", price: 15 },
 *    ];
 *
 * 3. CartSummary: muestra el ícono del carrito con la cantidad de items
 *    - Ejemplo: "🛒 (3)" donde 3 es la suma de quantities
 *
 * 4. CartDetail: muestra los items del carrito con:
 *    - Nombre y precio de cada item
 *    - Botones +/- para cambiar quantity
 *    - Botón ✕ para eliminar
 *    - Total al final
 *    - "Carrito vacío" si no hay items
 *
 * 5. ShopApp: componente raíz
 *    <CartProvider>
 *      <header><h1>Tienda</h1><CartSummary /></header>
 *      <ProductCatalog />
 *      <CartDetail />
 *    </CartProvider>
 */
// Tu código aquí

export function ShopApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 10D — Múltiples contextos: Theme + Auth + Notifications (★★★)
// ─────────────────────────────────────────────
/**
 * Combina múltiples contextos en una app.
 *
 * Contextos:
 * 1. ThemeContext: { theme, toggleTheme } — "light" | "dark"
 * 2. AuthContext: { user, login, logout } — null | { name }
 * 3. NotificationContext: { notifications, addNotification, dismissNotification }
 *    - notifications: array de { id, message, type: "success" | "error" | "info" }
 *    - addNotification(message, type): agrega una notificación
 *    - dismissNotification(id): quita una notificación
 *
 * Componentes:
 * 1. Cada contexto tiene su Provider y custom hook
 * 2. AppHeader: muestra tema, usuario, y toggle/logout buttons
 * 3. NotificationBar: muestra las notificaciones activas con botón para cerrar cada una
 *    - success: fondo verde
 *    - error: fondo rojo
 *    - info: fondo azul
 * 4. LoginSection: si no hay usuario, muestra un formulario simple (solo nombre)
 *    - Al hacer login, agrega notificación "Bienvenido, {name}" (tipo success)
 *    - Al hacer logout, agrega notificación "Sesión cerrada" (tipo info)
 * 5. MultiContextApp: anida los 3 Providers
 *
 * Estructura:
 *   <ThemeProvider>
 *     <AuthProvider>
 *       <NotificationProvider>
 *         <AppHeader />
 *         <NotificationBar />
 *         <LoginSection />
 *       </NotificationProvider>
 *     </AuthProvider>
 *   </ThemeProvider>
 *
 * Pista: LoginSection usa useAuth Y useNotification a la vez.
 */
// Tu código aquí

export function MultiContextApp() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 10A:
 * const ThemeContext = createContext(null);
 *
 * function ThemeProvider({ children }) {
 *   const [theme, setTheme] = useState("light");
 *   function toggleTheme() { setTheme(t => t === "light" ? "dark" : "light"); }
 *   return (
 *     <ThemeContext.Provider value={{ theme, toggleTheme }}>
 *       {children}
 *     </ThemeContext.Provider>
 *   );
 * }
 *
 * function useTheme() {
 *   const context = useContext(ThemeContext);
 *   if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
 *   return context;
 * }
 *
 * function Header() {
 *   const { theme, toggleTheme } = useTheme();
 *   return (
 *     <header>
 *       <p>Tema: {theme}</p>
 *       <button onClick={toggleTheme}>Cambiar tema</button>
 *     </header>
 *   );
 * }
 *
 * function Card({ children }) {
 *   const { theme } = useTheme();
 *   const style = {
 *     background: theme === "dark" ? "#333" : "#fff",
 *     color: theme === "dark" ? "#fff" : "#000",
 *     padding: 16, borderRadius: 8, marginTop: 12,
 *     border: "1px solid #ddd",
 *   };
 *   return <div style={style}>{children}</div>;
 * }
 *
 * export function ThemeApp() {
 *   return (
 *     <ThemeProvider>
 *       <Header />
 *       <Card>Contenido de ejemplo</Card>
 *     </ThemeProvider>
 *   );
 * }
 *
 *
 * // 10B:
 * const AuthContext = createContext(null);
 *
 * function AuthProvider({ children }) {
 *   const [user, setUser] = useState(null);
 *   function login(name, email) { setUser({ name, email }); }
 *   function logout() { setUser(null); }
 *   return (
 *     <AuthContext.Provider value={{ user, login, logout }}>
 *       {children}
 *     </AuthContext.Provider>
 *   );
 * }
 *
 * function useAuth() {
 *   const context = useContext(AuthContext);
 *   if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
 *   return context;
 * }
 *
 * function LoginForm() {
 *   const [name, setName] = useState("");
 *   const [email, setEmail] = useState("");
 *   const { login } = useAuth();
 *
 *   function handleSubmit(e) {
 *     e.preventDefault();
 *     login(name, email);
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
 *       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
 *       <button type="submit" disabled={!name || !email}>Iniciar sesión</button>
 *     </form>
 *   );
 * }
 *
 * function UserPanel() {
 *   const { user, logout } = useAuth();
 *   return (
 *     <div>
 *       <h2>Panel de usuario</h2>
 *       <p>Nombre: {user.name}</p>
 *       <p>Email: {user.email}</p>
 *       <button onClick={logout}>Cerrar sesión</button>
 *     </div>
 *   );
 * }
 *
 * function Navbar() {
 *   const { user } = useAuth();
 *   return (
 *     <nav style={{ padding: 12, background: "#f5f5f5", marginBottom: 16 }}>
 *       {user ? `Hola, ${user.name}` : "No autenticado"}
 *     </nav>
 *   );
 * }
 *
 * export function AuthApp() {
 *   return (
 *     <AuthProvider>
 *       <Navbar />
 *       <main>
 *         <AuthContent />
 *       </main>
 *     </AuthProvider>
 *   );
 * }
 *
 * function AuthContent() {
 *   const { user } = useAuth();
 *   return user ? <UserPanel /> : <LoginForm />;
 * }
 *
 *
 * // 10C:
 * const CartContext = createContext(null);
 *
 * const CATALOG = [
 *   { id: 1, name: "Camiseta", price: 25 },
 *   { id: 2, name: "Pantalón", price: 45 },
 *   { id: 3, name: "Zapatos", price: 80 },
 *   { id: 4, name: "Gorra", price: 15 },
 * ];
 *
 * function CartProvider({ children }) {
 *   const [items, setItems] = useState([]);
 *
 *   function addItem(product) {
 *     setItems(prev => {
 *       const existing = prev.find(i => i.id === product.id);
 *       if (existing) {
 *         return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
 *       }
 *       return [...prev, { ...product, quantity: 1 }];
 *     });
 *   }
 *
 *   function removeItem(id) {
 *     setItems(prev => prev.filter(i => i.id !== id));
 *   }
 *
 *   function updateQuantity(id, quantity) {
 *     if (quantity <= 0) { removeItem(id); return; }
 *     setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
 *   }
 *
 *   const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
 *   const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
 *
 *   return (
 *     <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total, itemCount }}>
 *       {children}
 *     </CartContext.Provider>
 *   );
 * }
 *
 * function useCart() {
 *   const context = useContext(CartContext);
 *   if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
 *   return context;
 * }
 *
 * function ProductCatalog() {
 *   const { addItem } = useCart();
 *   return (
 *     <div>
 *       <h2>Catálogo</h2>
 *       {CATALOG.map(p => (
 *         <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: 8 }}>
 *           <span>{p.name} — ${p.price}</span>
 *           <button onClick={() => addItem(p)}>Agregar al carrito</button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 *
 * function CartSummary() {
 *   const { itemCount } = useCart();
 *   return <span>🛒 ({itemCount})</span>;
 * }
 *
 * function CartDetail() {
 *   const { items, removeItem, updateQuantity, total } = useCart();
 *   if (items.length === 0) return <p>Carrito vacío</p>;
 *   return (
 *     <div>
 *       <h2>Carrito</h2>
 *       {items.map(item => (
 *         <div key={item.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: 4 }}>
 *           <span>{item.name} — ${item.price} x {item.quantity}</span>
 *           <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
 *           <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
 *           <button onClick={() => removeItem(item.id)}>✕</button>
 *         </div>
 *       ))}
 *       <p><strong>Total: ${total}</strong></p>
 *     </div>
 *   );
 * }
 *
 * export function ShopApp() {
 *   return (
 *     <CartProvider>
 *       <header style={{ display: "flex", justifyContent: "space-between", padding: 12, borderBottom: "1px solid #ddd" }}>
 *         <h1>Tienda</h1>
 *         <CartSummary />
 *       </header>
 *       <ProductCatalog />
 *       <CartDetail />
 *     </CartProvider>
 *   );
 * }
 *
 *
 * // 10D:
 * const ThemeCtx = createContext(null);
 * const AuthCtx = createContext(null);
 * const NotifCtx = createContext(null);
 *
 * function ThemeProvider({ children }) {
 *   const [theme, setTheme] = useState("light");
 *   return (
 *     <ThemeCtx.Provider value={{ theme, toggleTheme: () => setTheme(t => t === "light" ? "dark" : "light") }}>
 *       {children}
 *     </ThemeCtx.Provider>
 *   );
 * }
 * function useThemeCtx() {
 *   const ctx = useContext(ThemeCtx);
 *   if (!ctx) throw new Error("useThemeCtx fuera de ThemeProvider");
 *   return ctx;
 * }
 *
 * function AuthProvider({ children }) {
 *   const [user, setUser] = useState(null);
 *   return (
 *     <AuthCtx.Provider value={{ user, login: (name) => setUser({ name }), logout: () => setUser(null) }}>
 *       {children}
 *     </AuthCtx.Provider>
 *   );
 * }
 * function useAuthCtx() {
 *   const ctx = useContext(AuthCtx);
 *   if (!ctx) throw new Error("useAuthCtx fuera de AuthProvider");
 *   return ctx;
 * }
 *
 * function NotificationProvider({ children }) {
 *   const [notifications, setNotifications] = useState([]);
 *   function addNotification(message, type = "info") {
 *     setNotifications(prev => [...prev, { id: Date.now(), message, type }]);
 *   }
 *   function dismissNotification(id) {
 *     setNotifications(prev => prev.filter(n => n.id !== id));
 *   }
 *   return (
 *     <NotifCtx.Provider value={{ notifications, addNotification, dismissNotification }}>
 *       {children}
 *     </NotifCtx.Provider>
 *   );
 * }
 * function useNotification() {
 *   const ctx = useContext(NotifCtx);
 *   if (!ctx) throw new Error("useNotification fuera de NotificationProvider");
 *   return ctx;
 * }
 *
 * function AppHeader() {
 *   const { theme, toggleTheme } = useThemeCtx();
 *   const { user, logout } = useAuthCtx();
 *   const { addNotification } = useNotification();
 *   return (
 *     <header style={{
 *       padding: 12, display: "flex", justifyContent: "space-between",
 *       background: theme === "dark" ? "#333" : "#f5f5f5",
 *       color: theme === "dark" ? "#fff" : "#000",
 *     }}>
 *       <div>
 *         <button onClick={toggleTheme}>Tema: {theme}</button>
 *       </div>
 *       <div>
 *         {user ? (
 *           <>
 *             <span>Hola, {user.name} </span>
 *             <button onClick={() => { logout(); addNotification("Sesión cerrada", "info"); }}>Logout</button>
 *           </>
 *         ) : <span>No autenticado</span>}
 *       </div>
 *     </header>
 *   );
 * }
 *
 * function NotificationBar() {
 *   const { notifications, dismissNotification } = useNotification();
 *   const colors = { success: "#4caf50", error: "#f44336", info: "#2196f3" };
 *   if (notifications.length === 0) return null;
 *   return (
 *     <div>
 *       {notifications.map(n => (
 *         <div key={n.id} style={{ background: colors[n.type], color: "#fff", padding: "8px 12px", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
 *           <span>{n.message}</span>
 *           <button onClick={() => dismissNotification(n.id)} style={{ background: "none", color: "#fff", border: "none", cursor: "pointer" }}>✕</button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 *
 * function LoginSection() {
 *   const { user, login } = useAuthCtx();
 *   const { addNotification } = useNotification();
 *   const [name, setName] = useState("");
 *
 *   if (user) return <p>Bienvenido al panel, {user.name}</p>;
 *
 *   function handleSubmit(e) {
 *     e.preventDefault();
 *     login(name);
 *     addNotification(`Bienvenido, ${name}`, "success");
 *     setName("");
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} />
 *       <button type="submit" disabled={!name}>Login</button>
 *     </form>
 *   );
 * }
 *
 * export function MultiContextApp() {
 *   return (
 *     <ThemeProvider>
 *       <AuthProvider>
 *         <NotificationProvider>
 *           <AppHeader />
 *           <NotificationBar />
 *           <LoginSection />
 *         </NotificationProvider>
 *       </AuthProvider>
 *     </ThemeProvider>
 *   );
 * }
 */
