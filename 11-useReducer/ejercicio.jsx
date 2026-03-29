/**
 * EJERCICIO 11 — useReducer
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useReducer, useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 11A — Contador avanzado (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un contador con useReducer que soporte múltiples operaciones.
 *
 * Estado inicial: { count: 0, step: 1 }
 *
 * Acciones:
 * - "INCREMENT": suma step al count
 * - "DECREMENT": resta step del count
 * - "RESET": vuelve al estado inicial
 * - "SET_STEP": cambia el step (action.value)
 *
 * Requisitos:
 * 1. Mostrar el count actual
 * 2. Botones: +, -, Reset
 * 3. Un input numérico para cambiar el step
 * 4. El count no puede ser negativo (si llegaría a < 0, se queda en 0)
 * 5. Mostrar el historial de acciones: ["INCREMENT (+1)", "DECREMENT (-1)", ...]
 *    Pista: agrega un array "history" al estado
 *
 * Pista: el reducer maneja TODA la lógica, incluyendo la validación de no-negativo.
 */
function counterReducer(state, action) {
  // Tu código aquí
}

export function AdvancedCounter() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 11B — Todo List con useReducer (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea una todo list usando useReducer para toda la lógica de estado.
 *
 * Estado inicial: { todos: [], filter: "all" }
 *
 * Acciones:
 * - "ADD_TODO": agrega un todo { id, text, done: false } (action.text)
 * - "TOGGLE_TODO": cambia done de un todo (action.id)
 * - "DELETE_TODO": elimina un todo (action.id)
 * - "EDIT_TODO": cambia el texto de un todo (action.id, action.text)
 * - "SET_FILTER": cambia el filtro (action.filter: "all" | "active" | "completed")
 * - "CLEAR_COMPLETED": elimina todos los todos completados
 *
 * Requisitos:
 * 1. Input + botón para agregar todos
 * 2. Cada todo muestra checkbox, texto, botón editar y botón eliminar
 * 3. Al hacer clic en editar, el texto se convierte en un input editable
 *    (usa un estado LOCAL auxiliar para el editingId y el draft)
 * 4. Filtros: "Todos", "Activos", "Completados"
 * 5. Mostrar "X items restantes" (cuenta de no completados) — estado derivado
 * 6. Botón "Limpiar completados" (solo visible si hay completados)
 */
function todoReducer(state, action) {
  // Tu código aquí
}

export function TodoApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 11C — Formulario multi-step con useReducer (★★★)
// ─────────────────────────────────────────────
/**
 * Rehaz el formulario wizard del ejercicio 5C, pero usando useReducer.
 *
 * Estado inicial:
 * {
 *   step: 1,
 *   data: { nombre: "", email: "", plan: "free", newsletter: false },
 *   errors: {},
 *   submitted: false,
 * }
 *
 * Acciones:
 * - "UPDATE_FIELD": actualiza un campo (action.field, action.value)
 * - "NEXT_STEP": avanza al siguiente paso, pero SOLO si la validación pasa
 *   - Paso 1: nombre no vacío, email contiene "@"
 *   - Paso 2: siempre válido
 *   - Si no pasa, setea errors en el estado
 * - "PREV_STEP": retrocede un paso
 * - "SUBMIT": marca submitted = true (solo si está en paso 3)
 * - "RESET": vuelve al estado inicial
 *
 * Requisitos:
 * 1. La validación vive DENTRO del reducer — no en el componente
 * 2. Mostrar errores debajo de cada campo si existen en state.errors
 * 3. Paso 1: nombre + email
 * 4. Paso 2: plan (select) + newsletter (checkbox)
 * 5. Paso 3: resumen + botón confirmar
 * 6. Al confirmar exitosamente, mostrar mensaje de éxito y botón "Nuevo registro"
 *
 * Pista: el reducer valida en "NEXT_STEP" y retorna errors si no pasa,
 *        o limpia errors y avanza step si sí pasa.
 */
function formReducer(state, action) {
  // Tu código aquí
}

export function WizardWithReducer() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 11D — Carrito de compras con useReducer + Context (★★★)
// ─────────────────────────────────────────────
/**
 * Rehaz el carrito del ejercicio 10C, usando useReducer para la lógica
 * y Context para la distribución.
 *
 * Estado inicial: { items: [], coupon: null }
 *
 * Acciones:
 * - "ADD_ITEM": agrega o incrementa quantity (action.product)
 * - "REMOVE_ITEM": elimina un item (action.id)
 * - "UPDATE_QUANTITY": actualiza quantity, elimina si <= 0 (action.id, action.quantity)
 * - "APPLY_COUPON": aplica un cupón de descuento (action.code)
 *   - "SAVE10" → 10% de descuento
 *   - "SAVE20" → 20% de descuento
 *   - Cualquier otro → no válido, no cambia nada
 * - "REMOVE_COUPON": quita el cupón
 * - "CLEAR_CART": vacía el carrito
 *
 * Estado derivado (calculado en el Provider, no en el reducer):
 * - subtotal: suma de (price * quantity)
 * - discount: subtotal * (coupon.percent / 100) — o 0 si no hay cupón
 * - total: subtotal - discount
 * - itemCount: suma de quantities
 *
 * Componentes:
 * 1. CartProvider: useReducer + Context + estado derivado
 * 2. useCart: custom hook
 * 3. ProductGrid: muestra productos en grid con botón agregar
 * 4. CartPanel: items con +/-, eliminar, input de cupón, totales
 * 5. ReducerShopApp: componente raíz
 *
 * Productos:
 *   const PRODUCTS = [
 *     { id: 1, name: "Laptop", price: 999 },
 *     { id: 2, name: "Mouse", price: 29 },
 *     { id: 3, name: "Teclado", price: 79 },
 *     { id: 4, name: "Monitor", price: 349 },
 *     { id: 5, name: "Auriculares", price: 149 },
 *   ];
 */
function cartReducer(state, action) {
  // Tu código aquí
}

export function ReducerShopApp() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 11A:
 * const counterInitial = { count: 0, step: 1, history: [] };
 *
 * function counterReducer(state, action) {
 *   switch (action.type) {
 *     case "INCREMENT": {
 *       const newCount = state.count + state.step;
 *       return { ...state, count: newCount, history: [...state.history, `INCREMENT (+${state.step})`] };
 *     }
 *     case "DECREMENT": {
 *       const newCount = Math.max(0, state.count - state.step);
 *       return { ...state, count: newCount, history: [...state.history, `DECREMENT (-${state.step})`] };
 *     }
 *     case "RESET":
 *       return counterInitial;
 *     case "SET_STEP":
 *       return { ...state, step: Number(action.value) || 1 };
 *     default:
 *       throw new Error(`Acción desconocida: ${action.type}`);
 *   }
 * }
 *
 * export function AdvancedCounter() {
 *   const [state, dispatch] = useReducer(counterReducer, counterInitial);
 *
 *   return (
 *     <div>
 *       <h2>Contador: {state.count}</h2>
 *       <div>
 *         <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
 *         <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
 *         <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
 *       </div>
 *       <div>
 *         <label>Step: </label>
 *         <input type="number" value={state.step}
 *           onChange={e => dispatch({ type: "SET_STEP", value: e.target.value })} />
 *       </div>
 *       <h3>Historial:</h3>
 *       <ul>
 *         {state.history.map((entry, i) => <li key={i}>{entry}</li>)}
 *       </ul>
 *     </div>
 *   );
 * }
 *
 *
 * // 11B:
 * const todoInitial = { todos: [], filter: "all" };
 *
 * function todoReducer(state, action) {
 *   switch (action.type) {
 *     case "ADD_TODO":
 *       return { ...state, todos: [...state.todos, { id: Date.now(), text: action.text, done: false }] };
 *     case "TOGGLE_TODO":
 *       return { ...state, todos: state.todos.map(t => t.id === action.id ? { ...t, done: !t.done } : t) };
 *     case "DELETE_TODO":
 *       return { ...state, todos: state.todos.filter(t => t.id !== action.id) };
 *     case "EDIT_TODO":
 *       return { ...state, todos: state.todos.map(t => t.id === action.id ? { ...t, text: action.text } : t) };
 *     case "SET_FILTER":
 *       return { ...state, filter: action.filter };
 *     case "CLEAR_COMPLETED":
 *       return { ...state, todos: state.todos.filter(t => !t.done) };
 *     default:
 *       throw new Error(`Acción desconocida: ${action.type}`);
 *   }
 * }
 *
 * export function TodoApp() {
 *   const [state, dispatch] = useReducer(todoReducer, todoInitial);
 *   const [newTodo, setNewTodo] = useState("");
 *   const [editingId, setEditingId] = useState(null);
 *   const [draft, setDraft] = useState("");
 *
 *   const filtered = state.todos.filter(t => {
 *     if (state.filter === "active") return !t.done;
 *     if (state.filter === "completed") return t.done;
 *     return true;
 *   });
 *
 *   const remaining = state.todos.filter(t => !t.done).length;
 *   const hasCompleted = state.todos.some(t => t.done);
 *
 *   function handleAdd(e) {
 *     e.preventDefault();
 *     if (!newTodo.trim()) return;
 *     dispatch({ type: "ADD_TODO", text: newTodo });
 *     setNewTodo("");
 *   }
 *
 *   function startEdit(todo) {
 *     setEditingId(todo.id);
 *     setDraft(todo.text);
 *   }
 *
 *   function saveEdit() {
 *     dispatch({ type: "EDIT_TODO", id: editingId, text: draft });
 *     setEditingId(null);
 *   }
 *
 *   return (
 *     <div>
 *       <h2>Todo List</h2>
 *       <form onSubmit={handleAdd}>
 *         <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="Nueva tarea..." />
 *         <button type="submit">Agregar</button>
 *       </form>
 *       <div>
 *         {["all", "active", "completed"].map(f => (
 *           <button key={f} onClick={() => dispatch({ type: "SET_FILTER", filter: f })}
 *             style={{ fontWeight: state.filter === f ? "bold" : "normal" }}>
 *             {f === "all" ? "Todos" : f === "active" ? "Activos" : "Completados"}
 *           </button>
 *         ))}
 *       </div>
 *       <ul style={{ listStyle: "none", padding: 0 }}>
 *         {filtered.map(todo => (
 *           <li key={todo.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: 4 }}>
 *             <input type="checkbox" checked={todo.done} onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })} />
 *             {editingId === todo.id ? (
 *               <>
 *                 <input value={draft} onChange={e => setDraft(e.target.value)} />
 *                 <button onClick={saveEdit}>Guardar</button>
 *                 <button onClick={() => setEditingId(null)}>Cancelar</button>
 *               </>
 *             ) : (
 *               <>
 *                 <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</span>
 *                 <button onClick={() => startEdit(todo)}>Editar</button>
 *                 <button onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}>Eliminar</button>
 *               </>
 *             )}
 *           </li>
 *         ))}
 *       </ul>
 *       <p>{remaining} items restantes</p>
 *       {hasCompleted && <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>Limpiar completados</button>}
 *     </div>
 *   );
 * }
 *
 *
 * // 11C:
 * const formInitial = {
 *   step: 1,
 *   data: { nombre: "", email: "", plan: "free", newsletter: false },
 *   errors: {},
 *   submitted: false,
 * };
 *
 * function formReducer(state, action) {
 *   switch (action.type) {
 *     case "UPDATE_FIELD": {
 *       const value = action.field === "newsletter"
 *         ? !state.data.newsletter
 *         : action.value;
 *       return { ...state, data: { ...state.data, [action.field]: value }, errors: {} };
 *     }
 *     case "NEXT_STEP": {
 *       const errors = {};
 *       if (state.step === 1) {
 *         if (!state.data.nombre.trim()) errors.nombre = "Nombre es requerido";
 *         if (!state.data.email.includes("@")) errors.email = "Email debe contener @";
 *       }
 *       if (Object.keys(errors).length > 0) return { ...state, errors };
 *       return { ...state, step: state.step + 1, errors: {} };
 *     }
 *     case "PREV_STEP":
 *       return { ...state, step: state.step - 1, errors: {} };
 *     case "SUBMIT":
 *       if (state.step !== 3) return state;
 *       return { ...state, submitted: true };
 *     case "RESET":
 *       return formInitial;
 *     default:
 *       throw new Error(`Acción desconocida: ${action.type}`);
 *   }
 * }
 *
 * export function WizardWithReducer() {
 *   const [state, dispatch] = useReducer(formReducer, formInitial);
 *
 *   if (state.submitted) {
 *     return (
 *       <div>
 *         <h2>¡Registro exitoso!</h2>
 *         <pre>{JSON.stringify(state.data, null, 2)}</pre>
 *         <button onClick={() => dispatch({ type: "RESET" })}>Nuevo registro</button>
 *       </div>
 *     );
 *   }
 *
 *   return (
 *     <div>
 *       <p>Paso {state.step} de 3</p>
 *       {state.step === 1 && (
 *         <div>
 *           <input placeholder="Nombre" value={state.data.nombre}
 *             onChange={e => dispatch({ type: "UPDATE_FIELD", field: "nombre", value: e.target.value })} />
 *           {state.errors.nombre && <p style={{ color: "red" }}>{state.errors.nombre}</p>}
 *           <input placeholder="Email" value={state.data.email}
 *             onChange={e => dispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })} />
 *           {state.errors.email && <p style={{ color: "red" }}>{state.errors.email}</p>}
 *         </div>
 *       )}
 *       {state.step === 2 && (
 *         <div>
 *           <select value={state.data.plan}
 *             onChange={e => dispatch({ type: "UPDATE_FIELD", field: "plan", value: e.target.value })}>
 *             <option value="free">Free</option>
 *             <option value="pro">Pro</option>
 *             <option value="enterprise">Enterprise</option>
 *           </select>
 *           <label>
 *             <input type="checkbox" checked={state.data.newsletter}
 *               onChange={() => dispatch({ type: "UPDATE_FIELD", field: "newsletter" })} />
 *             Recibir newsletter
 *           </label>
 *         </div>
 *       )}
 *       {state.step === 3 && (
 *         <div>
 *           <p>Nombre: {state.data.nombre}</p>
 *           <p>Email: {state.data.email}</p>
 *           <p>Plan: {state.data.plan}</p>
 *           <p>Newsletter: {state.data.newsletter ? "Sí" : "No"}</p>
 *         </div>
 *       )}
 *       <div>
 *         {state.step > 1 && <button onClick={() => dispatch({ type: "PREV_STEP" })}>Atrás</button>}
 *         {state.step < 3 ? (
 *           <button onClick={() => dispatch({ type: "NEXT_STEP" })}>Siguiente</button>
 *         ) : (
 *           <button onClick={() => dispatch({ type: "SUBMIT" })}>Confirmar</button>
 *         )}
 *       </div>
 *     </div>
 *   );
 * }
 *
 *
 * // 11D:
 * import { createContext, useContext } from "react";
 *
 * const CartContext = createContext(null);
 *
 * const PRODUCTS = [
 *   { id: 1, name: "Laptop", price: 999 },
 *   { id: 2, name: "Mouse", price: 29 },
 *   { id: 3, name: "Teclado", price: 79 },
 *   { id: 4, name: "Monitor", price: 349 },
 *   { id: 5, name: "Auriculares", price: 149 },
 * ];
 *
 * const COUPONS = { SAVE10: 10, SAVE20: 20 };
 *
 * const cartInitial = { items: [], coupon: null };
 *
 * function cartReducer(state, action) {
 *   switch (action.type) {
 *     case "ADD_ITEM": {
 *       const existing = state.items.find(i => i.id === action.product.id);
 *       if (existing) {
 *         return { ...state, items: state.items.map(i => i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i) };
 *       }
 *       return { ...state, items: [...state.items, { ...action.product, quantity: 1 }] };
 *     }
 *     case "REMOVE_ITEM":
 *       return { ...state, items: state.items.filter(i => i.id !== action.id) };
 *     case "UPDATE_QUANTITY": {
 *       if (action.quantity <= 0) return { ...state, items: state.items.filter(i => i.id !== action.id) };
 *       return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, quantity: action.quantity } : i) };
 *     }
 *     case "APPLY_COUPON": {
 *       const percent = COUPONS[action.code];
 *       if (!percent) return state;
 *       return { ...state, coupon: { code: action.code, percent } };
 *     }
 *     case "REMOVE_COUPON":
 *       return { ...state, coupon: null };
 *     case "CLEAR_CART":
 *       return cartInitial;
 *     default:
 *       throw new Error(`Acción desconocida: ${action.type}`);
 *   }
 * }
 *
 * function CartProvider({ children }) {
 *   const [state, dispatch] = useReducer(cartReducer, cartInitial);
 *
 *   const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
 *   const discount = state.coupon ? subtotal * (state.coupon.percent / 100) : 0;
 *   const total = subtotal - discount;
 *   const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
 *
 *   return (
 *     <CartContext.Provider value={{ ...state, dispatch, subtotal, discount, total, itemCount }}>
 *       {children}
 *     </CartContext.Provider>
 *   );
 * }
 *
 * function useCart() {
 *   const ctx = useContext(CartContext);
 *   if (!ctx) throw new Error("useCart fuera de CartProvider");
 *   return ctx;
 * }
 *
 * function ProductGrid() {
 *   const { dispatch } = useCart();
 *   return (
 *     <div>
 *       <h2>Productos</h2>
 *       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
 *         {PRODUCTS.map(p => (
 *           <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
 *             <h3>{p.name}</h3>
 *             <p>${p.price}</p>
 *             <button onClick={() => dispatch({ type: "ADD_ITEM", product: p })}>Agregar</button>
 *           </div>
 *         ))}
 *       </div>
 *     </div>
 *   );
 * }
 *
 * function CartPanel() {
 *   const { items, coupon, dispatch, subtotal, discount, total, itemCount } = useCart();
 *   const [couponCode, setCouponCode] = useState("");
 *
 *   return (
 *     <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 16 }}>
 *       <h2>Carrito ({itemCount})</h2>
 *       {items.length === 0 ? <p>Carrito vacío</p> : (
 *         <>
 *           {items.map(item => (
 *             <div key={item.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: 4 }}>
 *               <span>{item.name} — ${item.price} x {item.quantity}</span>
 *               <button onClick={() => dispatch({ type: "UPDATE_QUANTITY", id: item.id, quantity: item.quantity - 1 })}>-</button>
 *               <button onClick={() => dispatch({ type: "UPDATE_QUANTITY", id: item.id, quantity: item.quantity + 1 })}>+</button>
 *               <button onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}>✕</button>
 *             </div>
 *           ))}
 *           <hr />
 *           <div>
 *             <input placeholder="Código de cupón" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
 *             <button onClick={() => { dispatch({ type: "APPLY_COUPON", code: couponCode }); setCouponCode(""); }}>Aplicar</button>
 *           </div>
 *           {coupon && (
 *             <p>Cupón {coupon.code} (-{coupon.percent}%)
 *               <button onClick={() => dispatch({ type: "REMOVE_COUPON" })}>Quitar</button>
 *             </p>
 *           )}
 *           <p>Subtotal: ${subtotal}</p>
 *           {discount > 0 && <p>Descuento: -${discount.toFixed(2)}</p>}
 *           <p><strong>Total: ${total.toFixed(2)}</strong></p>
 *           <button onClick={() => dispatch({ type: "CLEAR_CART" })}>Vaciar carrito</button>
 *         </>
 *       )}
 *     </div>
 *   );
 * }
 *
 * export function ReducerShopApp() {
 *   return (
 *     <CartProvider>
 *       <h1>Tienda con useReducer</h1>
 *       <ProductGrid />
 *       <CartPanel />
 *     </CartProvider>
 *   );
 * }
 */
