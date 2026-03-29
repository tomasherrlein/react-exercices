/**
 * EJERCICIO 15 — Patrones de Composición
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender los patrones.
 */

import { createContext, useContext, useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 15A — Slots con props (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un componente PageLayout que use "slots" para
 * permitir que el consumidor defina múltiples áreas de contenido.
 *
 * Props de PageLayout:
 * - header: JSX para el header
 * - sidebar: JSX para el sidebar (opcional — si no se pasa, no mostrar)
 * - footer: JSX para el footer
 * - children: contenido principal
 *
 * Requisitos:
 * 1. El layout tiene estructura: header arriba, sidebar a la izquierda,
 *    children en el centro, footer abajo
 * 2. Si no se pasa sidebar, el children ocupa todo el ancho
 * 3. Estilos básicos para distinguir cada área (bordes o colores de fondo)
 *
 * Uso esperado:
 *   <PageLayout
 *     header={<h1>Mi App</h1>}
 *     sidebar={<nav><a href="/">Home</a></nav>}
 *     footer={<p>© 2024</p>}
 *   >
 *     <p>Contenido principal</p>
 *   </PageLayout>
 */
export function PageLayout({ header, sidebar, footer, children }) {
  // Tu código aquí
}

export function SlotDemo() {
  // Tu código aquí: usa PageLayout con y sin sidebar
}


// ─────────────────────────────────────────────
// EJERCICIO 15B — Compound Components: Accordion (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un Accordion con compound components.
 * La API debe verse así:
 *
 *   <Accordion>
 *     <AccordionItem id="1" title="¿Qué es React?">
 *       Una librería para construir interfaces.
 *     </AccordionItem>
 *     <AccordionItem id="2" title="¿Qué son hooks?">
 *       Funciones que permiten usar estado en componentes funcionales.
 *     </AccordionItem>
 *   </Accordion>
 *
 * Requisitos:
 * 1. Accordion: componente padre que tiene el estado (activeId)
 *    y provee Context a sus hijos
 * 2. AccordionItem: componente hijo que lee el Context para saber
 *    si está activo, y llama a setActiveId al hacer clic
 * 3. Solo un item abierto a la vez
 * 4. Clic en item abierto lo cierra (activeId = null)
 * 5. Mostrar ▶ cerrado / ▼ abierto
 * 6. Transición visual (opcional): cambiar max-height o simplemente show/hide
 *
 * Pista: AccordionContext compartido entre Accordion y AccordionItem.
 */

// Tu código aquí: AccordionContext, Accordion, AccordionItem

export function AccordionDemo() {
  // Tu código aquí: usa Accordion con 3+ items
}


// ─────────────────────────────────────────────
// EJERCICIO 15C — Render Props: MouseTracker (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un componente MouseTracker que rastrea la posición del mouse
 * y permite al consumidor decidir cómo mostrarla.
 *
 * Requisitos:
 * 1. MouseTracker: rastrea { x, y } del mouse dentro de un div
 *    - Pasa la posición a children como función: children({ x, y })
 *    - El div debe tener un tamaño fijo (400x300) con borde
 * 2. Crea 3 usos diferentes del mismo MouseTracker:
 *    a) Mostrar coordenadas como texto: "X: 150, Y: 200"
 *    b) Un punto rojo que sigue al mouse
 *    c) Cambiar el color de fondo según la posición
 *       (usa x para hue: `hsl(${x % 360}, 70%, 50%)`)
 *
 * Pista: children es una función, no JSX:
 *   <MouseTracker>
 *     {({ x, y }) => <p>X: {x}, Y: {y}</p>}
 *   </MouseTracker>
 */
function MouseTracker({ children }) {
  // Tu código aquí
}

export function RenderPropsDemo() {
  // Tu código aquí: 3 usos diferentes de MouseTracker
}


// ─────────────────────────────────────────────
// EJERCICIO 15D — Compound + Headless: Tabs completos (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un sistema de Tabs con compound components y lógica headless.
 *
 * API esperada:
 *   <Tabs defaultTab="react">
 *     <TabList>
 *       <Tab id="react">React</Tab>
 *       <Tab id="vue">Vue</Tab>
 *       <Tab id="angular" disabled>Angular</Tab>
 *     </TabList>
 *     <TabPanels>
 *       <TabPanel id="react">
 *         <p>React es una librería de Facebook.</p>
 *       </TabPanel>
 *       <TabPanel id="vue">
 *         <p>Vue es un framework progresivo.</p>
 *       </TabPanel>
 *       <TabPanel id="angular">
 *         <p>Angular es un framework de Google.</p>
 *       </TabPanel>
 *     </TabPanels>
 *   </Tabs>
 *
 * Requisitos:
 * 1. Tabs: contexto con activeTab y setActiveTab
 * 2. TabList: contenedor de tabs con role="tablist"
 * 3. Tab: botón con role="tab", aria-selected, disabled
 *    - Estilo activo diferente (fondo, borde inferior, etc.)
 *    - Si disabled, no se puede seleccionar
 * 4. TabPanels: contenedor de paneles
 * 5. TabPanel: solo se renderiza si es el activo, role="tabpanel"
 * 6. Extraer un hook useTabs() que encapsule el contexto
 * 7. Bonus: accesibilidad con aria-controls y aria-labelledby
 */

// Tu código aquí: TabsContext, Tabs, TabList, Tab, TabPanels, TabPanel, useTabs

export function TabsDemo() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 15A:
 * export function PageLayout({ header, sidebar, footer, children }) {
 *   return (
 *     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
 *       <header style={{ padding: 12, background: "#f0f0f0", borderBottom: "1px solid #ddd" }}>
 *         {header}
 *       </header>
 *       <div style={{ display: "flex", flex: 1 }}>
 *         {sidebar && (
 *           <aside style={{ width: 200, padding: 12, background: "#fafafa", borderRight: "1px solid #ddd" }}>
 *             {sidebar}
 *           </aside>
 *         )}
 *         <main style={{ flex: 1, padding: 12 }}>
 *           {children}
 *         </main>
 *       </div>
 *       <footer style={{ padding: 12, background: "#f0f0f0", borderTop: "1px solid #ddd" }}>
 *         {footer}
 *       </footer>
 *     </div>
 *   );
 * }
 *
 * export function SlotDemo() {
 *   return (
 *     <div>
 *       <h2>Con sidebar:</h2>
 *       <PageLayout
 *         header={<h1>Mi App</h1>}
 *         sidebar={<nav><a href="/">Home</a><br/><a href="/about">About</a></nav>}
 *         footer={<p>© 2024</p>}
 *       >
 *         <p>Contenido principal</p>
 *       </PageLayout>
 *
 *       <h2>Sin sidebar:</h2>
 *       <PageLayout header={<h1>Blog</h1>} footer={<p>Footer</p>}>
 *         <p>Todo el ancho para el contenido</p>
 *       </PageLayout>
 *     </div>
 *   );
 * }
 *
 *
 * // 15B:
 * const AccordionContext = createContext(null);
 *
 * function Accordion({ children }) {
 *   const [activeId, setActiveId] = useState(null);
 *   return (
 *     <AccordionContext.Provider value={{ activeId, setActiveId }}>
 *       <div>{children}</div>
 *     </AccordionContext.Provider>
 *   );
 * }
 *
 * function AccordionItem({ id, title, children }) {
 *   const { activeId, setActiveId } = useContext(AccordionContext);
 *   const isOpen = activeId === id;
 *   return (
 *     <div style={{ border: "1px solid #ddd", marginBottom: 4 }}>
 *       <button
 *         onClick={() => setActiveId(isOpen ? null : id)}
 *         style={{ width: "100%", textAlign: "left", padding: 12, cursor: "pointer", background: isOpen ? "#e8f0fe" : "#fff" }}
 *       >
 *         {isOpen ? "▼" : "▶"} {title}
 *       </button>
 *       {isOpen && <div style={{ padding: 12 }}>{children}</div>}
 *     </div>
 *   );
 * }
 *
 * export function AccordionDemo() {
 *   return (
 *     <Accordion>
 *       <AccordionItem id="1" title="¿Qué es React?">
 *         Una librería de JavaScript para construir interfaces de usuario.
 *       </AccordionItem>
 *       <AccordionItem id="2" title="¿Qué son los hooks?">
 *         Funciones que permiten usar estado y otras features de React en componentes funcionales.
 *       </AccordionItem>
 *       <AccordionItem id="3" title="¿Qué es JSX?">
 *         Una extensión de sintaxis que permite escribir HTML dentro de JavaScript.
 *       </AccordionItem>
 *     </Accordion>
 *   );
 * }
 *
 *
 * // 15C:
 * function MouseTracker({ children }) {
 *   const [pos, setPos] = useState({ x: 0, y: 0 });
 *
 *   function handleMouseMove(e) {
 *     const rect = e.currentTarget.getBoundingClientRect();
 *     setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
 *   }
 *
 *   return (
 *     <div
 *       onMouseMove={handleMouseMove}
 *       style={{ width: 400, height: 300, border: "2px solid #333", position: "relative", overflow: "hidden" }}
 *     >
 *       {children(pos)}
 *     </div>
 *   );
 * }
 *
 * export function RenderPropsDemo() {
 *   return (
 *     <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
 *       <div>
 *         <h3>Coordenadas</h3>
 *         <MouseTracker>
 *           {({ x, y }) => <p style={{ padding: 12 }}>X: {x}, Y: {y}</p>}
 *         </MouseTracker>
 *       </div>
 *       <div>
 *         <h3>Punto rojo</h3>
 *         <MouseTracker>
 *           {({ x, y }) => (
 *             <div style={{
 *               position: "absolute", left: x - 10, top: y - 10,
 *               width: 20, height: 20, borderRadius: "50%", background: "red",
 *               pointerEvents: "none",
 *             }} />
 *           )}
 *         </MouseTracker>
 *       </div>
 *       <div>
 *         <h3>Color dinámico</h3>
 *         <MouseTracker>
 *           {({ x, y }) => (
 *             <div style={{
 *               width: "100%", height: "100%",
 *               background: `hsl(${x % 360}, 70%, ${30 + (y / 300) * 40}%)`,
 *             }}>
 *               <p style={{ color: "#fff", padding: 12 }}>Hue: {x % 360}</p>
 *             </div>
 *           )}
 *         </MouseTracker>
 *       </div>
 *     </div>
 *   );
 * }
 *
 *
 * // 15D:
 * const TabsContext = createContext(null);
 *
 * function useTabs() {
 *   const ctx = useContext(TabsContext);
 *   if (!ctx) throw new Error("useTabs debe usarse dentro de <Tabs>");
 *   return ctx;
 * }
 *
 * function Tabs({ defaultTab, children }) {
 *   const [activeTab, setActiveTab] = useState(defaultTab);
 *   return (
 *     <TabsContext.Provider value={{ activeTab, setActiveTab }}>
 *       <div>{children}</div>
 *     </TabsContext.Provider>
 *   );
 * }
 *
 * function TabList({ children }) {
 *   return <div role="tablist" style={{ display: "flex", borderBottom: "2px solid #ddd" }}>{children}</div>;
 * }
 *
 * function Tab({ id, disabled, children }) {
 *   const { activeTab, setActiveTab } = useTabs();
 *   const isActive = activeTab === id;
 *   return (
 *     <button
 *       role="tab"
 *       aria-selected={isActive}
 *       disabled={disabled}
 *       onClick={() => setActiveTab(id)}
 *       style={{
 *         padding: "8px 16px", cursor: disabled ? "not-allowed" : "pointer",
 *         background: "none", border: "none",
 *         borderBottom: isActive ? "2px solid #2563eb" : "2px solid transparent",
 *         color: disabled ? "#999" : isActive ? "#2563eb" : "#333",
 *         fontWeight: isActive ? "bold" : "normal",
 *         opacity: disabled ? 0.5 : 1,
 *       }}
 *     >
 *       {children}
 *     </button>
 *   );
 * }
 *
 * function TabPanels({ children }) {
 *   return <div style={{ padding: 16 }}>{children}</div>;
 * }
 *
 * function TabPanel({ id, children }) {
 *   const { activeTab } = useTabs();
 *   if (activeTab !== id) return null;
 *   return <div role="tabpanel">{children}</div>;
 * }
 *
 * export function TabsDemo() {
 *   return (
 *     <Tabs defaultTab="react">
 *       <TabList>
 *         <Tab id="react">React</Tab>
 *         <Tab id="vue">Vue</Tab>
 *         <Tab id="angular" disabled>Angular</Tab>
 *       </TabList>
 *       <TabPanels>
 *         <TabPanel id="react"><p>React es una librería de Facebook para construir UIs.</p></TabPanel>
 *         <TabPanel id="vue"><p>Vue es un framework progresivo creado por Evan You.</p></TabPanel>
 *         <TabPanel id="angular"><p>Angular es un framework de Google.</p></TabPanel>
 *       </TabPanels>
 *     </Tabs>
 *   );
 * }
 */
