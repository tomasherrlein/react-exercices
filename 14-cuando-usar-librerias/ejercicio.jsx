/**
 * EJERCICIO 12 — Cuándo usar librerías de estado
 *
 * Cuatro ejercicios que comparan diferentes niveles de manejo de estado.
 * Lee explicacion.md primero para entender la escalera de complejidad.
 *
 * Nota: Los ejercicios 12C y 12D son conceptuales / pseudo-código.
 * No necesitas instalar React Query ni Zustand para completarlos,
 * pero sí entender cuándo y por qué usarías cada herramienta.
 */

import { createContext, useContext, useReducer, useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 12A — Refactor: de prop drilling a Context (★★☆)
// ─────────────────────────────────────────────
/**
 * El siguiente código tiene PROP DRILLING. Tu tarea es refactorizarlo
 * para usar Context y eliminar las props innecesarias.
 *
 * Código original (con prop drilling):
 *
 *   function App() {
 *     const [user, setUser] = useState({ name: "Ana", role: "admin" });
 *     const [theme, setTheme] = useState("light");
 *     return <Layout user={user} theme={theme} onToggleTheme={() => setTheme(t => t === "light" ? "dark" : "light")} />;
 *   }
 *   function Layout({ user, theme, onToggleTheme }) {
 *     return <div><Header user={user} theme={theme} onToggleTheme={onToggleTheme} /><Main user={user} theme={theme} /></div>;
 *   }
 *   function Header({ user, theme, onToggleTheme }) {
 *     return <header><span>{user.name}</span><button onClick={onToggleTheme}>{theme}</button></header>;
 *   }
 *   function Main({ user, theme }) {
 *     return <main><Dashboard user={user} theme={theme} /></main>;
 *   }
 *   function Dashboard({ user, theme }) {
 *     return <div style={{ background: theme === "dark" ? "#333" : "#fff" }}><p>Bienvenido, {user.name} ({user.role})</p></div>;
 *   }
 *
 * Requisitos:
 * 1. Crea UserContext + UserProvider (con custom hook useUser)
 * 2. Crea ThemeContext + ThemeProvider (con custom hook useThemeCtx)
 * 3. Layout, Main ya NO reciben props — solo pasan children
 * 4. Header y Dashboard consumen el contexto directamente
 * 5. La funcionalidad debe ser idéntica al original
 */
// Tu código aquí

export function RefactoredApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 12B — Elegir la herramienta correcta (★★☆)
// ─────────────────────────────────────────────
/**
 * Para cada escenario, implementa la solución usando la herramienta CORRECTA
 * según la escalera de complejidad.
 *
 * Escenario 1: Toggle de sidebar (abierto/cerrado)
 *   → ¿Qué herramienta? _________
 *   → Implementa el componente Sidebar con la herramienta elegida
 *
 * Escenario 2: Formulario de contacto con nombre, email, mensaje y validación
 *   → ¿Qué herramienta? _________
 *   → Implementa ContactForm con la herramienta elegida
 *
 * Escenario 3: Tema dark/light que necesitan 15+ componentes dispersos
 *   → ¿Qué herramienta? _________
 *   → Implementa ThemeSystem con la herramienta elegida
 *
 * Escenario 4: Lista de tareas con agregar, eliminar, editar, filtrar, y ordenar
 *   → ¿Qué herramienta? _________
 *   → Implementa TaskManager con la herramienta elegida
 *
 * Para cada uno, agrega un comentario explicando POR QUÉ elegiste esa herramienta.
 */

// Escenario 1: Toggle de sidebar
// Herramienta: ___________
// ¿Por qué? ___________
export function Sidebar() {
  // Tu código aquí
}

// Escenario 2: Formulario de contacto con validación
// Herramienta: ___________
// ¿Por qué? ___________
export function ContactForm() {
  // Tu código aquí
}

// Escenario 3: Tema global
// Herramienta: ___________
// ¿Por qué? ___________
export function ThemeSystem() {
  // Tu código aquí
}

// Escenario 4: Task manager complejo
// Herramienta: ___________
// ¿Por qué? ___________
export function TaskManager() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 12C — De useEffect a React Query (conceptual) (★★★)
// ─────────────────────────────────────────────
/**
 * El siguiente componente usa useEffect para fetch de datos.
 * Tu tarea es reescribirlo usando React Query (pseudo-código).
 *
 * NO necesitas instalar React Query — escribe cómo SE VERÍA el código
 * usando useQuery y useMutation.
 *
 * Código original:
 */
function UserListOriginal() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch inicial + cuando cambia search
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`/api/users?search=${search}`)
  //     .then(r => { if (!r.ok) throw new Error("Error"); return r.json(); })
  //     .then(data => { setUsers(data); setLoading(false); })
  //     .catch(err => { setError(err.message); setLoading(false); });
  // }, [search]);

  // Eliminar usuario
  function deleteUser(id) {
    fetch(`/api/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(prev => prev.filter(u => u.id !== id)))
      .catch(err => setError(err.message));
  }

  return null; // placeholder
}

/**
 * Reescribe UserListOriginal usando React Query.
 *
 * Requisitos:
 * 1. Usa useQuery para el fetch de usuarios
 *    - queryKey debe incluir "search" para refetch automático
 * 2. Usa useMutation para deleteUser
 *    - En onSuccess, invalida la query de usuarios para refetch
 * 3. Maneja loading, error, y empty states
 * 4. Agrega un comentario explicando qué ventajas da React Query
 *    sobre el useEffect original (mínimo 3 ventajas)
 *
 * Pista: el código se ve así (complétalo):
 *   const { data: users, isLoading, error } = useQuery({
 *     queryKey: [...],
 *     queryFn: () => ...,
 *   });
 *
 *   const deleteMutation = useMutation({
 *     mutationFn: (id) => ...,
 *     onSuccess: () => queryClient.invalidateQueries({ queryKey: [...] }),
 *   });
 */

// Ventajas de React Query sobre useEffect manual:
// 1. ___________
// 2. ___________
// 3. ___________

export function UserListWithQuery() {
  // Tu pseudo-código aquí (no necesita compilar, pero debe ser correcto conceptualmente)
}


// ─────────────────────────────────────────────
// EJERCICIO 12D — Arquitectura de estado completa (★★★)
// ─────────────────────────────────────────────
/**
 * Diseña la arquitectura de estado para una app de e-commerce.
 *
 * La app tiene estas features:
 * 1. Catálogo de productos (viene del servidor)
 * 2. Carrito de compras (estado del cliente)
 * 3. Usuario autenticado (estado del cliente, persistido)
 * 4. Tema dark/light (estado del cliente)
 * 5. Filtros del catálogo (búsqueda, categoría, precio)
 * 6. Modal de producto (abierto/cerrado + qué producto)
 * 7. Notificaciones toast (agregar/quitar)
 * 8. Formulario de checkout con 3 pasos y validación
 *
 * Para cada feature, decide:
 * - ¿Qué herramienta usarías? (useState, lifting, Context, useReducer, React Query, Zustand)
 * - ¿Por qué?
 * - ¿Dónde viviría el estado? (local en componente, Context, store)
 *
 * Implementa las partes que puedas con las herramientas que ya conoces
 * (useState, Context, useReducer). Para React Query y Zustand,
 * escribe pseudo-código mostrando cómo SE VERÍA.
 *
 * Mínimo implementa:
 * - ThemeProvider (Context)
 * - CartProvider (useReducer + Context)
 * - Un componente que use ambos contextos
 * - Pseudo-código del catálogo con React Query
 * - Comentarios explicando cada decisión
 */

// Feature 1: Catálogo de productos
// Herramienta: ___________
// ¿Por qué? ___________
// ¿Dónde vive? ___________

// Feature 2: Carrito de compras
// Herramienta: ___________
// ¿Por qué? ___________
// ¿Dónde vive? ___________

// Feature 3: Usuario autenticado
// Herramienta: ___________
// ¿Por qué? ___________
// ¿Dónde vive? ___________

// Feature 4: Tema
// Herramienta: ___________
// ¿Por qué? ___________
// ¿Dónde vive? ___________

// Feature 5: Filtros del catálogo
// Herramienta: ___________
// ¿Por qué? ___________
// ¿Dónde vive? ___________

// Feature 6: Modal de producto
// Herramienta: ___________
// ¿Por qué? ___________
// ¿Dónde vive? ___________

// Feature 7: Notificaciones toast
// Herramienta: ___________
// ¿Por qué? ___________
// ¿Dónde vive? ___________

// Feature 8: Formulario de checkout
// Herramienta: ___________
// ¿Por qué? ___________
// ¿Dónde vive? ___________

export function EcommerceApp() {
  // Tu código aquí — implementa lo que puedas, pseudo-código el resto
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 12A:
 * const UserContext = createContext(null);
 * const ThemeCtx = createContext(null);
 *
 * function UserProvider({ children }) {
 *   const [user] = useState({ name: "Ana", role: "admin" });
 *   return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
 * }
 * function useUser() {
 *   const ctx = useContext(UserContext);
 *   if (!ctx) throw new Error("useUser fuera de UserProvider");
 *   return ctx;
 * }
 *
 * function ThemeProvider({ children }) {
 *   const [theme, setTheme] = useState("light");
 *   const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
 *   return <ThemeCtx.Provider value={{ theme, toggleTheme }}>{children}</ThemeCtx.Provider>;
 * }
 * function useThemeCtx() {
 *   const ctx = useContext(ThemeCtx);
 *   if (!ctx) throw new Error("useThemeCtx fuera de ThemeProvider");
 *   return ctx;
 * }
 *
 * function Layout({ children }) {
 *   return <div>{children}</div>;
 * }
 *
 * function Header() {
 *   const user = useUser();
 *   const { theme, toggleTheme } = useThemeCtx();
 *   return <header><span>{user.name}</span> <button onClick={toggleTheme}>{theme}</button></header>;
 * }
 *
 * function Main({ children }) {
 *   return <main>{children}</main>;
 * }
 *
 * function Dashboard() {
 *   const user = useUser();
 *   const { theme } = useThemeCtx();
 *   return (
 *     <div style={{ background: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000", padding: 16 }}>
 *       <p>Bienvenido, {user.name} ({user.role})</p>
 *     </div>
 *   );
 * }
 *
 * export function RefactoredApp() {
 *   return (
 *     <UserProvider>
 *       <ThemeProvider>
 *         <Layout>
 *           <Header />
 *           <Main>
 *             <Dashboard />
 *           </Main>
 *         </Layout>
 *       </ThemeProvider>
 *     </UserProvider>
 *   );
 * }
 *
 *
 * // 12B:
 *
 * // Escenario 1: Toggle de sidebar
 * // Herramienta: useState
 * // ¿Por qué? Solo un componente necesita saber si está abierto o cerrado
 * export function Sidebar() {
 *   const [isOpen, setIsOpen] = useState(true);
 *   return (
 *     <div>
 *       <button onClick={() => setIsOpen(o => !o)}>{isOpen ? "Cerrar" : "Abrir"} sidebar</button>
 *       {isOpen && (
 *         <aside style={{ width: 250, background: "#f5f5f5", padding: 16 }}>
 *           <nav>
 *             <ul>
 *               <li>Inicio</li>
 *               <li>Perfil</li>
 *               <li>Configuración</li>
 *             </ul>
 *           </nav>
 *         </aside>
 *       )}
 *     </div>
 *   );
 * }
 *
 * // Escenario 2: Formulario de contacto con validación
 * // Herramienta: useReducer
 * // ¿Por qué? Múltiples campos con validación interdependiente — la lógica es compleja
 * function contactReducer(state, action) {
 *   switch (action.type) {
 *     case "UPDATE":
 *       return { ...state, values: { ...state.values, [action.field]: action.value }, errors: { ...state.errors, [action.field]: "" } };
 *     case "VALIDATE": {
 *       const errors = {};
 *       if (!state.values.name.trim()) errors.name = "Nombre requerido";
 *       if (!state.values.email.includes("@")) errors.email = "Email inválido";
 *       if (!state.values.message.trim()) errors.message = "Mensaje requerido";
 *       if (Object.keys(errors).length > 0) return { ...state, errors };
 *       return { ...state, errors: {}, submitted: true };
 *     }
 *     case "RESET":
 *       return { values: { name: "", email: "", message: "" }, errors: {}, submitted: false };
 *     default: throw new Error(`Acción desconocida: ${action.type}`);
 *   }
 * }
 *
 * export function ContactForm() {
 *   const [state, dispatch] = useReducer(contactReducer, {
 *     values: { name: "", email: "", message: "" }, errors: {}, submitted: false,
 *   });
 *
 *   if (state.submitted) return <div><p>¡Mensaje enviado!</p><button onClick={() => dispatch({ type: "RESET" })}>Nuevo mensaje</button></div>;
 *
 *   return (
 *     <form onSubmit={e => { e.preventDefault(); dispatch({ type: "VALIDATE" }); }}>
 *       <div>
 *         <input placeholder="Nombre" value={state.values.name} onChange={e => dispatch({ type: "UPDATE", field: "name", value: e.target.value })} />
 *         {state.errors.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
 *       </div>
 *       <div>
 *         <input placeholder="Email" value={state.values.email} onChange={e => dispatch({ type: "UPDATE", field: "email", value: e.target.value })} />
 *         {state.errors.email && <p style={{ color: "red" }}>{state.errors.email}</p>}
 *       </div>
 *       <div>
 *         <textarea placeholder="Mensaje" value={state.values.message} onChange={e => dispatch({ type: "UPDATE", field: "message", value: e.target.value })} />
 *         {state.errors.message && <p style={{ color: "red" }}>{state.errors.message}</p>}
 *       </div>
 *       <button type="submit">Enviar</button>
 *     </form>
 *   );
 * }
 *
 * // Escenario 3: Tema global
 * // Herramienta: Context API
 * // ¿Por qué? 15+ componentes dispersos necesitan el tema — prop drilling sería inmanejable
 * const GlobalThemeCtx = createContext(null);
 *
 * function GlobalThemeProvider({ children }) {
 *   const [theme, setTheme] = useState("light");
 *   return (
 *     <GlobalThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t === "light" ? "dark" : "light") }}>
 *       {children}
 *     </GlobalThemeCtx.Provider>
 *   );
 * }
 * function useGlobalTheme() {
 *   const ctx = useContext(GlobalThemeCtx);
 *   if (!ctx) throw new Error("useGlobalTheme fuera de Provider");
 *   return ctx;
 * }
 *
 * function ThemedBox() {
 *   const { theme, toggle } = useGlobalTheme();
 *   return (
 *     <div style={{ background: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000", padding: 16 }}>
 *       <p>Tema: {theme}</p>
 *       <button onClick={toggle}>Cambiar</button>
 *     </div>
 *   );
 * }
 *
 * export function ThemeSystem() {
 *   return <GlobalThemeProvider><ThemedBox /></GlobalThemeProvider>;
 * }
 *
 * // Escenario 4: Task manager complejo
 * // Herramienta: useReducer
 * // ¿Por qué? Muchas acciones (agregar, eliminar, editar, filtrar, ordenar) sobre estado complejo
 * function taskReducer(state, action) {
 *   switch (action.type) {
 *     case "ADD":
 *       return { ...state, tasks: [...state.tasks, { id: Date.now(), text: action.text, done: false, priority: action.priority || "medium" }] };
 *     case "DELETE":
 *       return { ...state, tasks: state.tasks.filter(t => t.id !== action.id) };
 *     case "TOGGLE":
 *       return { ...state, tasks: state.tasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t) };
 *     case "EDIT":
 *       return { ...state, tasks: state.tasks.map(t => t.id === action.id ? { ...t, text: action.text } : t) };
 *     case "SET_FILTER":
 *       return { ...state, filter: action.filter };
 *     case "SET_SORT":
 *       return { ...state, sort: action.sort };
 *     default: throw new Error(`Acción desconocida: ${action.type}`);
 *   }
 * }
 *
 * export function TaskManager() {
 *   const [state, dispatch] = useReducer(taskReducer, { tasks: [], filter: "all", sort: "newest" });
 *   const [newTask, setNewTask] = useState("");
 *
 *   let displayed = state.tasks.filter(t => {
 *     if (state.filter === "active") return !t.done;
 *     if (state.filter === "completed") return t.done;
 *     return true;
 *   });
 *   if (state.sort === "oldest") displayed = [...displayed].reverse();
 *
 *   return (
 *     <div>
 *       <form onSubmit={e => { e.preventDefault(); if (newTask.trim()) { dispatch({ type: "ADD", text: newTask }); setNewTask(""); } }}>
 *         <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Nueva tarea..." />
 *         <button type="submit">Agregar</button>
 *       </form>
 *       <div>
 *         Filtrar: {["all", "active", "completed"].map(f => (
 *           <button key={f} onClick={() => dispatch({ type: "SET_FILTER", filter: f })}
 *             style={{ fontWeight: state.filter === f ? "bold" : "normal" }}>{f}</button>
 *         ))}
 *         Ordenar: {["newest", "oldest"].map(s => (
 *           <button key={s} onClick={() => dispatch({ type: "SET_SORT", sort: s })}
 *             style={{ fontWeight: state.sort === s ? "bold" : "normal" }}>{s}</button>
 *         ))}
 *       </div>
 *       <ul>
 *         {displayed.map(t => (
 *           <li key={t.id}>
 *             <input type="checkbox" checked={t.done} onChange={() => dispatch({ type: "TOGGLE", id: t.id })} />
 *             <span style={{ textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
 *             <button onClick={() => dispatch({ type: "DELETE", id: t.id })}>✕</button>
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 *
 *
 * // 12C:
 * // Ventajas de React Query sobre useEffect manual:
 * // 1. Cache automático — no refetch innecesarios
 * // 2. Revalidación al volver a la pestaña (stale-while-revalidate)
 * // 3. Loading/error states automáticos sin useState manual
 * // 4. Deduplicación — si dos componentes piden lo mismo, solo un fetch
 * // 5. Retry automático en errores de red
 *
 * // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 *
 * export function UserListWithQuery() {
 *   // const queryClient = useQueryClient();
 *   // const [search, setSearch] = useState("");
 *   //
 *   // const { data: users, isLoading, error } = useQuery({
 *   //   queryKey: ["users", search],
 *   //   queryFn: () => fetch(`/api/users?search=${search}`).then(r => {
 *   //     if (!r.ok) throw new Error("Error al cargar usuarios");
 *   //     return r.json();
 *   //   }),
 *   // });
 *   //
 *   // const deleteMutation = useMutation({
 *   //   mutationFn: (id) => fetch(`/api/users/${id}`, { method: "DELETE" }),
 *   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
 *   // });
 *   //
 *   // if (isLoading) return <p>Cargando...</p>;
 *   // if (error) return <p>Error: {error.message}</p>;
 *   //
 *   // return (
 *   //   <div>
 *   //     <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." />
 *   //     {users.length === 0 ? <p>No hay usuarios</p> : (
 *   //       <ul>
 *   //         {users.map(u => (
 *   //           <li key={u.id}>
 *   //             {u.name}
 *   //             <button onClick={() => deleteMutation.mutate(u.id)}
 *   //               disabled={deleteMutation.isPending}>
 *   //               {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
 *   //             </button>
 *   //           </li>
 *   //         ))}
 *   //       </ul>
 *   //     )}
 *   //   </div>
 *   // );
 *
 *   return <p>Ver pseudo-código en comentarios arriba</p>;
 * }
 *
 *
 * // 12D:
 * // Feature 1: Catálogo → React Query (datos del servidor con cache)
 * // Feature 2: Carrito → useReducer + Context (estado complejo de cliente, global)
 * // Feature 3: Usuario → Context (muchos componentes lo leen, cambia poco)
 * // Feature 4: Tema → Context (muchos componentes, cambia poco)
 * // Feature 5: Filtros → useState o lifting state up (local al catálogo)
 * // Feature 6: Modal → useState (local al componente)
 * // Feature 7: Notificaciones → useReducer + Context (acciones add/dismiss, global)
 * // Feature 8: Checkout → useReducer (formulario multi-step con validación)
 *
 * // const EcomThemeCtx = createContext(null);
 * // const EcomAuthCtx = createContext(null);
 * // const EcomCartCtx = createContext(null);
 * // const EcomNotifCtx = createContext(null);
 * //
 * // function cartReducer(state, action) { ... } // como ejercicio 11D
 * // function notifReducer(state, action) { ... } // add/dismiss
 * // function checkoutReducer(state, action) { ... } // multi-step + validación
 * //
 * // export function EcommerceApp() {
 * //   return (
 * //     <QueryClientProvider client={queryClient}>
 * //       <EcomThemeProvider>
 * //         <EcomAuthProvider>
 * //           <EcomCartProvider>
 * //             <EcomNotifProvider>
 * //               <Header />           // usa theme, auth, cart (count)
 * //               <NotificationBar />  // usa notifications
 * //               <ProductCatalog />   // usa React Query + filtros locales
 * //               <CartPanel />        // usa cart context
 * //             </EcomNotifProvider>
 * //           </EcomCartProvider>
 * //         </EcomAuthProvider>
 * //       </EcomThemeProvider>
 * //     </QueryClientProvider>
 * //   );
 * // }
 *
 * export function EcommerceApp() {
 *   return <p>Ver arquitectura en comentarios arriba. Implementa las partes que puedas.</p>;
 * }
 */
