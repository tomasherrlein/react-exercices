/**
 * EJERCICIO 1 — JSX
 *
 * Cinco ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */


// ─────────────────────────────────────────────
// EJERCICIO 1A — Corrige los errores de JSX (★☆☆)
// ─────────────────────────────────────────────
/**
 * Este componente tiene 6 errores de JSX.
 * Corrige cada uno. Pista: recuerda las diferencias entre HTML y JSX.
 */
function Perfil() {
  const nombre = "Carlos";
  const activo = true;

  return (
    <div class="perfil">
      <img src="foto.jpg"/>
      <label for="usuario">
        Nombre de usuario
      </label>
      <input id="usuario" type="text" />

      <p onclick={() => alert("hola")}>
        Haz clic aquí
      </p>

      <p>Estado: { activo ? "activo" : "inactivo"}</p>
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 1B — Expresiones en JSX (★☆☆)
// ─────────────────────────────────────────────
/**
 * Completa TarjetaProducto usando SOLO las props que recibe.
 * No inventes datos — usa las variables de las props.
 *
 * 1. Mostrar el nombre del producto en un <h2>
 * 2. Mostrar el precio formateado como "$XX.XX" (usa .toFixed(2))
 * 3. Si stock > 0 → "Disponible" en verde; si no → "Sin stock" en rojo
 * 4. Mostrar la descripción solo si existe (puede ser null)
 * 5. Botón "Comprar" deshabilitado si stock === 0
 */

export function TarjetaProducto({ nombre, precio, stock, descripcion }) {
  return (
      <div>
       <h2>{nombre}</h2>
        <p>${precio.toFixed(2)}</p>
        <p style={{ color: stock > 0 ? "green" : "red" }}>
          {stock > 0 ? "Disponible" : "Sin stock"}
        </p>
        {descripcion && <p>{descripcion}</p>}
        <button disabled={stock === 0}>Comprar</button>
      </div>
  );
}

// Prueba con:
// <TarjetaProducto nombre="Teclado" precio={89.99} stock={5} descripcion="Cherry MX Red" />
// <TarjetaProducto nombre="Monitor" precio={399} stock={0} descripcion={null} />


// ─────────────────────────────────────────────
// EJERCICIO 1C — Estilos dinámicos (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un componente AlertBox que muestre una caja de alerta con estilo dinámico.
 *
 * Props: type ("success" | "warning" | "error"), message (string)
 *
 * Requisitos:
 * 1. Fondo verde claro (#d4edda) si type es "success"
 * 2. Fondo amarillo claro (#fff3cd) si type es "warning"
 * 3. Fondo rojo claro (#f8d7da) si type es "error"
 * 4. Borde de 1px solid con color más oscuro según el tipo:
 *    success: #c3e6cb, warning: #ffc107, error: #f5c6cb
 * 5. Padding de 12px y borderRadius de 4px
 * 6. Un ícono al inicio del mensaje: "✅" / "⚠️" / "❌" según el tipo
 *
 * Pista: crea un objeto con los estilos por tipo ANTES del return.
 * Pista 2: style={{ ...estilos }} en JSX.
 */
export function AlertBox({ type, message }) {
  const estilos = {
    success: { background: "#d4edda", borderColor: " #c3e6cb", icon:"✅"},
    warning: { background: "#fff3cd", borderColor: " #ffc107", icon:"⚠️"},
    error: { background: "#f8d7da", borderColor: " #f5c6cb", icon:"❌"}
  };

  const estiloSeleccionado = estilos[type];
  
  return(
    <div style={{
      backgroundColor: estiloSeleccionado.background,
      border: `1px, solid, ${estiloSeleccionado.borderColor}`,
      padding: "12px"  
    }}>
      {estiloSeleccionado.icon}{message}
    </div>
  )
}

// Prueba con:
// <AlertBox type="success" message="Operación exitosa" />
// <AlertBox type="warning" message="Revisa los datos" />
// <AlertBox type="error" message="Algo salió mal" />


// ─────────────────────────────────────────────
// EJERCICIO 1D — .map() en JSX (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un componente NavBar que reciba un array de links y los renderice.
 *
 * Props: links (array de { href, label, active })
 *
 * Requisitos:
 * 1. Renderiza un <nav> con un <ul> dentro
 * 2. Cada link es un <li> con un <a> adentro
 * 3. Si el link tiene active: true, el <a> debe tener fontWeight: "bold"
 * 4. Usa una key adecuada (NO el índice — los links podrían reordenarse)
 *
 * Pista: .map() transforma cada elemento del array en JSX.
 */
const linksDemo = [
  { href: "/", label: "Inicio", active: true },
  { href: "/productos", label: "Productos", active: false },
  { href: "/contacto", label: "Contacto", active: false },
];

export function NavBar({ links }) {
  return (
    <nav>
      <ul>
        {links.map(link => <li key={link.href}> <a style={{fontWeight: link.active && "bold"}} href={link.href}> {link.label} </a> </li>)}
      </ul>
    </nav>
  )
}

// Prueba con: <NavBar links={linksDemo} />


// ─────────────────────────────────────────────
// EJERCICIO 1E — Fragments y condicionales complejos (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un componente UserStatus que muestre información diferente
 * según el estado del usuario.
 *
 * Props: user ({ name, role, lastLogin, banned })
 *
 * Reglas:
 * 1. Si user es null → mostrar "No hay usuario logueado"
 * 2. Si user.banned es true → mostrar "Usuario suspendido" en rojo
 *    y NO mostrar nada más
 * 3. Si user existe y no está baneado:
 *    - Mostrar "Bienvenido, {name}"
 *    - Si role es "admin" → mostrar badge "(Administrador)" en azul
 *    - Si lastLogin es null → "Primera vez aquí!"
 *    - Si lastLogin existe → "Último acceso: {lastLogin}"
 * 4. Usa Fragment (<>...</>) para no agregar divs innecesarios al DOM
 *
 * Este ejercicio combina: ternarios, &&, early return, Fragment.
 */
export function UserStatus({ user }) {
  if (!user) {
    return <p> No hay usuario logueado</p>
  }

  if (user.banned) {
    return <p style={{color: "red"}}> Usuario suspendido</p>
  }

  return (
    <>
      <p>Bienvenido {user.role === "admin" && <span style={{color: "blue"}}>(Administrador)</span>} {user.name} </p>
      {!user.lastLogin ? "Primera vez aquí!" : `Ultimo acceso: ${user.lastLogin}`}
    </>
  )
}

// Prueba con:
// <UserStatus user={null} />
// <UserStatus user={{ name: "Ana", role: "admin", lastLogin: "Ayer", banned: false }} />
// <UserStatus user={{ name: "Pedro", role: "user", lastLogin: null, banned: false }} />
// <UserStatus user={{ name: "Luis", role: "user", lastLogin: "Hoy", banned: true }} />


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES (no mires hasta intentarlo)
 * ═══════════════════════════════════════════
 *
 * // 1A — Los 6 errores:
 * // 1. class="perfil"       → className="perfil"
 * // 2. <img src="foto.jpg"> → <img src="foto.jpg" />
 * // 3. for="usuario"        → htmlFor="usuario"
 * // 4. <input ... >         → <input ... />
 * // 5. onclick              → onClick
 * // 6. {if (activo)...}     → {activo ? "activo" : "inactivo"}
 *
 *
 * // 1B — TarjetaProducto:
 * export function TarjetaProducto({ nombre, precio, stock, descripcion }) {
 *   return (
 *     <div>
 *       <h2>{nombre}</h2>
 *       <p>${precio.toFixed(2)}</p>
 *       <p style={{ color: stock > 0 ? "green" : "red" }}>
 *         {stock > 0 ? "Disponible" : "Sin stock"}
 *       </p>
 *       {descripcion && <p>{descripcion}</p>}
 *       <button disabled={stock === 0}>Comprar</button>
 *     </div>
 *   );
 * }
 *
 *
 * // 1C — AlertBox:
 * export function AlertBox({ type, message }) {
 *   const estilos = {
 *     success: { bg: "#d4edda", border: "#c3e6cb", icon: "✅" },
 *     warning: { bg: "#fff3cd", border: "#ffc107", icon: "⚠️" },
 *     error:   { bg: "#f8d7da", border: "#f5c6cb", icon: "❌" },
 *   };
 *   const s = estilos[type];
 *   return (
 *     <div style={{
 *       background: s.bg,
 *       border: `1px solid ${s.border}`,
 *       padding: 12,
 *       borderRadius: 4,
 *     }}>
 *       {s.icon} {message}
 *     </div>
 *   );
 * }
 *
 *
 * // 1D — NavBar:
 * export function NavBar({ links }) {
 *   return (
 *     <nav>
 *       <ul>
 *         {links.map(link => (
 *           <li key={link.href}>
 *             <a href={link.href} style={{ fontWeight: link.active ? "bold" : "normal" }}>
 *               {link.label}
 *             </a>
 *           </li>
 *         ))}
 *       </ul>
 *     </nav>
 *   );
 * }
 *
 *
 * // 1E — UserStatus:
 * export function UserStatus({ user }) {
 *   if (!user) return <p>No hay usuario logueado</p>;
 *   if (user.banned) return <p style={{ color: "red" }}>Usuario suspendido</p>;
 *
 *   return (
 *     <>
 *       <p>
 *         Bienvenido, {user.name}
 *         {user.role === "admin" && (
 *           <span style={{ color: "blue" }}> (Administrador)</span>
 *         )}
 *       </p>
 *       <p>{user.lastLogin ? `Último acceso: ${user.lastLogin}` : "Primera vez aquí!"}</p>
 *     </>
 *   );
 * }
 */
