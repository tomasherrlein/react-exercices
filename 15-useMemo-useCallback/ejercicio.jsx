/**
 * EJERCICIO 13 — useMemo y useCallback
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState, useMemo, useCallback, memo } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 13A — Filtro costoso con useMemo (★☆☆)
// ─────────────────────────────────────────────
/**
 * Tienes una lista de 10.000 productos y un input de búsqueda.
 * Sin useMemo, el filtrado se ejecuta en cada render (incluso cuando
 * solo cambia algo que no tiene nada que ver con la búsqueda).
 *
 * Requisitos:
 * 1. Genera una lista de 10.000 productos con generateProducts()
 *    (ya está definida abajo)
 * 2. Input de búsqueda que filtra por nombre (case-insensitive)
 * 3. Un contador independiente con botón + (para provocar re-renders)
 * 4. Usa useMemo para que el filtrado SOLO se ejecute cuando
 *    cambien products o query — NO cuando cambie count
 * 5. Agrega un console.log("Filtrando...") dentro del useMemo
 *    para verificar que solo se ejecuta cuando debe
 * 6. Muestra los primeros 50 resultados y "X resultados totales"
 */
function generateProducts() {
  return Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Producto ${i} ${["Alpha", "Beta", "Gamma", "Delta", "Omega"][i % 5]}`,
    price: Math.round(Math.random() * 1000) / 10,
  }));
}

export function FilterableProducts() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 13B — useCallback con componente memoizado (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un componente padre con una lista de items y un contador.
 * Cada item tiene un botón "eliminar" que llama al padre.
 *
 * Requisitos:
 * 1. Parent: tiene items (array) y count (número)
 * 2. ItemRow: componente hijo envuelto en memo() que recibe
 *    item y onRemove
 * 3. Sin useCallback: al incrementar count, TODOS los ItemRow
 *    se re-renderizan (porque onRemove es una función nueva)
 * 4. Con useCallback: al incrementar count, NINGÚN ItemRow
 *    se re-renderiza (porque onRemove mantiene la referencia)
 * 5. Agrega un console.log("ItemRow render:", item.name) dentro
 *    de ItemRow para verificar
 * 6. Items iniciales: ["React", "Vue", "Angular", "Svelte", "Solid"]
 *
 * Pista: onRemove debe usar la función updater de setState
 *        para no necesitar items en las dependencias del useCallback.
 */

// const ItemRow = memo(function ItemRow({ item, onRemove }) { ... });

export function CallbackDemo() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 13C — Separar dependencias de useMemo (★★★)
// ─────────────────────────────────────────────
/**
 * Tienes una lista de empleados con filtro por departamento y ordenamiento.
 *
 * El problema: si usas un solo useMemo con [employees, department, sortBy],
 * cambiar SOLO el orden re-ejecuta también el filtrado (innecesario).
 *
 * Requisitos:
 * 1. Estado: department (string), sortBy ("name" | "salary" | "age")
 * 2. Usa DOS useMemo encadenados:
 *    - Primero: filtrar por department → depende de [employees, department]
 *    - Segundo: ordenar el resultado → depende de [filtered, sortBy]
 * 3. Agrega console.log en cada useMemo para verificar que cada uno
 *    solo se ejecuta cuando SUS dependencias cambian
 * 4. Select para department: "all", "Engineering", "Marketing", "Sales"
 * 5. Select para sortBy: "name", "salary", "age"
 * 6. Mostrar la lista con nombre, departamento, salario y edad
 *
 * Datos:
 */
const EMPLOYEES = [
  { id: 1, name: "Ana López", department: "Engineering", salary: 85000, age: 29 },
  { id: 2, name: "Carlos Ruiz", department: "Marketing", salary: 65000, age: 34 },
  { id: 3, name: "Diana Martínez", department: "Engineering", salary: 92000, age: 31 },
  { id: 4, name: "Eduardo Silva", department: "Sales", salary: 70000, age: 27 },
  { id: 5, name: "Fernanda Torres", department: "Marketing", salary: 72000, age: 38 },
  { id: 6, name: "Gabriel Herrera", department: "Engineering", salary: 88000, age: 25 },
  { id: 7, name: "Helena Vargas", department: "Sales", salary: 68000, age: 42 },
  { id: 8, name: "Iván Morales", department: "Engineering", salary: 95000, age: 36 },
  { id: 9, name: "Julia Campos", department: "Marketing", salary: 61000, age: 23 },
  { id: 10, name: "Kevin Paredes", department: "Sales", salary: 75000, age: 33 },
];

export function EmployeeTable() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 13D — Diagnóstico: ¿memoizar o no? (★★★)
// ─────────────────────────────────────────────
/**
 * Este ejercicio es diferente. Abajo hay 5 bloques de código.
 * Para cada uno, decide si useMemo/useCallback es NECESARIO, INNECESARIO,
 * o CONTRAPRODUCENTE. Escribe tu respuesta como comentario Y luego
 * corrige el código si es necesario.
 *
 * Criterios:
 * - NECESARIO: hay un problema real de performance que esto soluciona
 * - INNECESARIO: funciona igual sin el memo, es optimización prematura
 * - CONTRAPRODUCENTE: el useMemo/useCallback agrega costo sin beneficio
 */

// Bloque 1:
function Example1() {
  const [name, setName] = useState("");
  const greeting = useMemo(() => `Hola, ${name}!`, [name]);
  return <p>{greeting}</p>;
}
// Tu análisis: ¿NECESARIO / INNECESARIO / CONTRAPRODUCENTE? ¿Por qué?
// Respuesta: ___________

// Bloque 2:
function Example2({ items, onSelect }) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => a.price - b.price),
    [items]
  );
  return <ul>{sorted.map(i => <li key={i.id} onClick={() => onSelect(i)}>{i.name}</li>)}</ul>;
}
// Tu análisis: ¿NECESARIO / INNECESARIO / CONTRAPRODUCENTE? ¿Por qué?
// Respuesta: ___________

// Bloque 3:
function Example3() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(c => c + 1), []);
  return <button onClick={increment}>Count: {count}</button>;
}
// Tu análisis: ¿NECESARIO / INNECESARIO / CONTRAPRODUCENTE? ¿Por qué?
// Respuesta: ___________

// Bloque 4:
const MemoizedChild4 = memo(function Child4({ onClick }) {
  console.log("Child4 render");
  return <button onClick={onClick}>Click me</button>;
});
function Example4() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => console.log("clicked"), []);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <MemoizedChild4 onClick={handleClick} />
    </div>
  );
}
// Tu análisis: ¿NECESARIO / INNECESARIO / CONTRAPRODUCENTE? ¿Por qué?
// Respuesta: ___________

// Bloque 5:
function Example5({ data }) {
  const [filter, setFilter] = useState("");
  const config = useMemo(() => ({ theme: "dark", locale: "es" }), []);
  return <ChildComponent config={config} />;
}
// Tu análisis: ¿NECESARIO / INNECESARIO / CONTRAPRODUCENTE? ¿Por qué?
// Respuesta: ___________


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 13A:
 * export function FilterableProducts() {
 *   const [products] = useState(() => generateProducts());
 *   const [query, setQuery] = useState("");
 *   const [count, setCount] = useState(0);
 *
 *   const filtered = useMemo(() => {
 *     console.log("Filtrando...");
 *     return products.filter(p =>
 *       p.name.toLowerCase().includes(query.toLowerCase())
 *     );
 *   }, [products, query]);
 *
 *   return (
 *     <div>
 *       <input
 *         placeholder="Buscar productos..."
 *         value={query}
 *         onChange={e => setQuery(e.target.value)}
 *       />
 *       <button onClick={() => setCount(c => c + 1)}>
 *         Contador: {count} (no debería re-filtrar)
 *       </button>
 *       <p>{filtered.length} resultados totales</p>
 *       <ul>
 *         {filtered.slice(0, 50).map(p => (
 *           <li key={p.id}>{p.name} — ${p.price}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 *
 *
 * // 13B:
 * const ItemRow = memo(function ItemRow({ item, onRemove }) {
 *   console.log("ItemRow render:", item.name);
 *   return (
 *     <li>
 *       {item.name}
 *       <button onClick={() => onRemove(item.id)}>Eliminar</button>
 *     </li>
 *   );
 * });
 *
 * export function CallbackDemo() {
 *   const [items, setItems] = useState([
 *     { id: 1, name: "React" },
 *     { id: 2, name: "Vue" },
 *     { id: 3, name: "Angular" },
 *     { id: 4, name: "Svelte" },
 *     { id: 5, name: "Solid" },
 *   ]);
 *   const [count, setCount] = useState(0);
 *
 *   const handleRemove = useCallback((id) => {
 *     setItems(prev => prev.filter(item => item.id !== id));
 *   }, []);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setCount(c => c + 1)}>
 *         Count: {count} (no debería re-renderizar items)
 *       </button>
 *       <ul>
 *         {items.map(item => (
 *           <ItemRow key={item.id} item={item} onRemove={handleRemove} />
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 *
 *
 * // 13C:
 * export function EmployeeTable() {
 *   const [department, setDepartment] = useState("all");
 *   const [sortBy, setSortBy] = useState("name");
 *
 *   const filtered = useMemo(() => {
 *     console.log("Filtrando por departamento...");
 *     if (department === "all") return EMPLOYEES;
 *     return EMPLOYEES.filter(e => e.department === department);
 *   }, [department]);
 *
 *   const sorted = useMemo(() => {
 *     console.log("Ordenando...");
 *     return [...filtered].sort((a, b) => {
 *       if (sortBy === "name") return a.name.localeCompare(b.name);
 *       return a[sortBy] - b[sortBy];
 *     });
 *   }, [filtered, sortBy]);
 *
 *   return (
 *     <div>
 *       <div>
 *         <label>Departamento: </label>
 *         <select value={department} onChange={e => setDepartment(e.target.value)}>
 *           <option value="all">Todos</option>
 *           <option value="Engineering">Engineering</option>
 *           <option value="Marketing">Marketing</option>
 *           <option value="Sales">Sales</option>
 *         </select>
 *         <label> Ordenar por: </label>
 *         <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
 *           <option value="name">Nombre</option>
 *           <option value="salary">Salario</option>
 *           <option value="age">Edad</option>
 *         </select>
 *       </div>
 *       <table>
 *         <thead>
 *           <tr><th>Nombre</th><th>Depto</th><th>Salario</th><th>Edad</th></tr>
 *         </thead>
 *         <tbody>
 *           {sorted.map(e => (
 *             <tr key={e.id}>
 *               <td>{e.name}</td>
 *               <td>{e.department}</td>
 *               <td>${e.salary.toLocaleString()}</td>
 *               <td>{e.age}</td>
 *             </tr>
 *           ))}
 *         </tbody>
 *       </table>
 *     </div>
 *   );
 * }
 *
 *
 * // 13D — Respuestas:
 *
 * // Bloque 1: CONTRAPRODUCENTE
 * // Concatenar dos strings es instantáneo. useMemo gasta más
 * // en comparar dependencias que lo que ahorra. Solo: const greeting = `Hola, ${name}!`
 *
 * // Bloque 2: DEPENDE del tamaño de items
 * // Si items tiene 10 elementos → innecesario (sort de 10 items es instantáneo)
 * // Si items tiene 10.000+ elementos → necesario (evita re-sort costoso)
 * // Sin más contexto, es razonable dejarlo si items puede ser grande.
 *
 * // Bloque 3: INNECESARIO
 * // El button NO está envuelto en memo(). useCallback mantiene referencia estable,
 * // pero nadie se beneficia de eso. El button se re-renderiza igual.
 *
 * // Bloque 4: NECESARIO
 * // MemoizedChild4 está envuelto en memo(). Sin useCallback, handleClick sería
 * // una referencia nueva en cada render, invalidando el memo. Con useCallback,
 * // Child4 no se re-renderiza cuando count cambia. Es el uso correcto.
 *
 * // Bloque 5: DEPENDE
 * // Si ChildComponent está envuelto en memo() → necesario (evita re-render)
 * // Si ChildComponent NO está envuelto en memo() → innecesario
 * // Pero: si config siempre es el mismo valor, mejor definirlo FUERA del componente
 * // como constante: const CONFIG = { theme: "dark", locale: "es" }
 */
