/**
 * EJERCICIO 6 — useEffect
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 6A — Título del documento dinámico
// ─────────────────────────────────────────────
/**
 * Crea un contador que sincronice el título de la pestaña del navegador.
 *
 * 1. Muestra un contador con botón "+"
 * 2. El título de la pestaña debe decir "Contador: X" donde X es el valor actual
 * 3. Usa document.title para cambiar el título
 *
 * Pista: ¿qué dependencia necesita tu useEffect?
 */
export function ContadorConTitulo() {
  // Tu código aquí

  return (
    <div>
      <h2>Contador: {/* valor aquí */}</h2>
      <button>+</button>
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 6B — Timer con cleanup
// ─────────────────────────────────────────────
/**
 * Crea un cronómetro que:
 *
 * 1. Muestre los segundos transcurridos
 * 2. Tenga un botón "Iniciar" / "Pausar" que alterne
 * 3. Tenga un botón "Reset" que vuelva a 0 y pause
 * 4. IMPORTANTE: el intervalo debe limpiarse correctamente al pausar
 *    (si no haces cleanup, el timer sigue corriendo en segundo plano)
 *
 * Pista: el useEffect debe depender de si el timer está activo o no.
 * Pista 2: usa setInterval con 1000ms y cleanup con clearInterval.
 */
export function Cronometro() {
  // Tu código aquí

  return (
    <div>
      <h2>Tiempo: {/* segundos */}s</h2>
      <button>{/* Iniciar / Pausar */}</button>
      <button>Reset</button>
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 6C — Fetch con dependencias
// ─────────────────────────────────────────────
/**
 * Crea un componente que:
 *
 * 1. Tenga un select con opciones: "1", "2", "3" (ids de usuario)
 * 2. Al cambiar el select, haga fetch a: https://jsonplaceholder.typicode.com/users/{id}
 * 3. Muestre el nombre y email del usuario cargado
 * 4. Muestre "Cargando..." mientras espera la respuesta
 * 5. Muestre "Error al cargar" si el fetch falla
 * 6. IMPORTANTE: maneja la race condition con un flag cancelled en el cleanup
 *
 * Pista: el efecto depende del userId seleccionado.
 * Pista 2: revisa el ejemplo de race condition en explicacion.md.
 */
export function PerfilUsuario() {
  // Tu código aquí

  return (
    <div>
      <select>
        <option value="1">Usuario 1</option>
        <option value="2">Usuario 2</option>
        <option value="3">Usuario 3</option>
      </select>

      {/* Muestra loading, error, o los datos del usuario */}
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 6D — Encuentra los bugs
// ─────────────────────────────────────────────
/**
 * Este componente tiene 3 BUGS relacionados con useEffect.
 * Encuéntralos y corrígelos. Los bugs son:
 *
 * Bug 1: Dependencia faltante
 * Bug 2: Falta cleanup (memory leak)
 * Bug 3: useEffect innecesario (estado derivado)
 *
 * NO reescribas todo — corrige solo los bugs.
 */
export function ComponenteBuggy({ userId }) {
  const [user, setUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [greeting, setGreeting] = useState("");

  // Bug 1: ¿falta algo en las dependencias?
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(r => r.json())
      .then(data => setUser(data));
  }, []);

  // Bug 2: ¿qué pasa cuando el componente se desmonta?
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  // Bug 3: ¿realmente necesitas un useEffect para esto?
  useEffect(() => {
    if (user) {
      setGreeting(`Hola, ${user.name}!`);
    }
  }, [user]);

  return (
    <div>
      <p>Ancho de ventana: {windowWidth}px</p>
      <p>{greeting}</p>
      {user && <p>Email: {user.email}</p>}
    </div>
  );
}


/**
 * SOLUCIONES:
 *
 * // 6A — Título del documento:
 * const [count, setCount] = useState(0);
 *
 * useEffect(() => {
 *   document.title = `Contador: ${count}`;
 * }, [count]);
 *
 * return (
 *   <div>
 *     <h2>Contador: {count}</h2>
 *     <button onClick={() => setCount(c => c + 1)}>+</button>
 *   </div>
 * );
 *
 *
 * // 6B — Cronómetro:
 * const [segundos, setSegundos] = useState(0);
 * const [activo, setActivo] = useState(false);
 *
 * useEffect(() => {
 *   if (!activo) return;          // si no está activo, no hagas nada
 *   const id = setInterval(() => {
 *     setSegundos(s => s + 1);    // función updater para evitar stale closure
 *   }, 1000);
 *   return () => clearInterval(id); // cleanup al pausar o desmontar
 * }, [activo]);
 *
 * function handleReset() {
 *   setActivo(false);
 *   setSegundos(0);
 * }
 *
 * return (
 *   <div>
 *     <h2>Tiempo: {segundos}s</h2>
 *     <button onClick={() => setActivo(a => !a)}>
 *       {activo ? "Pausar" : "Iniciar"}
 *     </button>
 *     <button onClick={handleReset}>Reset</button>
 *   </div>
 * );
 *
 *
 * // 6C — Fetch con dependencias:
 * const [userId, setUserId] = useState("1");
 * const [user, setUser] = useState(null);
 * const [loading, setLoading] = useState(true);
 * const [error, setError] = useState(null);
 *
 * useEffect(() => {
 *   let cancelled = false;
 *   setLoading(true);
 *   setError(null);
 *
 *   fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
 *     .then(r => r.json())
 *     .then(data => {
 *       if (!cancelled) {
 *         setUser(data);
 *         setLoading(false);
 *       }
 *     })
 *     .catch(err => {
 *       if (!cancelled) {
 *         setError("Error al cargar");
 *         setLoading(false);
 *       }
 *     });
 *
 *   return () => { cancelled = true; };
 * }, [userId]);
 *
 * return (
 *   <div>
 *     <select value={userId} onChange={e => setUserId(e.target.value)}>
 *       <option value="1">Usuario 1</option>
 *       <option value="2">Usuario 2</option>
 *       <option value="3">Usuario 3</option>
 *     </select>
 *     {loading ? <p>Cargando...</p>
 *       : error ? <p>{error}</p>
 *       : (
 *         <div>
 *           <p>Nombre: {user.name}</p>
 *           <p>Email: {user.email}</p>
 *         </div>
 *       )}
 *   </div>
 * );
 *
 *
 * // 6D — Bugs corregidos:
 *
 * // Bug 1: faltaba userId en las dependencias
 * useEffect(() => {
 *   fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
 *     .then(r => r.json())
 *     .then(data => setUser(data));
 * }, [userId]);  // ← agregado userId
 *
 * // Bug 2: faltaba cleanup del event listener
 * useEffect(() => {
 *   function handleResize() {
 *     setWindowWidth(window.innerWidth);
 *   }
 *   window.addEventListener("resize", handleResize);
 *   return () => window.removeEventListener("resize", handleResize); // ← cleanup
 * }, []);
 *
 * // Bug 3: useEffect innecesario — es estado derivado
 * // Eliminar el useEffect y el useState de greeting, y calcular directo:
 * const greeting = user ? `Hola, ${user.name}!` : "";
 */
