/**
 * EJERCICIO 9 — Error Boundaries
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 *
 * Nota: Para el ejercicio 9A necesitás escribir un componente de clase.
 * Para el 9B en adelante, podés usar react-error-boundary:
 *   npm install react-error-boundary
 */

import { Component, useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 9A — Error Boundary manual (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un Error Boundary desde cero usando un componente de clase.
 *
 * Requisitos:
 * 1. Componente de clase ErrorBoundary con:
 *    - state: { hasError: false, error: null }
 *    - static getDerivedStateFromError(error): retorna { hasError: true, error }
 *    - componentDidCatch(error, info): console.error del error
 *    - render(): si hasError, muestra props.fallback. Si no, muestra props.children
 *
 * 2. Componente BuggyCounter que explota cuando count llega a 3:
 *    - Botón que incrementa un contador
 *    - Cuando count === 3, lanza new Error("¡Boom! Llegué a 3")
 *    - (El error se lanza en el render, no en el onClick)
 *
 * 3. ErrorBoundaryDemo que muestra:
 *    - Dos BuggyCounters, CADA UNO envuelto en su propio ErrorBoundary
 *    - Si uno explota, el otro sigue funcionando
 *    - El fallback muestra: "Este contador falló: {error.message}"
 *
 * Pista: para lanzar error en el render:
 *   if (count === 3) throw new Error("¡Boom!");
 */
// Tu código aquí: ErrorBoundary (clase), BuggyCounter

export function ErrorBoundaryDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 9B — Error Boundary con reset (★★☆)
// ─────────────────────────────────────────────
/**
 * Mejora el Error Boundary para permitir "intentar de nuevo".
 *
 * Requisitos:
 * 1. Agrega un botón "Intentar de nuevo" al fallback
 * 2. Al hacer clic, resetea hasError a false (vuelve a renderizar children)
 * 3. BuggyComponent: componente que falla aleatoriamente
 *    - Tiene un botón "Cargar datos"
 *    - Al hacer clic, genera Math.random()
 *    - Si random < 0.5, setea state a { data: "Datos cargados!" }
 *    - Si random >= 0.5, lanza un error (throw en el render usando un flag)
 *    - Pista: usa un estado shouldError, en el onClick setea shouldError=true
 *      si random >= 0.5, y en el render: if (shouldError) throw new Error(...)
 *
 * 4. ResetDemo que muestra el BuggyComponent con el Error Boundary mejorado
 *    - Al hacer clic en "Intentar de nuevo", el componente vuelve a su estado inicial
 *
 * Bonus: Si conocés react-error-boundary, implementá una versión con esa librería también
 *   import { ErrorBoundary } from "react-error-boundary";
 *   <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
 */
// Tu código aquí

export function ResetDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 9C — Boundaries por sección (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un layout de dashboard con Error Boundaries estratégicos.
 *
 * El dashboard tiene 4 secciones independientes:
 * 1. Navbar (siempre debe funcionar — NO tiene boundary propio)
 * 2. StatsPanel: muestra 3 stats. Puede fallar si data es undefined
 * 3. UserList: lista de usuarios. Puede fallar si users no es un array
 * 4. Chart: gráfico (simulado). Siempre falla (throw Error en render)
 *
 * Requisitos:
 * 1. Un Error Boundary GLOBAL que envuelve todo (fallback: "La app falló completamente")
 * 2. Cada sección (excepto Navbar) tiene su propio Error Boundary
 * 3. El fallback de cada sección muestra:
 *    - Nombre de la sección que falló
 *    - El mensaje de error
 *    - Botón "Reintentar"
 * 4. Cuando Chart falla (siempre), StatsPanel y UserList siguen funcionando
 * 5. Navbar NO tiene boundary → si Navbar falla, cae al boundary global
 *
 * Componentes:
 * - Navbar: <nav> con links (funciona siempre)
 * - StatsPanel: recibe { ventas, usuarios, pedidos } y los muestra
 * - UserList: recibe array de { id, name } y los renderiza
 * - Chart: throw new Error("ChartJS no encontrado") en el render
 */
// Tu código aquí

export function DashboardWithBoundaries() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 9D — Error Boundary + Async error handling (★★★)
// ─────────────────────────────────────────────
/**
 * Los Error Boundaries NO atrapan errores en event handlers ni código async.
 * Este ejercicio practica ambos patrones: boundaries para render + try/catch para async.
 *
 * Crea un componente UserProfileLoader que:
 * 1. Tiene un botón "Cargar perfil"
 * 2. Al hacer clic, simula un fetch (setTimeout + Math.random):
 *    - 50% de chance: resuelve con { name: "Ana", email: "ana@test.com" }
 *    - 50% de chance: rechaza con Error("Error de red")
 * 3. Maneja los errores ASYNC con try/catch + estado de error local:
 *    - Si falla, muestra el error con botón "Reintentar"
 *    - (NO usa Error Boundary para esto — los boundaries no atrapan async)
 * 4. Cuando los datos cargan exitosamente, un componente hijo ProfileCard
 *    los muestra. ProfileCard PUEDE tener un bug en el render
 *    (si email no contiene "@", lanza error)
 * 5. ProfileCard está envuelto en un Error Boundary
 *    (para atrapar errores de RENDER del hijo)
 *
 * El punto: Error Boundary atrapa errores de RENDER.
 *           try/catch atrapa errores ASYNC (fetch, setTimeout).
 *           Necesitás ambos.
 *
 * Componentes:
 * - UserProfileLoader: maneja fetch con try/catch
 * - ProfileCard: muestra datos, puede fallar en render
 * - Error Boundary: envuelve ProfileCard
 */
// Tu código aquí

export function AsyncErrorDemo() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 9A:
 * class ErrorBoundary extends Component {
 *   constructor(props) {
 *     super(props);
 *     this.state = { hasError: false, error: null };
 *   }
 *   static getDerivedStateFromError(error) {
 *     return { hasError: true, error };
 *   }
 *   componentDidCatch(error, info) {
 *     console.error("Error atrapado:", error, info);
 *   }
 *   render() {
 *     if (this.state.hasError) {
 *       return this.props.fallback
 *         ? this.props.fallback(this.state.error)
 *         : <p>Algo salió mal</p>;
 *     }
 *     return this.props.children;
 *   }
 * }
 *
 * function BuggyCounter() {
 *   const [count, setCount] = useState(0);
 *   if (count === 3) throw new Error("¡Boom! Llegué a 3");
 *   return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
 * }
 *
 * export function ErrorBoundaryDemo() {
 *   return (
 *     <div style={{ display: "flex", gap: 16 }}>
 *       <ErrorBoundary fallback={(error) => <p style={{ color: "red" }}>Este contador falló: {error.message}</p>}>
 *         <BuggyCounter />
 *       </ErrorBoundary>
 *       <ErrorBoundary fallback={(error) => <p style={{ color: "red" }}>Este contador falló: {error.message}</p>}>
 *         <BuggyCounter />
 *       </ErrorBoundary>
 *     </div>
 *   );
 * }
 *
 *
 * // 9B:
 * class ResettableErrorBoundary extends Component {
 *   constructor(props) {
 *     super(props);
 *     this.state = { hasError: false, error: null };
 *   }
 *   static getDerivedStateFromError(error) {
 *     return { hasError: true, error };
 *   }
 *   componentDidCatch(error, info) {
 *     console.error("Error:", error, info);
 *   }
 *   reset = () => {
 *     this.setState({ hasError: false, error: null });
 *     this.props.onReset?.();
 *   };
 *   render() {
 *     if (this.state.hasError) {
 *       return (
 *         <div style={{ padding: 12, background: "#fee", border: "1px solid #fcc", borderRadius: 4 }}>
 *           <p>Error: {this.state.error.message}</p>
 *           <button onClick={this.reset}>Intentar de nuevo</button>
 *         </div>
 *       );
 *     }
 *     return this.props.children;
 *   }
 * }
 *
 * function BuggyComponent() {
 *   const [shouldError, setShouldError] = useState(false);
 *   const [data, setData] = useState(null);
 *
 *   if (shouldError) throw new Error("¡Falló la carga de datos!");
 *
 *   function handleLoad() {
 *     if (Math.random() >= 0.5) {
 *       setShouldError(true);
 *     } else {
 *       setData("Datos cargados exitosamente!");
 *     }
 *   }
 *
 *   return (
 *     <div>
 *       <button onClick={handleLoad}>Cargar datos (50% falla)</button>
 *       {data && <p style={{ color: "green" }}>{data}</p>}
 *     </div>
 *   );
 * }
 *
 * export function ResetDemo() {
 *   const [key, setKey] = useState(0);
 *   return (
 *     <ResettableErrorBoundary onReset={() => setKey(k => k + 1)}>
 *       <BuggyComponent key={key} />
 *     </ResettableErrorBoundary>
 *   );
 * }
 *
 *
 * // 9C:
 * function Navbar() {
 *   return <nav style={{ padding: 12, background: "#333", color: "#fff" }}>Dashboard | Reportes | Config</nav>;
 * }
 *
 * function StatsPanel({ data }) {
 *   return (
 *     <div style={{ padding: 12, border: "1px solid #ddd" }}>
 *       <h3>Estadísticas</h3>
 *       <p>Ventas: {data.ventas}</p>
 *       <p>Usuarios: {data.usuarios}</p>
 *       <p>Pedidos: {data.pedidos}</p>
 *     </div>
 *   );
 * }
 *
 * function UserList({ users }) {
 *   return (
 *     <div style={{ padding: 12, border: "1px solid #ddd" }}>
 *       <h3>Usuarios</h3>
 *       <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
 *     </div>
 *   );
 * }
 *
 * function Chart() {
 *   throw new Error("ChartJS no encontrado");
 * }
 *
 * function SectionBoundary({ name, children }) {
 *   const [key, setKey] = useState(0);
 *   return (
 *     <ResettableErrorBoundary
 *       key={key}
 *       onReset={() => setKey(k => k + 1)}
 *       fallback={null} // usa el render interno de ResettableErrorBoundary
 *     >
 *       {children}
 *     </ResettableErrorBoundary>
 *   );
 * }
 *
 * // Simplificación: usar el boundary con fallback inline
 * export function DashboardWithBoundaries() {
 *   return (
 *     <ErrorBoundary fallback={() => <h1>La app falló completamente</h1>}>
 *       <Navbar />
 *       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 12 }}>
 *         <ResettableErrorBoundary>
 *           <StatsPanel data={{ ventas: 150, usuarios: 89, pedidos: 42 }} />
 *         </ResettableErrorBoundary>
 *         <ResettableErrorBoundary>
 *           <UserList users={[{ id: 1, name: "Ana" }, { id: 2, name: "Carlos" }]} />
 *         </ResettableErrorBoundary>
 *         <ResettableErrorBoundary>
 *           <Chart />
 *         </ResettableErrorBoundary>
 *       </div>
 *     </ErrorBoundary>
 *   );
 * }
 *
 *
 * // 9D:
 * function simulateFetch() {
 *   return new Promise((resolve, reject) => {
 *     setTimeout(() => {
 *       if (Math.random() < 0.5) {
 *         resolve({ name: "Ana", email: "ana@test.com" });
 *       } else {
 *         reject(new Error("Error de red"));
 *       }
 *     }, 1000);
 *   });
 * }
 *
 * function ProfileCard({ user }) {
 *   if (!user.email.includes("@")) throw new Error("Email inválido en render");
 *   return (
 *     <div style={{ padding: 12, border: "1px solid #ddd" }}>
 *       <h2>{user.name}</h2>
 *       <p>{user.email}</p>
 *     </div>
 *   );
 * }
 *
 * function UserProfileLoader() {
 *   const [user, setUser] = useState(null);
 *   const [loading, setLoading] = useState(false);
 *   const [asyncError, setAsyncError] = useState(null);
 *
 *   async function handleLoad() {
 *     setLoading(true);
 *     setAsyncError(null);
 *     try {
 *       const data = await simulateFetch();
 *       setUser(data);
 *     } catch (err) {
 *       setAsyncError(err.message);
 *     } finally {
 *       setLoading(false);
 *     }
 *   }
 *
 *   return (
 *     <div>
 *       <button onClick={handleLoad} disabled={loading}>
 *         {loading ? "Cargando..." : "Cargar perfil (50% falla)"}
 *       </button>
 *       {asyncError && (
 *         <div style={{ color: "red", margin: "8px 0" }}>
 *           <p>Error async: {asyncError}</p>
 *           <button onClick={handleLoad}>Reintentar</button>
 *         </div>
 *       )}
 *       {user && (
 *         <ResettableErrorBoundary>
 *           <ProfileCard user={user} />
 *         </ResettableErrorBoundary>
 *       )}
 *     </div>
 *   );
 * }
 *
 * export function AsyncErrorDemo() {
 *   return (
 *     <div>
 *       <h2>Error Boundary + Async errors</h2>
 *       <p>El fetch usa try/catch. El render usa Error Boundary.</p>
 *       <UserProfileLoader />
 *     </div>
 *   );
 * }
 */
