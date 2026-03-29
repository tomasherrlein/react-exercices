/**
 * EJERCICIO 16 — useTransition y useDeferredValue
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState, useTransition, useDeferredValue, useMemo, memo } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 16A — useDeferredValue básico (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un input de búsqueda con una lista pesada que se
 * actualiza sin bloquear el input.
 *
 * Requisitos:
 * 1. Genera una lista de 20.000 items con generateItems()
 * 2. Input de búsqueda que filtra la lista por nombre
 * 3. Usa useDeferredValue para que el input responda inmediatamente
 *    y la lista se actualice cuando React tenga tiempo
 * 4. Muestra indicador visual cuando hay datos "stale":
 *    - opacity: 0.5 cuando query !== deferredQuery
 * 5. Mostrar los primeros 100 resultados y total
 *
 * Compara: primero implementá SIN useDeferredValue (verás lag),
 *          después agregá useDeferredValue (input fluido).
 */
function generateItems() {
  return Array.from({ length: 20000 }, (_, i) => ({
    id: i,
    name: `Item ${i} ${["Alpha", "Beta", "Gamma", "Delta", "Omega"][i % 5]}`,
  }));
}

export function DeferredSearchDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 16B — useTransition con tabs (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un sistema de tabs donde cambiar de tab no bloquea la UI.
 *
 * Requisitos:
 * 1. Tres tabs: "Home", "Posts" (pesado), "About"
 * 2. Home y About son ligeros (un par de párrafos)
 * 3. PostsTab es pesado: renderiza 5.000 items con un componente
 *    SlowPost que simula trabajo (agrega un loop lento artificial):
 *      function SlowPost({ text }) {
 *        const start = performance.now();
 *        while (performance.now() - start < 1) {} // 1ms de trabajo por item
 *        return <li>{text}</li>;
 *      }
 * 4. Usa useTransition para cambiar de tab:
 *    - El tab selector responde inmediatamente
 *    - isPending muestra un indicador de carga
 *    - El contenido anterior se mantiene visible (con opacity) mientras carga el nuevo
 * 5. Sin useTransition, la UI se congela al cambiar a Posts
 *
 * Pista: SlowPost envuelto en memo() para que no re-renderice innecesariamente.
 */

export function TransitionTabsDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 16C — Filtros combinados con useDeferredValue (★★★)
// ─────────────────────────────────────────────
/**
 * Crea una tabla de datos con filtro por texto, categoría y ordenamiento,
 * donde los filtros responden inmediatamente pero la tabla se actualiza
 * de forma diferida.
 *
 * Datos: generateEmployees() (ya definida abajo)
 *
 * Requisitos:
 * 1. Input de búsqueda (por nombre)
 * 2. Select de departamento: "all", "Engineering", "Marketing", "Sales", "HR"
 * 3. Select de ordenamiento: "name", "salary", "age"
 * 4. Los 3 filtros se combinan en un objeto: { search, department, sort }
 * 5. Usa useDeferredValue sobre el objeto de filtros
 * 6. La tabla se renderiza con los filtros diferidos
 * 7. Indicador de "actualizando" cuando los filtros reales != diferidos
 * 8. Muestra "X de Y empleados" (filtrados de total)
 * 9. La tabla tiene 5.000 filas (simulado — usa generateEmployees)
 *
 * Pista: useDeferredValue funciona con cualquier valor, no solo strings.
 *   const deferredFilters = useDeferredValue(filters);
 *   const isStale = filters !== deferredFilters;
 */
function generateEmployees() {
  const departments = ["Engineering", "Marketing", "Sales", "HR"];
  return Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `Empleado ${i} ${["García", "López", "Martínez", "Rodríguez", "Hernández"][i % 5]}`,
    department: departments[i % 4],
    salary: 40000 + Math.floor(Math.random() * 60000),
    age: 22 + Math.floor(Math.random() * 40),
  }));
}

export function DeferredFiltersDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 16D — Diagnóstico: ¿useTransition, useDeferredValue, o useMemo? (★★★)
// ─────────────────────────────────────────────
/**
 * Para cada escenario, decide qué herramienta usar y POR QUÉ.
 *
 * Criterios:
 * - useMemo: el CÁLCULO es costoso, el render no
 * - useTransition: el RENDER es costoso y controlás el setState
 * - useDeferredValue: el RENDER es costoso y recibes el valor como prop
 * - Nada: no hay problema real de performance
 */

// Escenario 1:
// Un input que filtra un array de 50 elementos y muestra los resultados
// Herramienta: ___________
// ¿Por qué? ___________

// Escenario 2:
// Un input que filtra 50.000 elementos. El filtrado tarda 200ms
// pero el render de la lista es rápido (solo muestra 20 resultados).
// Herramienta: ___________
// ¿Por qué? ___________

// Escenario 3:
// Un input que filtra 1.000 elementos. El filtrado es rápido
// pero cada item tiene un componente complejo con gráficos inline
// que tarda 5ms cada uno en renderizar (5 segundos total).
// Herramienta: ___________
// ¿Por qué? ___________

// Escenario 4:
// Un componente hijo recibe una prop `searchQuery` del padre.
// El hijo renderiza una lista de 10.000 items filtrados.
// No tenés acceso al setState del padre.
// Herramienta: ___________
// ¿Por qué? ___________

// Escenario 5:
// Un select que cambia la categoría. Al cambiar, un gráfico de D3
// se re-renderiza con 50.000 puntos (tarda 300ms).
// Herramienta: ___________
// ¿Por qué? ___________

export function DiagnosticExercise() {
  return <p>Este ejercicio es de análisis — responde en los comentarios arriba.</p>;
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 16A:
 * export function DeferredSearchDemo() {
 *   const [items] = useState(() => generateItems());
 *   const [query, setQuery] = useState("");
 *   const deferredQuery = useDeferredValue(query);
 *   const isStale = query !== deferredQuery;
 *
 *   const filtered = useMemo(
 *     () => items.filter(i => i.name.toLowerCase().includes(deferredQuery.toLowerCase())),
 *     [items, deferredQuery]
 *   );
 *
 *   return (
 *     <div>
 *       <input
 *         value={query}
 *         onChange={e => setQuery(e.target.value)}
 *         placeholder="Buscar entre 20.000 items..."
 *       />
 *       <p>{filtered.length} resultados {isStale && "(actualizando...)"}</p>
 *       <ul style={{ opacity: isStale ? 0.5 : 1, transition: "opacity 0.2s" }}>
 *         {filtered.slice(0, 100).map(item => (
 *           <li key={item.id}>{item.name}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 *
 *
 * // 16B:
 * const SlowPost = memo(function SlowPost({ text }) {
 *   const start = performance.now();
 *   while (performance.now() - start < 1) {}
 *   return <li>{text}</li>;
 * });
 *
 * function HomeTab() { return <div><h2>Home</h2><p>Bienvenido a la app</p></div>; }
 * function AboutTab() { return <div><h2>About</h2><p>Somos un equipo de devs</p></div>; }
 * function PostsTab() {
 *   const posts = Array.from({ length: 5000 }, (_, i) => `Post #${i}`);
 *   return <ul>{posts.map((p, i) => <SlowPost key={i} text={p} />)}</ul>;
 * }
 *
 * export function TransitionTabsDemo() {
 *   const [tab, setTab] = useState("home");
 *   const [isPending, startTransition] = useTransition();
 *
 *   function changeTab(newTab) {
 *     startTransition(() => setTab(newTab));
 *   }
 *
 *   const tabs = { home: HomeTab, posts: PostsTab, about: AboutTab };
 *   const TabContent = tabs[tab];
 *
 *   return (
 *     <div>
 *       <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
 *         {["home", "posts", "about"].map(t => (
 *           <button key={t} onClick={() => changeTab(t)}
 *             style={{ fontWeight: tab === t ? "bold" : "normal" }}>
 *             {t.charAt(0).toUpperCase() + t.slice(1)}
 *           </button>
 *         ))}
 *       </div>
 *       {isPending && <p>Cargando...</p>}
 *       <div style={{ opacity: isPending ? 0.7 : 1 }}>
 *         <TabContent />
 *       </div>
 *     </div>
 *   );
 * }
 *
 *
 * // 16C:
 * export function DeferredFiltersDemo() {
 *   const [employees] = useState(() => generateEmployees());
 *   const [filters, setFilters] = useState({ search: "", department: "all", sort: "name" });
 *   const deferredFilters = useDeferredValue(filters);
 *   const isStale = filters !== deferredFilters;
 *
 *   const result = useMemo(() => {
 *     let list = employees;
 *     if (deferredFilters.department !== "all") {
 *       list = list.filter(e => e.department === deferredFilters.department);
 *     }
 *     if (deferredFilters.search) {
 *       list = list.filter(e => e.name.toLowerCase().includes(deferredFilters.search.toLowerCase()));
 *     }
 *     list = [...list].sort((a, b) => {
 *       if (deferredFilters.sort === "name") return a.name.localeCompare(b.name);
 *       return a[deferredFilters.sort] - b[deferredFilters.sort];
 *     });
 *     return list;
 *   }, [employees, deferredFilters]);
 *
 *   return (
 *     <div>
 *       <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
 *         <input placeholder="Buscar..." value={filters.search}
 *           onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} />
 *         <select value={filters.department}
 *           onChange={e => setFilters(f => ({ ...f, department: e.target.value }))}>
 *           <option value="all">Todos</option>
 *           <option value="Engineering">Engineering</option>
 *           <option value="Marketing">Marketing</option>
 *           <option value="Sales">Sales</option>
 *           <option value="HR">HR</option>
 *         </select>
 *         <select value={filters.sort}
 *           onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}>
 *           <option value="name">Nombre</option>
 *           <option value="salary">Salario</option>
 *           <option value="age">Edad</option>
 *         </select>
 *       </div>
 *       <p>{result.length} de {employees.length} empleados {isStale && "(actualizando...)"}</p>
 *       <table style={{ opacity: isStale ? 0.5 : 1 }}>
 *         <thead><tr><th>Nombre</th><th>Depto</th><th>Salario</th><th>Edad</th></tr></thead>
 *         <tbody>
 *           {result.slice(0, 100).map(e => (
 *             <tr key={e.id}><td>{e.name}</td><td>{e.department}</td><td>${e.salary}</td><td>{e.age}</td></tr>
 *           ))}
 *         </tbody>
 *       </table>
 *     </div>
 *   );
 * }
 *
 *
 * // 16D — Respuestas:
 *
 * // Escenario 1: NADA
 * // 50 elementos es trivial. No hay problema de performance. No optimices sin causa.
 *
 * // Escenario 2: useMemo
 * // El cálculo (filtrado) es costoso, pero el render es rápido (20 items).
 * // useMemo evita recalcular. useTransition no ayuda porque el render no es costoso.
 *
 * // Escenario 3: useTransition (o useDeferredValue)
 * // El render es costoso (1000 items x 5ms = 5s). useMemo no ayuda porque
 * // el problema no es el cálculo sino el render de los componentes.
 * // useTransition permite que el input responda mientras React renderiza la lista.
 *
 * // Escenario 4: useDeferredValue
 * // Recibes searchQuery como prop, no controlás el setState.
 * // useDeferredValue crea una versión diferida de la prop.
 *
 * // Escenario 5: useTransition
 * // Controlás el setState (el select). El render del gráfico es costoso.
 * // startTransition(() => setCategory(newCategory)) mantiene el select responsive.
 */
