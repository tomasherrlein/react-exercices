/**
 * EJERCICIO 5 — Eventos y Formularios Controlados
 *
 * El ejercicio final de la etapa 1 — integra todo lo aprendido.
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 5A — Formulario controlado básico
// ─────────────────────────────────────────────
/**
 * Completa el formulario de registro. Debe:
 * 1. Controlar todos los inputs con estado
 * 2. Mostrar los datos en tiempo real debajo del formulario
 * 3. Al hacer submit: mostrar alert con los datos Y limpiar el formulario
 * 4. El botón submit debe estar deshabilitado si nombre o email están vacíos
 *
 * Campos: nombre (text), email (text), rol (select: "usuario" | "admin"), activo (checkbox)
 */
export function FormularioRegistro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "usuario",
    activo: false,
  });

  function handleChange(e) {
    // Pista: e.target.type === "checkbox" usa e.target.checked, el resto usa e.target.value
    // Pista 2: usa e.target.name para saber qué campo actualizar
    // Tu código aquí

    const { name, type, value, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));

  }

  function handleSubmit(e) {
    e.preventDefault(); // evita que la página se recargue
    // Tu código aquí
    alert(JSON.stringify(form, null, 2))
    setForm({nombre: "", email: "", rol:"usuario", activo: false})
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="rol">Rol:</label>
        <select id="rol" name="rol" value={form.rol} onChange={handleChange}>
          <option value="usuario">Usuario</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label>
          <input
            name="activo"
            type="checkbox"
            checked={form.activo}
            onChange={handleChange}
          />
          Cuenta activa
        </label>
      </div>

      {/* TODO: botón deshabilitado si nombre o email vacíos */}
      <button type="submit" disabled={!form.email || !form.nombre}>Registrar</button>

      {/* TODO: muestra los datos del form en tiempo real */}
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 5B — Validación en tiempo real
// ─────────────────────────────────────────────
/**
 * Crea un formulario de login con validación:
 *
 * Email:
 * - Debe contener "@" y "."
 * - Mostrar error "Email inválido" solo después de que el usuario
 *   haya tocado el campo y lo deje vacío o inválido
 *
 * Contraseña:
 * - Mínimo 8 caracteres
 * - Mostrar barra de fortaleza: roja (<8), naranja (8-11), verde (12+)
 * - Mostrar error solo después de que el usuario haya tocado el campo
 *
 * Submit:
 * - Solo habilitado si ambos campos son válidos
 * - Al enviar: mostrar "Login exitoso" o simular error
 *
 * Pista: usa un estado separado para saber qué campos han sido "tocados"
 * { emailTocado: false, passwordTocado: false }
 */
function FormularioLogin() {
  const [campos, setCampos] = useState({ email: "", password: "" });
  const [tocados, setTocados] = useState({ email: false, password: false });

  const emailValido = campos.email.includes("@") && campos.email.includes(".");
  const passwordValida = campos.password.length >= 8;
  const formularioValido = emailValido && passwordValida;

  function handleBlur(e) {
    // Marca el campo como "tocado" cuando el usuario lo abandona
    setTocados(t => ({ ...t, [e.target.name]: true }));
  }

  // Tu código aquí — completa el formulario

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={campos.email}
          onChange={e => setCampos(c => ({ ...c, email: e.target.value }))}
          onBlur={handleBlur}
        />
        {/* TODO: mostrar error si tocado && !emailValido */}
      </div>

      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={campos.password}
          onChange={e => setCampos(c => ({ ...c, password: e.target.value }))}
          onBlur={handleBlur}
        />
        {/* TODO: barra de fortaleza y error */}
      </div>

      <button type="submit" disabled={!formularioValido}>Entrar</button>
    </form>
  );
}


/**
 * SOLUCIONES:
 *
 * // 5A — handleChange universal para todos los tipos de input:
 * function handleChange(e) {
 *   const { name, type, value, checked } = e.target;
 *   setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
 * }
 *
 * function handleSubmit(e) {
 *   e.preventDefault();
 *   alert(JSON.stringify(form, null, 2));
 *   setForm({ nombre: "", email: "", rol: "usuario", activo: false });
 * }
 *
 * // Botón:
 * <button type="submit" disabled={!form.nombre || !form.email}>Registrar</button>
 *
 * // Preview en tiempo real:
 * <pre>{JSON.stringify(form, null, 2)}</pre>
 *
 *
 * // 5B — Barra de fortaleza:
 * function getFortaleza(pwd) {
 *   if (pwd.length === 0) return null;
 *   if (pwd.length < 8)  return { color: "red",    texto: "Débil" };
 *   if (pwd.length < 12) return { color: "orange",  texto: "Media" };
 *   return                      { color: "green",   texto: "Fuerte" };
 * }
 *
 * const fortaleza = getFortaleza(campos.password);
 *
 * // Renderizado de la barra:
 * {fortaleza && (
 *   <div style={{ background: fortaleza.color, height: "4px", width: "100%" }}>
 *     {fortaleza.texto}
 *   </div>
 * )}
 *
 * // Error de email:
 * {tocados.email && !emailValido && (
 *   <span style={{ color: "red" }}>Email inválido</span>
 * )}
 *
 * // Error de password:
 * {tocados.password && !passwordValida && (
 *   <span style={{ color: "red" }}>Mínimo 8 caracteres</span>
 * )}
 */
