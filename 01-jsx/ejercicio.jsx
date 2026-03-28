/**
 * EJERCICIO 1 — JSX
 *
 * Corrige los 6 errores de JSX que hay en este componente.
 * Pista: recuerda las diferencias entre JSX y HTML.
 */

function Perfil() {
  const nombre = "Carlos";
  const activo = true;

  return (
    <div className="perfil">
      <img src="foto.jpg"/>           
      <label htmlFor="usuario">
        Nombre de usuario
      </label>
      <input id="usuario" type="text" />  

      <p onClick={() => alert("hola")}> 
        Haz clic aquí
      </p>

      <p>Estado: {activo ? "activo"  :  "inactivo" }</p>  {/* Error 6 — la expresión if no es válida en JSX */}
    </div>
  );
}

/**
 * SOLUCIÓN (no mires hasta intentarlo):
 *
 * 1. class="perfil"          → className="perfil"
 * 2. <img src="foto.jpg">    → <img src="foto.jpg" />
 * 3. for="usuario"           → htmlFor="usuario"
 * 4. <input ...>             → <input ... />
 * 5. onclick                 → onClick
 * 6. if no es expresión      → {activo ? "activo" : "inactivo"}
 */
