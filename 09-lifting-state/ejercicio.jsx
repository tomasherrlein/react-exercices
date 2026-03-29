/**
 * EJERCICIO 9 — Lifting State Up
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 9A — Conversor de temperatura (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un conversor Celsius ↔ Fahrenheit con dos inputs sincronizados.
 *
 * Requisitos:
 * 1. Dos inputs: uno para Celsius y otro para Fahrenheit
 * 2. Al escribir en Celsius, Fahrenheit se actualiza automáticamente (y viceversa)
 * 3. El estado vive en el componente padre (TemperatureConverter)
 * 4. Cada input es un componente hijo (TemperatureInput) que recibe:
 *    - scale: "celsius" | "fahrenheit"
 *    - value: el valor actual
 *    - onChange: callback para notificar al padre
 *
 * Fórmulas:
 *   F = C * 9/5 + 32
 *   C = (F - 32) * 5/9
 *
 * Pista: El padre guarda el valor y la escala de "quién escribió último",
 *        y calcula el otro valor como estado derivado.
 */
function TemperatureInput({ scale, value, onChange }) {
  // Tu código aquí
}

export function TemperatureConverter() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 9B — Filtro + Lista sincronizados (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea una app con un input de búsqueda y una lista filtrada.
 *
 * Componentes:
 * - SearchBar: input de búsqueda (recibe query y onQueryChange)
 * - ProductList: muestra los productos filtrados (recibe products)
 * - FilterableProductList: padre que tiene el estado
 *
 * Datos iniciales:
 *   const PRODUCTS = [
 *     { id: 1, name: "MacBook Pro", category: "Laptops", price: 1999 },
 *     { id: 2, name: "iPhone 15", category: "Phones", price: 999 },
 *     { id: 3, name: "iPad Air", category: "Tablets", price: 599 },
 *     { id: 4, name: "MacBook Air", category: "Laptops", price: 1299 },
 *     { id: 5, name: "iPhone SE", category: "Phones", price: 429 },
 *     { id: 6, name: "AirPods Pro", category: "Audio", price: 249 },
 *   ];
 *
 * Requisitos:
 * 1. SearchBar controla el input de búsqueda
 * 2. ProductList muestra solo los productos que coinciden con la búsqueda (por nombre, case-insensitive)
 * 3. El filtrado es estado derivado (NO uses useState para la lista filtrada)
 * 4. Mostrar "X resultados encontrados" debajo del input
 * 5. Si no hay resultados, mostrar "No se encontraron productos"
 */
const PRODUCTS = [
  { id: 1, name: "MacBook Pro", category: "Laptops", price: 1999 },
  { id: 2, name: "iPhone 15", category: "Phones", price: 999 },
  { id: 3, name: "iPad Air", category: "Tablets", price: 599 },
  { id: 4, name: "MacBook Air", category: "Laptops", price: 1299 },
  { id: 5, name: "iPhone SE", category: "Phones", price: 429 },
  { id: 6, name: "AirPods Pro", category: "Audio", price: 249 },
];

function SearchBar({ query, onQueryChange }) {
  // Tu código aquí
}

function ProductList({ products }) {
  // Tu código aquí
}

export function FilterableProductList() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 9C — Accordion exclusivo (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un accordion donde solo un panel puede estar abierto a la vez.
 *
 * Componentes:
 * - AccordionPanel: un panel individual (recibe title, children, isOpen, onToggle)
 * - Accordion: padre que controla cuál panel está abierto
 *
 * Requisitos:
 * 1. Solo un panel abierto a la vez (al abrir uno, el anterior se cierra)
 * 2. Hacer clic en un panel abierto lo cierra (puede no haber ninguno abierto)
 * 3. El padre guarda el ID del panel abierto (o null si ninguno)
 * 4. Cada AccordionPanel NO tiene su propio estado — recibe isOpen del padre
 * 5. Mostrar ▶ si está cerrado, ▼ si está abierto
 *
 * Datos:
 *   const sections = [
 *     { id: "1", title: "¿Qué es React?", content: "Una librería de JavaScript para construir interfaces de usuario." },
 *     { id: "2", title: "¿Qué son los hooks?", content: "Funciones que permiten usar estado y otras features de React en componentes funcionales." },
 *     { id: "3", title: "¿Qué es JSX?", content: "Una extensión de sintaxis que permite escribir HTML dentro de JavaScript." },
 *   ];
 *
 * Pista: El padre guarda activeId en estado. Al hacer clic en un panel,
 *        si es el mismo que el activo, setActiveId(null), si no, setActiveId(id).
 */
function AccordionPanel({ title, children, isOpen, onToggle }) {
  // Tu código aquí
}

export function Accordion() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 9D — Chat con salas (★★★)
// ─────────────────────────────────────────────
/**
 * Crea una app de chat con múltiples salas.
 *
 * Componentes:
 * - RoomList: lista de salas disponibles (recibe rooms, activeRoomId, onSelectRoom)
 * - MessageList: muestra los mensajes de la sala activa (recibe messages)
 * - MessageInput: input para escribir un mensaje (recibe onSend)
 * - ChatApp: padre que tiene todo el estado
 *
 * Requisitos:
 * 1. Estado en ChatApp:
 *    - rooms: array de { id, name }
 *    - messages: objeto { [roomId]: [{ id, text, timestamp }] }
 *    - activeRoomId: string
 * 2. RoomList resalta la sala activa con un estilo diferente
 * 3. MessageList muestra solo los mensajes de la sala activa
 * 4. MessageInput tiene su propio estado LOCAL para el texto del input
 *    (no necesita subirse — solo ChatApp necesita el mensaje al enviar)
 * 5. Al enviar un mensaje, se agrega al array de la sala activa
 * 6. Al cambiar de sala, los mensajes de cada sala se conservan
 * 7. Mostrar la cantidad de mensajes en cada sala en RoomList: "General (3)"
 *
 * Datos iniciales:
 *   rooms: [{ id: "general", name: "General" }, { id: "random", name: "Random" }, { id: "dev", name: "Desarrollo" }]
 *   messages: { general: [], random: [], dev: [] }
 *   activeRoomId: "general"
 *
 * Pista: MessageInput usa estado local para el texto,
 *        y al submit llama onSend(text) para que el padre lo agregue.
 */
function RoomList({ rooms, messages, activeRoomId, onSelectRoom }) {
  // Tu código aquí
}

function MessageList({ messages }) {
  // Tu código aquí
}

function MessageInput({ onSend }) {
  // Tu código aquí
}

export function ChatApp() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 9A:
 * function TemperatureInput({ scale, value, onChange }) {
 *   const label = scale === "celsius" ? "Celsius" : "Fahrenheit";
 *   return (
 *     <div>
 *       <label>{label}: </label>
 *       <input value={value} onChange={e => onChange(e.target.value)} />
 *     </div>
 *   );
 * }
 *
 * export function TemperatureConverter() {
 *   const [temperature, setTemperature] = useState("");
 *   const [scale, setScale] = useState("celsius");
 *
 *   function toCelsius(f) { return ((f - 32) * 5 / 9).toFixed(2); }
 *   function toFahrenheit(c) { return (c * 9 / 5 + 32).toFixed(2); }
 *
 *   const celsius = scale === "fahrenheit" ? toCelsius(temperature) : temperature;
 *   const fahrenheit = scale === "celsius" ? toFahrenheit(temperature) : temperature;
 *
 *   function handleCelsiusChange(value) {
 *     setScale("celsius");
 *     setTemperature(value);
 *   }
 *
 *   function handleFahrenheitChange(value) {
 *     setScale("fahrenheit");
 *     setTemperature(value);
 *   }
 *
 *   return (
 *     <div>
 *       <h2>Conversor de Temperatura</h2>
 *       <TemperatureInput scale="celsius" value={celsius} onChange={handleCelsiusChange} />
 *       <TemperatureInput scale="fahrenheit" value={fahrenheit} onChange={handleFahrenheitChange} />
 *       {temperature && <p>{celsius}°C = {fahrenheit}°F</p>}
 *     </div>
 *   );
 * }
 *
 *
 * // 9B:
 * function SearchBar({ query, onQueryChange }) {
 *   return (
 *     <input
 *       placeholder="Buscar productos..."
 *       value={query}
 *       onChange={e => onQueryChange(e.target.value)}
 *     />
 *   );
 * }
 *
 * function ProductList({ products }) {
 *   if (products.length === 0) return <p>No se encontraron productos</p>;
 *   return (
 *     <ul>
 *       {products.map(p => (
 *         <li key={p.id}>{p.name} — {p.category} — ${p.price}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 *
 * export function FilterableProductList() {
 *   const [query, setQuery] = useState("");
 *
 *   const filtered = PRODUCTS.filter(p =>
 *     p.name.toLowerCase().includes(query.toLowerCase())
 *   );
 *
 *   return (
 *     <div>
 *       <h2>Productos</h2>
 *       <SearchBar query={query} onQueryChange={setQuery} />
 *       <p>{filtered.length} resultados encontrados</p>
 *       <ProductList products={filtered} />
 *     </div>
 *   );
 * }
 *
 *
 * // 9C:
 * function AccordionPanel({ title, children, isOpen, onToggle }) {
 *   return (
 *     <div style={{ border: "1px solid #ddd", marginBottom: 4 }}>
 *       <button onClick={onToggle} style={{ width: "100%", textAlign: "left", padding: 12, cursor: "pointer" }}>
 *         {isOpen ? "▼" : "▶"} {title}
 *       </button>
 *       {isOpen && <div style={{ padding: 12 }}>{children}</div>}
 *     </div>
 *   );
 * }
 *
 * export function Accordion() {
 *   const [activeId, setActiveId] = useState(null);
 *
 *   const sections = [
 *     { id: "1", title: "¿Qué es React?", content: "Una librería de JavaScript para construir interfaces de usuario." },
 *     { id: "2", title: "¿Qué son los hooks?", content: "Funciones que permiten usar estado y otras features de React en componentes funcionales." },
 *     { id: "3", title: "¿Qué es JSX?", content: "Una extensión de sintaxis que permite escribir HTML dentro de JavaScript." },
 *   ];
 *
 *   return (
 *     <div>
 *       <h2>FAQ</h2>
 *       {sections.map(section => (
 *         <AccordionPanel
 *           key={section.id}
 *           title={section.title}
 *           isOpen={activeId === section.id}
 *           onToggle={() => setActiveId(activeId === section.id ? null : section.id)}
 *         >
 *           {section.content}
 *         </AccordionPanel>
 *       ))}
 *     </div>
 *   );
 * }
 *
 *
 * // 9D:
 * function RoomList({ rooms, messages, activeRoomId, onSelectRoom }) {
 *   return (
 *     <ul style={{ listStyle: "none", padding: 0 }}>
 *       {rooms.map(room => (
 *         <li key={room.id}>
 *           <button
 *             onClick={() => onSelectRoom(room.id)}
 *             style={{
 *               fontWeight: activeRoomId === room.id ? "bold" : "normal",
 *               background: activeRoomId === room.id ? "#e0e7ff" : "transparent",
 *               border: "1px solid #ddd",
 *               padding: "8px 16px",
 *               width: "100%",
 *               cursor: "pointer",
 *               marginBottom: 4,
 *             }}
 *           >
 *             {room.name} ({messages[room.id]?.length || 0})
 *           </button>
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 *
 * function MessageList({ messages }) {
 *   if (messages.length === 0) return <p style={{ color: "#999" }}>No hay mensajes aún</p>;
 *   return (
 *     <ul style={{ listStyle: "none", padding: 0 }}>
 *       {messages.map(msg => (
 *         <li key={msg.id} style={{ padding: "4px 0", borderBottom: "1px solid #eee" }}>
 *           <span style={{ color: "#999", fontSize: 12 }}>{msg.timestamp}</span>
 *           <p style={{ margin: "2px 0" }}>{msg.text}</p>
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 *
 * function MessageInput({ onSend }) {
 *   const [text, setText] = useState("");
 *
 *   function handleSubmit(e) {
 *     e.preventDefault();
 *     if (!text.trim()) return;
 *     onSend(text);
 *     setText("");
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
 *       <input value={text} onChange={e => setText(e.target.value)} placeholder="Escribe un mensaje..." style={{ flex: 1 }} />
 *       <button type="submit">Enviar</button>
 *     </form>
 *   );
 * }
 *
 * export function ChatApp() {
 *   const [rooms] = useState([
 *     { id: "general", name: "General" },
 *     { id: "random", name: "Random" },
 *     { id: "dev", name: "Desarrollo" },
 *   ]);
 *   const [messages, setMessages] = useState({ general: [], random: [], dev: [] });
 *   const [activeRoomId, setActiveRoomId] = useState("general");
 *
 *   function handleSend(text) {
 *     const newMsg = { id: Date.now(), text, timestamp: new Date().toLocaleTimeString() };
 *     setMessages(prev => ({
 *       ...prev,
 *       [activeRoomId]: [...prev[activeRoomId], newMsg],
 *     }));
 *   }
 *
 *   return (
 *     <div style={{ display: "flex", gap: 16 }}>
 *       <div style={{ width: 200 }}>
 *         <h3>Salas</h3>
 *         <RoomList rooms={rooms} messages={messages} activeRoomId={activeRoomId} onSelectRoom={setActiveRoomId} />
 *       </div>
 *       <div style={{ flex: 1 }}>
 *         <h3>{rooms.find(r => r.id === activeRoomId)?.name}</h3>
 *         <MessageList messages={messages[activeRoomId]} />
 *         <MessageInput onSend={handleSend} />
 *       </div>
 *     </div>
 *   );
 * }
 */
