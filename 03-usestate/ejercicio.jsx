/**
 * EJERCICIO 3 — useState
 *
 * Tres ejercicios de dificultad creciente. Intenta cada uno antes de mirar la solución.
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 3A — Contador con límites
// ─────────────────────────────────────────────
/**
 * Crea un contador que:
 * 1. Empiece en 0
 * 2. Tenga botones + y -
 * 3. NO pueda bajar de 0
 * 4. NO pueda subir de 10
 * 5. Tenga un botón "Reset" que vuelva a 0
 * 6. Muestre el número en rojo si es >= 8, en verde si es <= 2, negro si es intermedio
 */
export function Contador() {
  const [count, setCount] = useState(0)

  const aumentar = () => {
    setCount(c => Math.min(10, c + 1));
  }

  const decrementar = () => {
    setCount(c => Math.max(0, c - 1));
  }

  return (
    <>
      <h2 style={{color: count >= 8 ? "red" : count <= 2 ? "green" : "black"}}>Contador: {count}</h2>

      <div>
        <button onClick={aumentar}>+</button>
        <button onClick={decrementar}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 3B — Toggle y estado booleano
// ─────────────────────────────────────────────
/**
 * Crea un componente que:
 * 1. Muestre un texto que puede estar "oculto" o "visible"
 * 2. Un botón que alterne entre mostrar y ocultar el texto
 * 3. El texto del botón cambia según el estado: "Mostrar" / "Ocultar"
 *
 * Texto a mostrar: "Este es el contenido secreto 🎉"
 */
export function ToggleTexto() {

  const [visible, setVisible] = useState(false);

  return(
    <div>
      <button onClick={() => setVisible(v => !v)}>
        {visible ? "Ocultar" : "Mostrar"}
      </button>
      {visible && <p>Este es el contenido secreto 🎉</p>}
    </div>
  );
  
}


// ─────────────────────────────────────────────
// EJERCICIO 3C — Estado con objetos (¡trampa común!)
// ─────────────────────────────────────────────
/**
 * Completa el componente. Al hacer clic en "Cumpleaños", debe aumentar
 * la edad en 1 SIN perder el nombre ni la ciudad.
 *
 * Pista: cuando el estado es un objeto, debes copiar las propiedades
 * que no cambian usando el spread operator: { ...persona, edad: nuevaEdad }
 */
export function TarjetaPersona() {
  const [persona, setPersona] = useState({
    nombre: "Laura",
    edad: 24,
    ciudad: "Madrid",
  });

  function cumpleaños() {
    setPersona(p => ({...p, edad: p.edad + 1}))
  }

  return (
    <div>
      <p>Nombre: {persona.nombre}</p>
      <p>Edad: {persona.edad}</p>
      <p>Ciudad: {persona.ciudad}</p>
      <button onClick={cumpleaños}>Cumpleaños 🎂</button>
    </div>
  );
}


/**
 * SOLUCIONES:
 *
 * // 3A
 * function Contador() {
 *   const [count, setCount] = useState(0);
 *   const color = count >= 8 ? "red" : count <= 2 ? "green" : "black";
 *   return (
 *     <div>
 *       <p style={{ color, fontSize: "2rem" }}>{count}</p>
 *       <button onClick={() => setCount(c => Math.max(0, c - 1))}>-</button>
 *       <button onClick={() => setCount(c => Math.min(10, c + 1))}>+</button>
 *       <button onClick={() => setCount(0)}>Reset</button>
 *     </div>
 *   );
 * }
 *
 * // 3B
 * function ToggleTexto() {
 *   const [visible, setVisible] = useState(false);
 *   return (
 *     <div>
 *       <button onClick={() => setVisible(v => !v)}>
 *         {visible ? "Ocultar" : "Mostrar"}
 *       </button>
 *       {visible && <p>Este es el contenido secreto 🎉</p>}
 *     </div>
 *   );
 * }
 *
 * // 3C
 * function cumpleaños() {
 *   setPersona(p => ({ ...p, edad: p.edad + 1 }));
 *   // El spread ...p copia nombre y ciudad, luego sobreescribimos solo edad
 * }
 *
 * // ¿Por qué está mal setPersona({ edad: persona.edad + 1 })?
 * // Porque reemplaza el objeto completo — nombre y ciudad desaparecen.
 */
