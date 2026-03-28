/**
 * EJERCICIO 8 — useRef
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 8A — Focus automático
// ─────────────────────────────────────────────
/**
 * Crea un formulario de búsqueda que:
 * 1. Al montar el componente, el input de búsqueda recibe el foco automáticamente
 * 2. Tenga un botón "Limpiar" que vacíe el input Y le devuelva el foco
 *
 * Pista: necesitas useRef para acceder al nodo DOM del input.
 * Pista 2: nodoDOM.focus() le da el foco.
 */
export function Buscador() {
  const [query, setQuery] = useState("");
  // Tu código aquí — crea la ref y el useEffect para el focus inicial

  function handleClear() {
    setQuery("");
    // devuelve el foco al input
  }

  return (
    <div>
      <input
        placeholder="Buscar..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleClear}>Limpiar</button>
      {query && <p>Buscando: {query}</p>}
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 8B — Cronómetro con ref para el interval ID
// ─────────────────────────────────────────────
/**
 * Crea un cronómetro que:
 * 1. Muestre los segundos transcurridos
 * 2. Tenga botones "Iniciar", "Pausar" y "Reset"
 * 3. Use useRef para guardar el ID del setInterval
 *    (NO useState — porque el ID no necesita re-renderizar)
 * 4. Limpie correctamente el intervalo al pausar y al resetear
 *
 * Pista: guarda el ID del intervalo en intervalRef.current
 * Pista 2: revisa que no puedas "iniciar" si ya está corriendo (doble intervalo).
 */
export function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  // Tu código aquí — crea la ref para el interval ID

  function iniciar() {
    // Tu código aquí
  }

  function pausar() {
    // Tu código aquí
  }

  function reset() {
    // Tu código aquí
  }

  return (
    <div>
      <h2>{segundos}s</h2>
      <button onClick={iniciar} disabled={corriendo}>Iniciar</button>
      <button onClick={pausar} disabled={!corriendo}>Pausar</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 8C — Valor previo con useRef
// ─────────────────────────────────────────────
/**
 * Crea un custom hook usePrevious que:
 * 1. Reciba un valor
 * 2. Retorne el valor que tenía en el render ANTERIOR
 * 3. En el primer render, retorne undefined
 *
 * Luego úsalo en el componente ContadorConHistorial para mostrar:
 * "Valor actual: 5, valor anterior: 4"
 *
 * Pista: usa useRef para guardar el valor y useEffect para actualizarlo
 * DESPUÉS del render (el efecto corre después de que la pantalla se pinta).
 *
 * Flujo:
 *   Render 1: valor=0, ref=undefined → muestra prev=undefined, luego effect guarda ref=0
 *   Render 2: valor=1, ref=0        → muestra prev=0, luego effect guarda ref=1
 *   Render 3: valor=2, ref=1        → muestra prev=1, luego effect guarda ref=2
 */

// Tu custom hook aquí:
// function usePrevious(value) { ... }

export function ContadorConHistorial() {
  const [count, setCount] = useState(0);
  // const prevCount = usePrevious(count);

  return (
    <div>
      <p>Actual: {count}</p>
      <p>Anterior: {/* prevCount */}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 8D — Chat con auto-scroll
// ─────────────────────────────────────────────
/**
 * Crea un chat sencillo que:
 * 1. Tenga un input para escribir un mensaje y un botón "Enviar"
 * 2. Los mensajes se acumulen en una lista
 * 3. Cada vez que se agregue un mensaje, haga scroll automático al final
 * 4. El input reciba el foco después de enviar un mensaje
 *
 * Necesitas DOS refs:
 * - Una para el elemento al final de la lista (para scrollIntoView)
 * - Una para el input (para focus después de enviar)
 *
 * Pista: elemento.scrollIntoView({ behavior: "smooth" }) hace scroll suave.
 * Pista 2: el scroll debe hacerse cuando cambie la lista de mensajes (useEffect).
 */
export function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola!" },
    { id: 2, text: "Bienvenido al chat" },
  ]);
  const [input, setInput] = useState("");
  // Tu código aquí — crea las refs y el efecto de scroll

  function handleSend() {
    if (!input.trim()) return;
    setMessages(msgs => [
      ...msgs,
      { id: Date.now(), text: input }
    ]);
    setInput("");
    // devuelve el foco al input
  }

  return (
    <div>
      <div style={{ height: 200, overflowY: "auto", border: "1px solid #ccc", padding: 8 }}>
        {messages.map(msg => (
          <p key={msg.id}>{msg.text}</p>
        ))}
        {/* Elemento invisible al final para scrollIntoView */}
      </div>
      <div>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}


/**
 * SOLUCIONES:
 *
 * // 8A — Focus automático:
 * const inputRef = useRef(null);
 *
 * useEffect(() => {
 *   inputRef.current.focus();
 * }, []);
 *
 * function handleClear() {
 *   setQuery("");
 *   inputRef.current.focus();
 * }
 *
 * <input ref={inputRef} ... />
 *
 *
 * // 8B — Cronómetro con ref:
 * const intervalRef = useRef(null);
 *
 * function iniciar() {
 *   if (corriendo) return;  // evitar doble intervalo
 *   setCorriendo(true);
 *   intervalRef.current = setInterval(() => {
 *     setSegundos(s => s + 1);
 *   }, 1000);
 * }
 *
 * function pausar() {
 *   setCorriendo(false);
 *   clearInterval(intervalRef.current);
 * }
 *
 * function reset() {
 *   setCorriendo(false);
 *   clearInterval(intervalRef.current);
 *   setSegundos(0);
 * }
 *
 *
 * // 8C — usePrevious:
 * function usePrevious(value) {
 *   const ref = useRef();
 *   useEffect(() => {
 *     ref.current = value;
 *   }, [value]);
 *   return ref.current;
 * }
 *
 * // Uso:
 * const prevCount = usePrevious(count);
 * <p>Anterior: {prevCount ?? "ninguno"}</p>
 *
 *
 * // 8D — Chat con auto-scroll:
 * const bottomRef = useRef(null);
 * const inputRef = useRef(null);
 *
 * useEffect(() => {
 *   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
 * }, [messages]);
 *
 * function handleSend() {
 *   if (!input.trim()) return;
 *   setMessages(msgs => [...msgs, { id: Date.now(), text: input }]);
 *   setInput("");
 *   inputRef.current.focus();
 * }
 *
 * // En el JSX:
 * <input ref={inputRef} ... />
 * // Al final de la lista de mensajes:
 * <div ref={bottomRef} />
 */
