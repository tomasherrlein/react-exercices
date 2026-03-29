/**
 * EJERCICIO 16 — Code Splitting
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 *
 * Nota: Estos ejercicios son parcialmente conceptuales.
 * Algunos requieren crear archivos separados para funcionar con import().
 * Donde no sea posible, escribe el código como si tuvieras los archivos
 * y explica qué pasaría.
 */

import { lazy, Suspense, useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 16A — Lazy loading básico (★☆☆)
// ─────────────────────────────────────────────
/**
 * Simula una app con 3 "páginas" y carga lazy.
 *
 * Requisitos:
 * 1. Crea 3 componentes que representen páginas:
 *    - HomePage: <h1>Inicio</h1><p>Bienvenido a la app</p>
 *    - AboutPage: <h1>Acerca de</h1><p>Somos una empresa...</p>
 *    - ContactPage: <h1>Contacto</h1><p>Escríbenos a...</p>
 *
 * 2. En un proyecto real, cada página estaría en su propio archivo
 *    y usarías: const HomePage = lazy(() => import("./pages/Home"))
 *
 * 3. Crea un componente LazyApp que:
 *    - Tiene estado page: "home" | "about" | "contact"
 *    - Botones de navegación para cambiar de página
 *    - Suspense con fallback "Cargando página..."
 *    - Renderiza la página correspondiente
 *
 * 4. Dado que en este archivo no podemos hacer lazy real
 *    (necesitamos archivos separados), implementa los componentes
 *    normalmente PERO escribe en un comentario cómo se vería
 *    con lazy loading real.
 *
 * Comentario esperado:
 *   // En producción:
 *   // const HomePage = lazy(() => import("./pages/Home"));
 *   // const AboutPage = lazy(() => import("./pages/About"));
 *   // const ContactPage = lazy(() => import("./pages/Contact"));
 */

export function LazyApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 16B — Modal con carga diferida (★★☆)
// ─────────────────────────────────────────────
/**
 * Un patrón común: el modal es pesado, así que no lo cargas
 * hasta que el usuario lo necesita.
 *
 * Requisitos:
 * 1. Botón "Abrir configuración" que muestra un modal
 * 2. El modal (SettingsModal) sería un componente lazy en producción
 * 3. Mientras carga, mostrar un Suspense fallback
 * 4. El modal tiene:
 *    - Título "Configuración"
 *    - 3 toggles (notificaciones, modo oscuro, sonidos)
 *    - Botón cerrar
 *    - Overlay oscuro detrás
 * 5. Implementa los componentes normalmente pero escribe cómo sería lazy
 *
 * Pista: el Suspense va DENTRO del condicional que muestra el modal:
 *   {showModal && (
 *     <Suspense fallback={<ModalSkeleton />}>
 *       <SettingsModal onClose={() => setShowModal(false)} />
 *     </Suspense>
 *   )}
 */

export function ModalLazyDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 16C — Preload on hover (★★★)
// ─────────────────────────────────────────────
/**
 * Técnica avanzada: precargar un chunk cuando el usuario
 * hoverea un botón, antes de que haga clic.
 *
 * Requisitos:
 * 1. Tres botones: "Dashboard", "Analytics", "Settings"
 * 2. Cada botón carga una "página" diferente al hacer clic
 * 3. onMouseEnter de cada botón dispara import() del módulo
 *    (esto precarga el chunk)
 * 4. Implementa con componentes normales pero escribe la versión
 *    con preload como comentario
 *
 * Ejemplo de preload:
 *   const DashboardPage = lazy(() => import("./pages/Dashboard"));
 *   const preloadDashboard = () => import("./pages/Dashboard");
 *
 *   <button
 *     onMouseEnter={preloadDashboard}
 *     onClick={() => setPage("dashboard")}
 *   >
 *     Dashboard
 *   </button>
 *
 * 5. Agrega un indicador visual de "precargado" (cambia el color
 *    del botón después del hover)
 * 6. Muestra un log cuando se precarga: console.log("Precargando Dashboard...")
 */

export function PreloadDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 16D — Análisis: ¿qué separar? (★★★)
// ─────────────────────────────────────────────
/**
 * Este ejercicio es de análisis. Dada la siguiente estructura de app,
 * decide qué componentes deberían usar code splitting y cuáles no.
 *
 * App
 * ├── Navbar (siempre visible, 5KB)
 * ├── Footer (siempre visible, 3KB)
 * ├── HomePage (ruta /, 15KB)
 * ├── ProductPage (ruta /products, 20KB)
 * ├── AdminDashboard (ruta /admin, 80KB, solo admins)
 * ├── MonacoEditor (dentro de Admin, 300KB)
 * ├── ChartLibrary (dentro de Admin, 150KB)
 * ├── LoginModal (modal, 10KB)
 * ├── SettingsDrawer (drawer lateral, 25KB)
 * ├── UserAvatar (usado en 20+ lugares, 2KB)
 * └── NotificationToast (global, 3KB)
 *
 * Para cada componente, responde:
 * 1. ¿Code splitting? Sí / No
 * 2. ¿Por qué?
 * 3. Si sí, ¿lazy normal o con preload?
 *
 * Escribe tus respuestas como comentarios abajo.
 */

// Navbar (5KB, siempre visible):
// Code splitting: ___  Razón: ___

// Footer (3KB, siempre visible):
// Code splitting: ___  Razón: ___

// HomePage (15KB, ruta /):
// Code splitting: ___  Razón: ___

// ProductPage (20KB, ruta /products):
// Code splitting: ___  Razón: ___

// AdminDashboard (80KB, ruta /admin, solo admins):
// Code splitting: ___  Razón: ___

// MonacoEditor (300KB, dentro de Admin):
// Code splitting: ___  Razón: ___

// ChartLibrary (150KB, dentro de Admin):
// Code splitting: ___  Razón: ___

// LoginModal (10KB, modal):
// Code splitting: ___  Razón: ___

// SettingsDrawer (25KB, drawer):
// Code splitting: ___  Razón: ___

// UserAvatar (2KB, 20+ usos):
// Code splitting: ___  Razón: ___

// NotificationToast (3KB, global):
// Code splitting: ___  Razón: ___

export function AnalysisExercise() {
  return <p>Este ejercicio es de análisis — responde en los comentarios arriba.</p>;
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 16A:
 * // En producción:
 * // const HomePage = lazy(() => import("./pages/Home"));
 * // const AboutPage = lazy(() => import("./pages/About"));
 * // const ContactPage = lazy(() => import("./pages/Contact"));
 *
 * function HomePage() { return <div><h1>Inicio</h1><p>Bienvenido a la app</p></div>; }
 * function AboutPage() { return <div><h1>Acerca de</h1><p>Somos una empresa...</p></div>; }
 * function ContactPage() { return <div><h1>Contacto</h1><p>Escríbenos a contact@app.com</p></div>; }
 *
 * export function LazyApp() {
 *   const [page, setPage] = useState("home");
 *   const pages = { home: HomePage, about: AboutPage, contact: ContactPage };
 *   const CurrentPage = pages[page];
 *
 *   return (
 *     <div>
 *       <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
 *         <button onClick={() => setPage("home")} style={{ fontWeight: page === "home" ? "bold" : "normal" }}>Inicio</button>
 *         <button onClick={() => setPage("about")} style={{ fontWeight: page === "about" ? "bold" : "normal" }}>Acerca de</button>
 *         <button onClick={() => setPage("contact")} style={{ fontWeight: page === "contact" ? "bold" : "normal" }}>Contacto</button>
 *       </nav>
 *       <Suspense fallback={<p>Cargando página...</p>}>
 *         <CurrentPage />
 *       </Suspense>
 *     </div>
 *   );
 * }
 *
 *
 * // 16B:
 * function SettingsModal({ onClose }) {
 *   const [notifications, setNotifications] = useState(true);
 *   const [darkMode, setDarkMode] = useState(false);
 *   const [sounds, setSounds] = useState(true);
 *
 *   return (
 *     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
 *       onClick={onClose}>
 *       <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 300 }} onClick={e => e.stopPropagation()}>
 *         <h2>Configuración</h2>
 *         <label style={{ display: "block", margin: "8px 0" }}>
 *           <input type="checkbox" checked={notifications} onChange={() => setNotifications(n => !n)} />
 *           Notificaciones
 *         </label>
 *         <label style={{ display: "block", margin: "8px 0" }}>
 *           <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(d => !d)} />
 *           Modo oscuro
 *         </label>
 *         <label style={{ display: "block", margin: "8px 0" }}>
 *           <input type="checkbox" checked={sounds} onChange={() => setSounds(s => !s)} />
 *           Sonidos
 *         </label>
 *         <button onClick={onClose} style={{ marginTop: 12 }}>Cerrar</button>
 *       </div>
 *     </div>
 *   );
 * }
 *
 * // En producción: const SettingsModal = lazy(() => import("./SettingsModal"));
 *
 * export function ModalLazyDemo() {
 *   const [showModal, setShowModal] = useState(false);
 *   return (
 *     <div>
 *       <button onClick={() => setShowModal(true)}>Abrir configuración</button>
 *       {showModal && (
 *         <Suspense fallback={<p>Cargando configuración...</p>}>
 *           <SettingsModal onClose={() => setShowModal(false)} />
 *         </Suspense>
 *       )}
 *     </div>
 *   );
 * }
 *
 *
 * // 16C:
 * function DashboardPage() { return <div><h2>Dashboard</h2><p>Métricas y KPIs</p></div>; }
 * function AnalyticsPage() { return <div><h2>Analytics</h2><p>Gráficos y datos</p></div>; }
 * function SettingsPage() { return <div><h2>Settings</h2><p>Configuración avanzada</p></div>; }
 *
 * // En producción:
 * // const DashboardPage = lazy(() => import("./pages/Dashboard"));
 * // const preloadDashboard = () => import("./pages/Dashboard");
 * // etc.
 *
 * export function PreloadDemo() {
 *   const [page, setPage] = useState("dashboard");
 *   const [preloaded, setPreloaded] = useState(new Set(["dashboard"]));
 *
 *   const pages = { dashboard: DashboardPage, analytics: AnalyticsPage, settings: SettingsPage };
 *   const CurrentPage = pages[page];
 *
 *   function handleHover(pageName) {
 *     if (!preloaded.has(pageName)) {
 *       console.log(`Precargando ${pageName}...`);
 *       // En producción: import(`./pages/${pageName}`)
 *       setPreloaded(prev => new Set([...prev, pageName]));
 *     }
 *   }
 *
 *   return (
 *     <div>
 *       <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
 *         {["dashboard", "analytics", "settings"].map(p => (
 *           <button
 *             key={p}
 *             onMouseEnter={() => handleHover(p)}
 *             onClick={() => setPage(p)}
 *             style={{
 *               fontWeight: page === p ? "bold" : "normal",
 *               background: preloaded.has(p) ? "#e0ffe0" : "#fff",
 *               border: "1px solid #ddd", padding: "8px 16px", cursor: "pointer",
 *             }}
 *           >
 *             {p} {preloaded.has(p) && page !== p ? "✓" : ""}
 *           </button>
 *         ))}
 *       </nav>
 *       <Suspense fallback={<p>Cargando...</p>}>
 *         <CurrentPage />
 *       </Suspense>
 *     </div>
 *   );
 * }
 *
 *
 * // 16D — Respuestas:
 *
 * // Navbar (5KB, siempre visible):
 * // Code splitting: NO. Siempre visible + pequeño = no vale la pena.
 *
 * // Footer (3KB, siempre visible):
 * // Code splitting: NO. Misma razón que Navbar.
 *
 * // HomePage (15KB, ruta /):
 * // Code splitting: SÍ (lazy normal). Es una ruta, se carga solo cuando navegan a /.
 *
 * // ProductPage (20KB, ruta /products):
 * // Code splitting: SÍ (lazy normal). Es una ruta diferente.
 *
 * // AdminDashboard (80KB, ruta /admin, solo admins):
 * // Code splitting: SÍ (lazy). Solo admins lo usan. 80KB que la mayoría nunca necesita.
 *
 * // MonacoEditor (300KB, dentro de Admin):
 * // Code splitting: SÍ (lazy + preload). Muy pesado. Preload cuando el admin navega al dashboard.
 *
 * // ChartLibrary (150KB, dentro de Admin):
 * // Code splitting: SÍ (lazy). Pesado, solo admins.
 *
 * // LoginModal (10KB, modal):
 * // Code splitting: NO o borderline. 10KB es pequeño y el modal puede necesitarse pronto.
 *
 * // SettingsDrawer (25KB, drawer):
 * // Code splitting: SÍ (lazy + preload on hover). No se ve de inicio, 25KB moderado.
 *
 * // UserAvatar (2KB, 20+ usos):
 * // Code splitting: NO. Muy pequeño + se usa en muchos lugares.
 *
 * // NotificationToast (3KB, global):
 * // Code splitting: NO. Global + pequeño. Puede aparecer en cualquier momento.
 */
