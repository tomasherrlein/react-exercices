/**
 * EJERCICIO 4 — Listas y Keys
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 4A — Encuentra el error de keys (★☆☆)
// ─────────────────────────────────────────────
/**
 * Este componente usa el ÍNDICE como key. Tiene un bug sutil.
 *
 * Pasos para reproducir el bug:
 * 1. Marca el checkbox de "Aprender React"
 * 2. Haz clic en "Agregar al principio" con un texto nuevo
 * 3. Observa: el checkbox marcado se queda en la posición 0 (el item nuevo)
 *    en vez de seguir en "Aprender React"
 *
 * Tu tarea:
 * 1. Explica en un comentario POR QUÉ pasa esto
 * 2. Corrígelo cambiando la key
 */
export function ListaConError() {
  const [items, setItems] = useState([
    { id: 1, text: "Aprender React" },
    { id: 2, text: "Hacer ejercicio" },
    { id: 3, text: "Leer" },
  ]);
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
        {items.map((item, index) => (
          <li key={index}>  {/* ← Este es el problema */}
            <input type="checkbox" /> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 4B — Lista de tareas completa (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un TodoList con:
 * 1. Input + botón (y Enter) para agregar tareas
 * 2. Cada tarea tiene: checkbox (completar), texto, botón eliminar "✕"
 * 3. El texto de tarea completada se muestra tachado
 * 4. Mostrar "{n} tareas pendientes" arriba de la lista
 * 5. IDs con Date.now() para las keys
 *
 * Estado: array de { id, texto, completada }
 * Estado derivado: pendientes (NO uses useState para esto)
 */
const tareasIniciales = [
  { id: 1, texto: "Aprender JSX", completada: true },
  { id: 2, texto: "Entender useState", completada: false },
  { id: 3, texto: "Practicar con listas", completada: false },
];

export function TodoList() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 4C — Lista filtrable y sortable (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un componente que muestre una lista de contactos con:
 *
 * 1. Input de búsqueda que filtre por nombre (case-insensitive)
 * 2. Botón para alternar orden: "A→Z" / "Z→A"
 * 3. Filtro por departamento: botones "Todos", "Dev", "Diseño", "Marketing"
 * 4. Mostrar "X de Y contactos" con los resultados filtrados
 * 5. Si no hay resultados, mostrar "No se encontraron contactos"
 *
 * IMPORTANTE:
 * - filteredContacts y sortedContacts son estado DERIVADO → calcula directo, sin useState
 * - El estado real es solo: searchTerm, sortOrder, departmentFilter
 */
const contactos = [
  { id: 1, nombre: "Ana Ruiz",     email: "ana@mail.com",    department: "Dev" },
  { id: 2, nombre: "Carlos Vega",  email: "carlos@mail.com", department: "Diseño" },
  { id: 3, nombre: "Diana López",  email: "diana@mail.com",  department: "Dev" },
  { id: 4, nombre: "Eduardo Paz",  email: "edu@mail.com",    department: "Marketing" },
  { id: 5, nombre: "Fátima Soto",  email: "fatima@mail.com", department: "Diseño" },
  { id: 6, nombre: "Gabriel Mora", email: "gabi@mail.com",   department: "Dev" },
  { id: 7, nombre: "Helena Cruz",  email: "helena@mail.com", department: "Marketing" },
];

const departamentos = ["Todos", "Dev", "Diseño", "Marketing"];

export function ListaContactos() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 4D — Edición in-place (★★★)
// ─────────────────────────────────────────────
/**
 * Crea una lista de notas donde puedes editar cada una sin salir de la lista.
 *
 * Cada nota: { id, titulo, contenido }
 *
 * Funcionalidad:
 * 1. Mostrar todas las notas con título y contenido
 * 2. Cada nota tiene un botón "Editar"
 * 3. Al hacer clic en "Editar", el título y contenido se convierten en inputs
 *    (editables in-place). El botón cambia a "Guardar"
 * 4. Al hacer clic en "Guardar", los cambios se aplican y vuelve a modo lectura
 * 5. Botón "Cancelar" que descarta los cambios y vuelve a modo lectura
 * 6. Botón "Eliminar" que borra la nota
 * 7. Solo se puede editar UNA nota a la vez
 *
 * Estados sugeridos:
 * - notas: array de { id, titulo, contenido }
 * - editandoId: el ID de la nota en edición, o null
 * - borrador: { titulo, contenido } — los valores temporales mientras editas
 *
 * Pista: "borrador" existe para poder cancelar. Si editas directamente la nota
 * en el array, no puedes deshacer al cancelar.
 */
const notasIniciales = [
  { id: 1, titulo: "Compras", contenido: "Leche, pan, huevos" },
  { id: 2, titulo: "Ideas", contenido: "App de recetas con React" },
  { id: 3, titulo: "Pendiente", contenido: "Terminar ejercicios" },
];

export function ListaNotas() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 4A — Corrección:
 * // El índice como key falla porque al agregar al principio, React ve que
 * // key=0 ahora es "Nuevo item" pero antes era "Aprender React".
 * // Como la key es la misma (0), React reutiliza el DOM (incluido el checkbox).
 * // Corrección: usar item.id como key.
 * <li key={item.id}>
 *
 *
 * // 4B:
 * const [tareas, setTareas] = useState(tareasIniciales);
 * const [nuevaTarea, setNuevaTarea] = useState("");
 * const pendientes = tareas.filter(t => !t.completada).length;
 *
 * function agregar() {
 *   if (!nuevaTarea.trim()) return;
 *   setTareas(prev => [...prev, { id: Date.now(), texto: nuevaTarea, completada: false }]);
 *   setNuevaTarea("");
 * }
 * function eliminar(id) { setTareas(ts => ts.filter(t => t.id !== id)); }
 * function toggle(id) {
 *   setTareas(ts => ts.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
 * }
 *
 * return (
 *   <div>
 *     <h2>{pendientes} tareas pendientes</h2>
 *     <div>
 *       <input value={nuevaTarea} onChange={e => setNuevaTarea(e.target.value)}
 *         onKeyDown={e => e.key === "Enter" && agregar()} placeholder="Nueva tarea..." />
 *       <button onClick={agregar}>Agregar</button>
 *     </div>
 *     <ul>
 *       {tareas.map(t => (
 *         <li key={t.id}>
 *           <input type="checkbox" checked={t.completada} onChange={() => toggle(t.id)} />
 *           <span style={{ textDecoration: t.completada ? "line-through" : "none" }}>{t.texto}</span>
 *           <button onClick={() => eliminar(t.id)}>✕</button>
 *         </li>
 *       ))}
 *     </ul>
 *   </div>
 * );
 *
 *
 * // 4C:
 * const [search, setSearch] = useState("");
 * const [sortOrder, setSortOrder] = useState("asc");
 * const [deptFilter, setDeptFilter] = useState("Todos");
 *
 * const filtered = contactos
 *   .filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()))
 *   .filter(c => deptFilter === "Todos" || c.department === deptFilter);
 *
 * const sorted = [...filtered].sort((a, b) =>
 *   sortOrder === "asc"
 *     ? a.nombre.localeCompare(b.nombre)
 *     : b.nombre.localeCompare(a.nombre)
 * );
 *
 * return (
 *   <div>
 *     <input value={search} onChange={e => setSearch(e.target.value)}
 *       placeholder="Buscar por nombre..." />
 *     <button onClick={() => setSortOrder(s => s === "asc" ? "desc" : "asc")}>
 *       {sortOrder === "asc" ? "A→Z" : "Z→A"}
 *     </button>
 *     <div>
 *       {departamentos.map(d => (
 *         <button key={d} onClick={() => setDeptFilter(d)}
 *           style={{ fontWeight: d === deptFilter ? "bold" : "normal" }}>
 *           {d}
 *         </button>
 *       ))}
 *     </div>
 *     <p>{sorted.length} de {contactos.length} contactos</p>
 *     {sorted.length === 0
 *       ? <p>No se encontraron contactos</p>
 *       : <ul>{sorted.map(c => (
 *           <li key={c.id}>{c.nombre} — {c.email} ({c.department})</li>
 *         ))}</ul>
 *     }
 *   </div>
 * );
 *
 *
 * // 4D:
 * const [notas, setNotas] = useState(notasIniciales);
 * const [editandoId, setEditandoId] = useState(null);
 * const [borrador, setBorrador] = useState({ titulo: "", contenido: "" });
 *
 * function empezarEdicion(nota) {
 *   setEditandoId(nota.id);
 *   setBorrador({ titulo: nota.titulo, contenido: nota.contenido });
 * }
 *
 * function guardar() {
 *   setNotas(prev => prev.map(n =>
 *     n.id === editandoId ? { ...n, ...borrador } : n
 *   ));
 *   setEditandoId(null);
 * }
 *
 * function cancelar() { setEditandoId(null); }
 * function eliminar(id) { setNotas(prev => prev.filter(n => n.id !== id)); setEditandoId(null); }
 *
 * return (
 *   <div>
 *     {notas.map(nota => (
 *       <div key={nota.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
 *         {editandoId === nota.id ? (
 *           <div>
 *             <input value={borrador.titulo}
 *               onChange={e => setBorrador(b => ({ ...b, titulo: e.target.value }))} />
 *             <textarea value={borrador.contenido}
 *               onChange={e => setBorrador(b => ({ ...b, contenido: e.target.value }))} />
 *             <button onClick={guardar}>Guardar</button>
 *             <button onClick={cancelar}>Cancelar</button>
 *           </div>
 *         ) : (
 *           <div>
 *             <h3>{nota.titulo}</h3>
 *             <p>{nota.contenido}</p>
 *             <button onClick={() => empezarEdicion(nota)}>Editar</button>
 *             <button onClick={() => eliminar(nota.id)}>Eliminar</button>
 *           </div>
 *         )}
 *       </div>
 *     ))}
 *   </div>
 * );
 */
