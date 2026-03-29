/**
 * EJERCICIO 3 — useState
 *
 * Seis ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 3A — Contador con límites (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un contador que:
 * 1. Empiece en 0
 * 2. Tenga botones + y -
 * 3. NO pueda bajar de 0 ni subir de 10
 * 4. Tenga un botón "Reset" que vuelva a 0
 * 5. Color del número: rojo si >= 8, verde si <= 2, negro si es intermedio
 *
 * Usa la función updater: setCount(c => ...) en vez de setCount(count + 1)
 */
export function Contador() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 3B — Toggle de visibilidad (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un componente que:
 * 1. Tenga un texto secreto oculto al inicio
 * 2. Un botón "Mostrar" / "Ocultar" que alterne
 * 3. Usa renderizado condicional (&&), NO el atributo hidden
 * 4. Usa función updater: setVisible(v => !v)
 */
export function ToggleTexto() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 3C — Estado con objeto (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea una tarjeta de persona editable:
 * 1. Estado inicial: { nombre: "Laura", edad: 24, ciudad: "Madrid" }
 * 2. Botón "Cumpleaños" que aumente la edad en 1
 * 3. Input para cambiar la ciudad
 * 4. IMPORTANTE: no pierdas las otras propiedades al actualizar una
 *
 * Pista: usa spread { ...persona, edad: nuevaEdad }
 * Pista 2: usa función updater: setPersona(p => ({ ...p, edad: p.edad + 1 }))
 */
export function TarjetaPersona() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 3D — Estado con arrays: Carrito de compras (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un carrito de compras con:
 *
 * Productos disponibles (constante, fuera del componente):
 * [
 *   { id: 1, nombre: "Camiseta", precio: 25 },
 *   { id: 2, nombre: "Pantalón",  precio: 45 },
 *   { id: 3, nombre: "Zapatos",   precio: 80 },
 * ]
 *
 * Funcionalidad:
 * 1. Mostrar los productos con un botón "Agregar" en cada uno
 * 2. Al agregar, si el producto ya está en el carrito → aumentar cantidad en 1
 *    Si no está → agregarlo con cantidad: 1
 * 3. En el carrito, mostrar cada item con nombre, cantidad, subtotal (precio * cantidad)
 * 4. Botón "-" en cada item del carrito: reduce cantidad; si llega a 0, elimina el item
 * 5. Mostrar el TOTAL del carrito (suma de todos los subtotales)
 *    El total es estado derivado — NO uses useState para él
 *
 * Pista: el carrito es un array de { id, nombre, precio, cantidad }
 */
const productosDisponibles = [
  { id: 1, nombre: "Camiseta", precio: 25 },
  { id: 2, nombre: "Pantalón", precio: 45 },
  { id: 3, nombre: "Zapatos", precio: 80 },
];

export function Carrito() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 3E — Múltiples estados: Tabs (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un componente de tabs (pestañas) que:
 *
 * 1. Reciba un array de tabs como constante:
 *    [
 *      { id: "perfil",  label: "Perfil",  content: "Aquí va la info del perfil..." },
 *      { id: "config",  label: "Configuración", content: "Opciones de configuración..." },
 *      { id: "notif",   label: "Notificaciones", content: "Tus notificaciones..." },
 *    ]
 *
 * 2. Muestre los labels como botones en una fila
 * 3. El tab activo tenga fondo azul y texto blanco; los demás fondo gris claro
 * 4. Debajo de los botones, muestre el content del tab activo
 * 5. Tenga un contador de "visitas" por cada tab (cuántas veces hiciste clic en él)
 *    Mostrar al lado del label: "Perfil (3)"
 *
 * El contador de visitas es un OBJETO en estado: { perfil: 0, config: 0, notif: 0 }
 */
const tabsData = [
  { id: "perfil", label: "Perfil", content: "Aquí va la info del perfil..." },
  { id: "config", label: "Configuración", content: "Opciones de configuración..." },
  { id: "notif",  label: "Notificaciones", content: "Tus notificaciones..." },
];

export function Tabs() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 3F — Encuentra los 4 bugs (★★★)
// ─────────────────────────────────────────────
/**
 * Este componente tiene 4 BUGS. Encuéntralos y corrígelos.
 * NO reescribas todo — solo corrige los bugs.
 *
 * Bug 1: Mutación de estado (el array se modifica directamente)
 * Bug 2: Estado derivado innecesario (debería ser cálculo directo)
 * Bug 3: setState sin updater (stale closure potential)
 * Bug 4: Objeto de estado parcialmente perdido
 */
export function ComponenteBuggy() {
  const [items, setItems] = useState(["React", "Vue", "Angular"]);
  const [count, setCount] = useState(items.length); // Bug 2
  const [filtro, setFiltro] = useState({ texto: "", caseSensitive: false });

  function addItem(name) {
    items.push(name); // Bug 1
    setItems(items);
    setCount(items.length);
  }

  function removeFirst() {
    setItems(items.slice(1)); // Bug 3
  }

  function toggleCaseSensitive() {
    setFiltro({ caseSensitive: !filtro.caseSensitive }); // Bug 4
  }

  const filteredItems = filtro.caseSensitive
    ? items.filter(i => i.includes(filtro.texto))
    : items.filter(i => i.toLowerCase().includes(filtro.texto.toLowerCase()));

  return (
    <div>
      <input
        value={filtro.texto}
        onChange={e => setFiltro(f => ({ ...f, texto: e.target.value }))}
        placeholder="Filtrar..."
      />
      <button onClick={toggleCaseSensitive}>
        Case Sensitive: {filtro.caseSensitive ? "ON" : "OFF"}
      </button>
      <button onClick={() => addItem("Svelte")}>Agregar Svelte</button>
      <button onClick={removeFirst}>Eliminar primero</button>
      <p>Total: {count}</p>
      <ul>
        {filteredItems.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 3A:
 * const [count, setCount] = useState(0);
 * const color = count >= 8 ? "red" : count <= 2 ? "green" : "black";
 * return (
 *   <>
 *     <h2 style={{ color }}>Contador: {count}</h2>
 *     <button onClick={() => setCount(c => Math.min(10, c + 1))}>+</button>
 *     <button onClick={() => setCount(c => Math.max(0, c - 1))}>-</button>
 *     <button onClick={() => setCount(0)}>Reset</button>
 *   </>
 * );
 *
 *
 * // 3B:
 * const [visible, setVisible] = useState(false);
 * return (
 *   <div>
 *     <button onClick={() => setVisible(v => !v)}>
 *       {visible ? "Ocultar" : "Mostrar"}
 *     </button>
 *     {visible && <p>Este es el contenido secreto 🎉</p>}
 *   </div>
 * );
 *
 *
 * // 3C:
 * const [persona, setPersona] = useState({ nombre: "Laura", edad: 24, ciudad: "Madrid" });
 * return (
 *   <div>
 *     <p>Nombre: {persona.nombre}</p>
 *     <p>Edad: {persona.edad}</p>
 *     <p>Ciudad: {persona.ciudad}</p>
 *     <button onClick={() => setPersona(p => ({ ...p, edad: p.edad + 1 }))}>Cumpleaños 🎂</button>
 *     <input
 *       value={persona.ciudad}
 *       onChange={e => setPersona(p => ({ ...p, ciudad: e.target.value }))}
 *     />
 *   </div>
 * );
 *
 *
 * // 3D:
 * const [carrito, setCarrito] = useState([]);
 *
 * function agregar(producto) {
 *   setCarrito(prev => {
 *     const existe = prev.find(item => item.id === producto.id);
 *     if (existe) {
 *       return prev.map(item =>
 *         item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
 *       );
 *     }
 *     return [...prev, { ...producto, cantidad: 1 }];
 *   });
 * }
 *
 * function reducir(id) {
 *   setCarrito(prev =>
 *     prev
 *       .map(item => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item)
 *       .filter(item => item.cantidad > 0)
 *   );
 * }
 *
 * const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
 *
 * return (
 *   <div>
 *     <h2>Productos</h2>
 *     {productosDisponibles.map(p => (
 *       <div key={p.id}>
 *         {p.nombre} - ${p.precio}
 *         <button onClick={() => agregar(p)}>Agregar</button>
 *       </div>
 *     ))}
 *     <h2>Carrito</h2>
 *     {carrito.map(item => (
 *       <div key={item.id}>
 *         {item.nombre} x{item.cantidad} = ${item.precio * item.cantidad}
 *         <button onClick={() => reducir(item.id)}>-</button>
 *       </div>
 *     ))}
 *     <p><strong>Total: ${total}</strong></p>
 *   </div>
 * );
 *
 *
 * // 3E:
 * const [activeTab, setActiveTab] = useState("perfil");
 * const [visitas, setVisitas] = useState({ perfil: 0, config: 0, notif: 0 });
 *
 * function handleTabClick(id) {
 *   setActiveTab(id);
 *   setVisitas(v => ({ ...v, [id]: v[id] + 1 }));
 * }
 *
 * const tabActivo = tabsData.find(t => t.id === activeTab);
 *
 * return (
 *   <div>
 *     <div style={{ display: "flex", gap: 4 }}>
 *       {tabsData.map(tab => (
 *         <button key={tab.id} onClick={() => handleTabClick(tab.id)}
 *           style={{
 *             background: tab.id === activeTab ? "blue" : "#eee",
 *             color: tab.id === activeTab ? "white" : "black",
 *             padding: "8px 16px", border: "none", cursor: "pointer",
 *           }}>
 *           {tab.label} ({visitas[tab.id]})
 *         </button>
 *       ))}
 *     </div>
 *     <div style={{ padding: 16, border: "1px solid #ddd" }}>
 *       {tabActivo.content}
 *     </div>
 *   </div>
 * );
 *
 *
 * // 3F — Los 4 bugs corregidos:
 *
 * // Bug 1: mutación directa → crear array nuevo
 * function addItem(name) {
 *   setItems(prev => [...prev, name]);
 * }
 *
 * // Bug 2: eliminar el useState de count — es estado derivado
 * // const count = items.length; (calcular directo, no useState)
 *
 * // Bug 3: usar función updater
 * function removeFirst() {
 *   setItems(prev => prev.slice(1));
 * }
 *
 * // Bug 4: no perder la propiedad texto al actualizar
 * function toggleCaseSensitive() {
 *   setFiltro(f => ({ ...f, caseSensitive: !f.caseSensitive }));
 * }
 */
