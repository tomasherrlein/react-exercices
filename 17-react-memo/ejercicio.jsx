/**
 * EJERCICIO 14 — React.memo
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState, memo, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 14A — Detectar re-renders innecesarios (★☆☆)
// ─────────────────────────────────────────────
/**
 * El componente Parent tiene un contador y una lista de usuarios.
 * Cada vez que el contador cambia, UserCard se re-renderiza
 * aunque sus props no cambien.
 *
 * Requisitos:
 * 1. Agrega console.log("UserCard render:", name) dentro de UserCard
 * 2. Verifica que al hacer clic en "+", TODOS los UserCard se re-renderizan
 * 3. Envuelve UserCard en memo() para evitar re-renders innecesarios
 * 4. Verifica que ahora al hacer clic en "+", NINGÚN UserCard se re-renderiza
 *
 * Datos: users = ["Ana", "Carlos", "Diana", "Eduardo"]
 */
function UserCard({ name }) {
  // Tu código aquí
}

export function MemoBasicDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 14B — memo + useCallback (★★☆)
// ─────────────────────────────────────────────
/**
 * Ahora cada UserCard tiene un botón "Saludar" que llama
 * a una función del padre. memo() solo funciona si las props
 * mantienen la misma referencia.
 *
 * Requisitos:
 * 1. UserCardWithAction recibe name y onGreet (función)
 * 2. Envuélvelo en memo()
 * 3. En Parent, crea handleGreet con useCallback
 *    para que la referencia sea estable
 * 4. Agrega console.log para verificar que al incrementar count,
 *    los cards NO se re-renderizan
 * 5. Pero al hacer clic en "Saludar", debe mostrar un alert
 *    con el nombre del usuario
 *
 * Pista: handleGreet puede recibir el name como argumento,
 *        así no necesita dependencias.
 */

// const UserCardWithAction = memo(function UserCardWithAction({ name, onGreet }) { ... });

export function MemoCallbackDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 14C — Mover estado vs memoizar (★★★)
// ─────────────────────────────────────────────
/**
 * Este ejercicio muestra que a veces la mejor "optimización"
 * es reestructurar los componentes, no agregar memo().
 *
 * Situación actual (con el problema):
 * - App tiene un input de búsqueda y una ExpensiveList
 * - Cada tecla en el input re-renderiza ExpensiveList
 *
 * Solución A: envolver ExpensiveList en memo()
 * Solución B: mover el input a su propio componente (mover estado)
 * Solución C: usar children pattern (content lifting)
 *
 * Requisitos:
 * 1. Implementa las 3 soluciones para comparar
 * 2. ExpensiveList: recibe un array de 1000 strings y los renderiza
 *    (simula trabajo pesado con un console.log)
 * 3. Para cada solución, agrega un console.log en ExpensiveList
 *    para verificar si se re-renderiza al escribir en el input
 *
 * Datos: items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`)
 */

const items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

// Solución A: memo()
// Tu código aquí
export function SolutionMemo() {
  // Tu código aquí
}

// Solución B: mover estado al componente que lo usa
// Tu código aquí
export function SolutionMoveState() {
  // Tu código aquí
}

// Solución C: children pattern
// Tu código aquí
export function SolutionChildren() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 14D — Dashboard con optimización completa (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un mini dashboard con 4 paneles. Cada panel es "costoso"
 * y solo debe re-renderizarse cuando SUS datos cambien.
 *
 * Componentes:
 * 1. Dashboard: tiene 4 estados independientes
 *    - count (número, botón +/-)
 *    - user (objeto { name, email }, formulario para editar)
 *    - items (array de strings, input para agregar)
 *    - theme ("light" | "dark", botón toggle)
 *
 * 2. CounterPanel: muestra count con botones +/- (memo)
 * 3. UserPanel: muestra datos del user (memo)
 * 4. ItemsPanel: muestra la lista de items (memo)
 * 5. ThemePanel: muestra y cambia el theme (memo)
 *
 * Requisitos:
 * 1. Cada panel envuelto en memo()
 * 2. Las funciones pasadas como props usan useCallback
 * 3. Los objetos/arrays pasados como props usan useMemo donde sea necesario
 * 4. Cada panel tiene console.log("[PanelName] render") para verificar
 * 5. Al cambiar count, SOLO CounterPanel debe re-renderizarse
 * 6. Al cambiar user, SOLO UserPanel debe re-renderizarse
 * 7. etc.
 *
 * Pista: para user, el onChange del formulario debe actualizar el
 *        estado con updater function para evitar dependencias.
 */

export function OptimizedDashboard() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 14A:
 * const UserCard = memo(function UserCard({ name }) {
 *   console.log("UserCard render:", name);
 *   return <div style={{ border: "1px solid #ddd", padding: 8, margin: 4 }}>{name}</div>;
 * });
 *
 * export function MemoBasicDemo() {
 *   const [count, setCount] = useState(0);
 *   const users = ["Ana", "Carlos", "Diana", "Eduardo"];
 *
 *   return (
 *     <div>
 *       <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
 *       {users.map(name => <UserCard key={name} name={name} />)}
 *     </div>
 *   );
 * }
 *
 *
 * // 14B:
 * const UserCardWithAction = memo(function UserCardWithAction({ name, onGreet }) {
 *   console.log("UserCardWithAction render:", name);
 *   return (
 *     <div style={{ border: "1px solid #ddd", padding: 8, margin: 4 }}>
 *       {name}
 *       <button onClick={() => onGreet(name)}>Saludar</button>
 *     </div>
 *   );
 * });
 *
 * export function MemoCallbackDemo() {
 *   const [count, setCount] = useState(0);
 *   const users = ["Ana", "Carlos", "Diana", "Eduardo"];
 *
 *   const handleGreet = useCallback((name) => {
 *     alert(`¡Hola, ${name}!`);
 *   }, []);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
 *       {users.map(name => (
 *         <UserCardWithAction key={name} name={name} onGreet={handleGreet} />
 *       ))}
 *     </div>
 *   );
 * }
 *
 *
 * // 14C:
 *
 * // ExpensiveList compartida
 * function ExpensiveList({ items }) {
 *   console.log("ExpensiveList render");
 *   return <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
 * }
 * const MemoizedExpensiveList = memo(ExpensiveList);
 *
 * // Solución A: memo()
 * export function SolutionMemo() {
 *   const [query, setQuery] = useState("");
 *   return (
 *     <div>
 *       <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar..." />
 *       <p>Buscando: {query}</p>
 *       <MemoizedExpensiveList items={items} />
 *     </div>
 *   );
 * }
 *
 * // Solución B: mover estado
 * function SearchInput() {
 *   const [query, setQuery] = useState("");
 *   return (
 *     <div>
 *       <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar..." />
 *       <p>Buscando: {query}</p>
 *     </div>
 *   );
 * }
 * export function SolutionMoveState() {
 *   return (
 *     <div>
 *       <SearchInput />
 *       <ExpensiveList items={items} />
 *     </div>
 *   );
 * }
 *
 * // Solución C: children pattern
 * function SearchWrapper({ children }) {
 *   const [query, setQuery] = useState("");
 *   return (
 *     <div>
 *       <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar..." />
 *       <p>Buscando: {query}</p>
 *       {children}
 *     </div>
 *   );
 * }
 * export function SolutionChildren() {
 *   return (
 *     <SearchWrapper>
 *       <ExpensiveList items={items} />
 *     </SearchWrapper>
 *   );
 * }
 *
 *
 * // 14D:
 * const CounterPanel = memo(function CounterPanel({ count, onIncrement, onDecrement }) {
 *   console.log("[CounterPanel] render");
 *   return (
 *     <div style={{ border: "1px solid #ddd", padding: 12 }}>
 *       <h3>Counter: {count}</h3>
 *       <button onClick={onDecrement}>-</button>
 *       <button onClick={onIncrement}>+</button>
 *     </div>
 *   );
 * });
 *
 * const UserPanel = memo(function UserPanel({ user, onChangeName, onChangeEmail }) {
 *   console.log("[UserPanel] render");
 *   return (
 *     <div style={{ border: "1px solid #ddd", padding: 12 }}>
 *       <h3>User</h3>
 *       <input value={user.name} onChange={e => onChangeName(e.target.value)} placeholder="Nombre" />
 *       <input value={user.email} onChange={e => onChangeEmail(e.target.value)} placeholder="Email" />
 *     </div>
 *   );
 * });
 *
 * const ItemsPanel = memo(function ItemsPanel({ items, onAdd }) {
 *   console.log("[ItemsPanel] render");
 *   const [text, setText] = useState("");
 *   return (
 *     <div style={{ border: "1px solid #ddd", padding: 12 }}>
 *       <h3>Items ({items.length})</h3>
 *       <form onSubmit={e => { e.preventDefault(); if (text) { onAdd(text); setText(""); } }}>
 *         <input value={text} onChange={e => setText(e.target.value)} />
 *         <button type="submit">Add</button>
 *       </form>
 *       <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
 *     </div>
 *   );
 * });
 *
 * const ThemePanel = memo(function ThemePanel({ theme, onToggle }) {
 *   console.log("[ThemePanel] render");
 *   return (
 *     <div style={{
 *       border: "1px solid #ddd", padding: 12,
 *       background: theme === "dark" ? "#333" : "#fff",
 *       color: theme === "dark" ? "#fff" : "#000",
 *     }}>
 *       <h3>Theme: {theme}</h3>
 *       <button onClick={onToggle}>Toggle</button>
 *     </div>
 *   );
 * });
 *
 * export function OptimizedDashboard() {
 *   const [count, setCount] = useState(0);
 *   const [user, setUser] = useState({ name: "Ana", email: "ana@test.com" });
 *   const [items, setItems] = useState(["Item 1", "Item 2"]);
 *   const [theme, setTheme] = useState("light");
 *
 *   const increment = useCallback(() => setCount(c => c + 1), []);
 *   const decrement = useCallback(() => setCount(c => c - 1), []);
 *   const changeName = useCallback((name) => setUser(u => ({ ...u, name })), []);
 *   const changeEmail = useCallback((email) => setUser(u => ({ ...u, email })), []);
 *   const addItem = useCallback((text) => setItems(prev => [...prev, text]), []);
 *   const toggleTheme = useCallback(() => setTheme(t => t === "light" ? "dark" : "light"), []);
 *
 *   return (
 *     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
 *       <CounterPanel count={count} onIncrement={increment} onDecrement={decrement} />
 *       <UserPanel user={user} onChangeName={changeName} onChangeEmail={changeEmail} />
 *       <ItemsPanel items={items} onAdd={addItem} />
 *       <ThemePanel theme={theme} onToggle={toggleTheme} />
 *     </div>
 *   );
 * }
 */
