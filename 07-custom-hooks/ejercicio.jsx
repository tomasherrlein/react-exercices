/**
 * EJERCICIO 7 — Custom Hooks
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 7A — useToggle
// ─────────────────────────────────────────────
/**
 * Crea un custom hook useToggle que:
 * 1. Reciba un valor inicial booleano (default false)
 * 2. Retorne un array [value, toggle] (como useState)
 * 3. toggle() invierte el valor sin recibir argumentos
 *
 * Luego úsalo en el componente PanelDesplegable para mostrar/ocultar contenido.
 */

// Tu custom hook aquí:
// function useToggle(initial = false) { ... }

export function PanelDesplegable() {
  // Reemplaza estos useState por useToggle:
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(v => !v)}>
        {visible ? "Ocultar" : "Mostrar"}
      </button>
      {visible && <p>Contenido del panel desplegable</p>}
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 7B — useLocalStorage
// ─────────────────────────────────────────────
/**
 * Crea un custom hook useLocalStorage que:
 * 1. Reciba una key (string) y un valor default
 * 2. Inicialice el estado leyendo de localStorage (si existe)
 * 3. Cada vez que el valor cambie, lo guarde en localStorage
 * 4. Retorne [valor, setValor] como useState
 *
 * Pistas:
 * - localStorage.getItem(key) retorna string o null
 * - localStorage.setItem(key, value) guarda como string
 * - Usa JSON.parse/JSON.stringify para guardar objetos
 * - Usa inicialización lazy en useState: useState(() => ...)
 *
 * Luego úsalo en el componente ConfigUsuario.
 */

// Tu custom hook aquí:
// function useLocalStorage(key, defaultValue) { ... }

export function ConfigUsuario() {
  // Reemplaza por useLocalStorage:
  const [nombre, setNombre] = useState("");
  const [tema, setTema] = useState("claro");

  return (
    <div>
      <div>
        <label>Nombre: </label>
        <input value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Tema: </label>
        <select value={tema} onChange={e => setTema(e.target.value)}>
          <option value="claro">Claro</option>
          <option value="oscuro">Oscuro</option>
        </select>
      </div>
      <p>Hola {nombre}, tu tema es {tema}</p>
      <p><em>Recarga la página — tus datos deberían persistir.</em></p>
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 7C — useFetch
// ─────────────────────────────────────────────
/**
 * Crea un custom hook useFetch que:
 * 1. Reciba una URL
 * 2. Retorne { data, loading, error }
 * 3. Haga fetch cuando la URL cambie
 * 4. Maneje race conditions con flag cancelled en el cleanup
 * 5. Maneje errores de red
 *
 * Luego úsalo en ListaUsuarios para cargar datos de:
 * https://jsonplaceholder.typicode.com/users
 *
 * Extra: úsalo también en ListaPosts para:
 * https://jsonplaceholder.typicode.com/posts?_limit=5
 *
 * El punto es demostrar que el MISMO hook sirve para ambos.
 */

// Tu custom hook aquí:
// function useFetch(url) { ... }

export function ListaUsuarios() {
  // Usa useFetch aquí:
  const data = null;
  const loading = true;
  const error = null;

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name} — {user.email}</li>
      ))}
    </ul>
  );
}

export function ListaPosts() {
  // Usa el MISMO useFetch aquí:
  const data = null;
  const loading = true;
  const error = null;

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>
          <strong>{post.title}</strong>
        </li>
      ))}
    </ul>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 7D — useDebounce + useFetch juntos
// ─────────────────────────────────────────────
/**
 * Crea un custom hook useDebounce que:
 * 1. Reciba un valor y un delay en ms
 * 2. Retorne el valor "retrasado" — solo se actualiza después de {delay}ms sin cambios
 * 3. Use cleanup para cancelar el setTimeout anterior
 *
 * Luego combínalo con useFetch para crear un buscador:
 *
 * 1. El usuario escribe en un input
 * 2. Espera 500ms después de que deje de escribir
 * 3. Busca en: https://jsonplaceholder.typicode.com/users?q={término}
 * 4. Muestra los resultados
 *
 * Este ejercicio demuestra el poder de combinar custom hooks.
 */

// Tu custom hook aquí:
// function useDebounce(value, delay) { ... }

export function Buscador() {
  const [search, setSearch] = useState("");
  // const debouncedSearch = useDebounce(search, 500)
  // const { data, loading, error } = useFetch(
  //   debouncedSearch ? `https://jsonplaceholder.typicode.com/users?q=${debouncedSearch}` : null
  // )

  return (
    <div>
      <input
        placeholder="Buscar usuarios..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {/* Muestra loading, error, o resultados */}
    </div>
  );
}


/**
 * SOLUCIONES:
 *
 * // 7A — useToggle:
 * function useToggle(initial = false) {
 *   const [value, setValue] = useState(initial);
 *   const toggle = () => setValue(v => !v);
 *   return [value, toggle];
 * }
 *
 * // Uso en PanelDesplegable:
 * const [visible, toggle] = useToggle();
 * <button onClick={toggle}>{visible ? "Ocultar" : "Mostrar"}</button>
 *
 *
 * // 7B — useLocalStorage:
 * function useLocalStorage(key, defaultValue) {
 *   const [valor, setValor] = useState(() => {
 *     const saved = localStorage.getItem(key);
 *     return saved !== null ? JSON.parse(saved) : defaultValue;
 *   });
 *
 *   useEffect(() => {
 *     localStorage.setItem(key, JSON.stringify(valor));
 *   }, [key, valor]);
 *
 *   return [valor, setValor];
 * }
 *
 * // Uso en ConfigUsuario:
 * const [nombre, setNombre] = useLocalStorage('nombre', '');
 * const [tema, setTema] = useLocalStorage('tema', 'claro');
 *
 *
 * // 7C — useFetch:
 * function useFetch(url) {
 *   const [data, setData] = useState(null);
 *   const [loading, setLoading] = useState(true);
 *   const [error, setError] = useState(null);
 *
 *   useEffect(() => {
 *     if (!url) {
 *       setData(null);
 *       setLoading(false);
 *       return;
 *     }
 *
 *     let cancelled = false;
 *     setLoading(true);
 *     setError(null);
 *
 *     fetch(url)
 *       .then(r => {
 *         if (!r.ok) throw new Error(`HTTP ${r.status}`);
 *         return r.json();
 *       })
 *       .then(data => {
 *         if (!cancelled) { setData(data); setLoading(false); }
 *       })
 *       .catch(err => {
 *         if (!cancelled) { setError(err.message); setLoading(false); }
 *       });
 *
 *     return () => { cancelled = true; };
 *   }, [url]);
 *
 *   return { data, loading, error };
 * }
 *
 * // Uso en ListaUsuarios:
 * const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
 *
 * // Uso en ListaPosts:
 * const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
 *
 *
 * // 7D — useDebounce:
 * function useDebounce(value, delay) {
 *   const [debounced, setDebounced] = useState(value);
 *
 *   useEffect(() => {
 *     const id = setTimeout(() => setDebounced(value), delay);
 *     return () => clearTimeout(id);
 *   }, [value, delay]);
 *
 *   return debounced;
 * }
 *
 * // Uso en Buscador:
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 500);
 * const { data, loading, error } = useFetch(
 *   debouncedSearch
 *     ? `https://jsonplaceholder.typicode.com/users?q=${debouncedSearch}`
 *     : null
 * );
 *
 * return (
 *   <div>
 *     <input
 *       placeholder="Buscar usuarios..."
 *       value={search}
 *       onChange={e => setSearch(e.target.value)}
 *     />
 *     {loading && debouncedSearch && <p>Buscando...</p>}
 *     {error && <p>Error: {error}</p>}
 *     {data && (
 *       <ul>
 *         {data.map(user => (
 *           <li key={user.id}>{user.name} — {user.email}</li>
 *         ))}
 *       </ul>
 *     )}
 *   </div>
 * );
 */
