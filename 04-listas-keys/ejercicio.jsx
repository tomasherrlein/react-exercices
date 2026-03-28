/**
 * EJERCICIO 4 — Listas y Keys
 *
 * Una lista de tareas donde puedes agregar y eliminar items.
 * Hay errores intencionales y partes para completar.
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 4A — Encuentra el error de keys
// ─────────────────────────────────────────────
/**
 * Este código funciona pero tiene un error sutil con las keys.
 * 1. Identifica cuál es el error
 * 2. Explica en un comentario por qué es un problema
 * 3. Corrígelo
 *
 * Pista: prueba agregar "D" al principio de la lista y observa qué pasa
 * con los checkboxes si los marcas antes de agregar.
 */
export function ListaConError() {
  const [items, setItems] = useState([{id:1, text:"Aprender React"}, {id:2, text:"Hacer ejercicio"}, {id:3, text:"Leer"}]);
  const [nuevo, setNuevo] = useState("");

  function agregar() {
    if (!nuevo.trim()) return;
    setItems(prev => [{ id: Date.now(), text: nuevo }, ...prev]);
    setNuevo("");
  }

  return (
    <div>
      <input value={nuevo} onChange={e => setNuevo(e.target.value)} />
      <button onClick={agregar}>Agregar al principio</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input type="checkbox" /> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────
// EJERCICIO 4B — Lista de tareas completa
// ─────────────────────────────────────────────
/**
 * Completa el componente TodoList con estas funcionalidades:
 * 1. Mostrar la lista de tareas
 * 2. Agregar una nueva tarea con un input + botón (o Enter)
 * 3. Eliminar una tarea al hacer clic en "✕" junto a ella
 * 4. Marcar tarea como completada (texto tachado)
 * 5. Mostrar cuántas tareas quedan pendientes
 *
 * IMPORTANTE: usa IDs únicos para las keys (Date.now() o un contador)
 */

const tareasIniciales = [
  { id: 1, texto: "Aprender JSX", completada: true },
  { id: 2, texto: "Entender useState", completada: false },
  { id: 3, texto: "Practicar con listas", completada: false },
];

export function TodoList() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [nuevaTarea, setNuevaTarea] = useState("");

  function agregarTarea() {
    if (!nuevaTarea.trim()) return;
    setTareas(prev => [{id: Date.now(), texto: nuevaTarea, completada: false}, ...prev]);
    setNuevaTarea("");
  }

  function eliminarTarea(id) {
    setTareas(ts => ts.filter(t => t.id !== id));
  }

  function toggleTarea(id) {
    setTareas(ts => ts.map(t => t.id === id ? {...t, completada: !t.completada} : t));
  }

  const pendientes = tareas.filter(t => !t.completada).length;

  return (
    <div>
      <h2>Lista de tareas ({pendientes} pendientes)</h2>

      <div>
        <input
          value={nuevaTarea}
          onChange={e => setNuevaTarea(e.target.value)}
          onKeyDown={e => e.key === "Enter" && agregarTarea()}
          placeholder="Nueva tarea..."
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            <input type="checkbox" 
            checked={tarea.completada}
            onChange={() => toggleTarea(tarea.id)} />
            <span style={{textDecoration: tarea.completada ? "line-through" : "none"}}>{tarea.texto}</span>
            <button style={{background:"red", color: "white"}} onClick={() => eliminarTarea(tarea.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


/**
 * SOLUCIONES:
 *
 * // 4A — El error: usar el índice como key cuando la lista puede reordenarse.
 * // Al agregar al principio, todos los índices cambian.
 * // React ve key=0 y piensa que es el mismo elemento, reutiliza el checkbox marcado
 * // en la posición 0 aunque ahora corresponda a otro item.
 * // Corrección: usar un id estable.
 *
 * // 4B
 * function agregarTarea() {
 *   if (!nuevaTarea.trim()) return;
 *   setTareas(ts => [...ts, { id: Date.now(), texto: nuevaTarea, completada: false }]);
 *   setNuevaTarea("");
 * }
 *
 * function eliminarTarea(id) {
 *   setTareas(ts => ts.filter(t => t.id !== id));
 * }
 *
 * function toggleTarea(id) {
 *   setTareas(ts => ts.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
 * }
 *
 * const pendientes = tareas.filter(t => !t.completada).length;
 *
 * // Renderizado de cada tarea:
 * <li key={tarea.id}>
 *   <input
 *     type="checkbox"
 *     checked={tarea.completada}
 *     onChange={() => toggleTarea(tarea.id)}
 *   />
 *   <span style={{ textDecoration: tarea.completada ? "line-through" : "none" }}>
 *     {tarea.texto}
 *   </span>
 *   <button onClick={() => eliminarTarea(tarea.id)}>✕</button>
 * </li>
 */
