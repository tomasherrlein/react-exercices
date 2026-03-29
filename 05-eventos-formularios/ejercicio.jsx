/**
 * EJERCICIO 5 — Eventos y Formularios Controlados
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 5A — Formulario controlado básico (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un formulario de registro con un SOLO handleChange para todos los inputs.
 *
 * Campos: nombre (text), email (text), rol (select: "usuario" | "admin"), activo (checkbox)
 *
 * Requisitos:
 * 1. Controlar todos los inputs con un solo objeto de estado
 * 2. Un solo handleChange que use e.target.name para saber qué campo actualizar
 *    y e.target.type para distinguir checkbox de text/select
 * 3. Mostrar los datos en tiempo real debajo del form con <pre>
 * 4. Al submit: alert con los datos + limpiar el formulario
 * 5. Botón submit deshabilitado si nombre O email están vacíos
 *
 * Pista: const { name, type, value, checked } = e.target;
 * Pista 2: [name]: type === "checkbox" ? checked : value
 */
export function FormularioRegistro() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 5B — Validación en tiempo real (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un formulario de login con validación visual.
 *
 * Email:
 * - Válido si contiene "@" y "."
 * - Mostrar "Email inválido" en rojo solo después de que el usuario
 *   toque el campo (onBlur) y esté vacío o inválido
 *
 * Contraseña:
 * - Barra de fortaleza con colores:
 *   - Rojo si < 8 caracteres (texto "Débil")
 *   - Naranja si 8-11 caracteres (texto "Media")
 *   - Verde si 12+ caracteres (texto "Fuerte")
 * - Mostrar la barra solo si el usuario ha empezado a escribir
 * - Mostrar "Mínimo 8 caracteres" en rojo solo después de tocar el campo
 *
 * Submit:
 * - Solo habilitado si email y password son válidos
 * - Al enviar: e.preventDefault() + alert("Login exitoso")
 *
 * Estados: campos { email, password }, tocados { email: false, password: false }
 * Estado derivado: emailValido, passwordValida, formularioValido
 */
export function FormularioLogin() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 5C — Formulario multi-step (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un formulario wizard de 3 pasos:
 *
 * Paso 1 - Datos personales:
 *   - nombre (requerido)
 *   - email (requerido, debe contener @)
 *
 * Paso 2 - Preferencias:
 *   - plan (select: "free" | "pro" | "enterprise")
 *   - newsletter (checkbox)
 *
 * Paso 3 - Confirmación:
 *   - Mostrar resumen de todos los datos ingresados (solo lectura)
 *   - Botón "Confirmar" que haga alert con los datos
 *
 * Requisitos:
 * 1. Indicador de paso actual: "Paso 1 de 3"
 * 2. Botón "Siguiente" (deshabilitado si campos requeridos del paso actual están vacíos)
 * 3. Botón "Atrás" (no aparece en el paso 1)
 * 4. Los datos se conservan al ir atrás y adelante
 * 5. En paso 3, botón "Confirmar" en vez de "Siguiente"
 *
 * Estados: step (number), formData (un solo objeto con todos los campos)
 */
export function FormularioWizard() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 5D — Formulario dinámico (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un formulario donde el usuario puede agregar y quitar campos dinámicamente.
 *
 * Escenario: formulario de "Experiencia laboral" donde cada entrada tiene:
 * - empresa (text)
 * - cargo (text)
 * - años (number)
 *
 * Funcionalidad:
 * 1. Empieza con una entrada vacía
 * 2. Botón "+ Agregar experiencia" que agrega una nueva entrada vacía al final
 * 3. Cada entrada tiene un botón "✕ Quitar" (solo si hay más de 1 entrada)
 * 4. Cada entrada es un grupo de 3 inputs controlados
 * 5. Al submit: validar que todas las entradas tengan empresa y cargo llenos.
 *    Si no, mostrar "Completa todos los campos" en rojo.
 *    Si sí, alert con los datos.
 * 6. Mostrar "Total de años: X" (suma de todos los años) — estado derivado
 *
 * Estado: array de { id, empresa, cargo, años }
 *
 * Pista: para actualizar un campo de una entrada específica:
 *   setEntradas(prev => prev.map(e => e.id === id ? { ...e, [campo]: valor } : e))
 */
export function FormularioExperiencia() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 5A:
 * const [form, setForm] = useState({ nombre: "", email: "", rol: "usuario", activo: false });
 *
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
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <div>
 *       <label htmlFor="nombre">Nombre:</label>
 *       <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} />
 *     </div>
 *     <div>
 *       <label htmlFor="email">Email:</label>
 *       <input id="email" name="email" value={form.email} onChange={handleChange} />
 *     </div>
 *     <div>
 *       <label htmlFor="rol">Rol:</label>
 *       <select id="rol" name="rol" value={form.rol} onChange={handleChange}>
 *         <option value="usuario">Usuario</option>
 *         <option value="admin">Admin</option>
 *       </select>
 *     </div>
 *     <div>
 *       <label>
 *         <input name="activo" type="checkbox" checked={form.activo} onChange={handleChange} />
 *         Cuenta activa
 *       </label>
 *     </div>
 *     <button type="submit" disabled={!form.nombre || !form.email}>Registrar</button>
 *     <pre>{JSON.stringify(form, null, 2)}</pre>
 *   </form>
 * );
 *
 *
 * // 5B:
 * const [campos, setCampos] = useState({ email: "", password: "" });
 * const [tocados, setTocados] = useState({ email: false, password: false });
 *
 * const emailValido = campos.email.includes("@") && campos.email.includes(".");
 * const passwordValida = campos.password.length >= 8;
 * const formularioValido = emailValido && passwordValida;
 *
 * function getFortaleza(pwd) {
 *   if (pwd.length === 0) return null;
 *   if (pwd.length < 8)  return { color: "red", texto: "Débil" };
 *   if (pwd.length < 12) return { color: "orange", texto: "Media" };
 *   return { color: "green", texto: "Fuerte" };
 * }
 * const fortaleza = getFortaleza(campos.password);
 *
 * function handleSubmit(e) {
 *   e.preventDefault();
 *   alert("Login exitoso");
 * }
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <div>
 *       <label htmlFor="email">Email</label>
 *       <input id="email" name="email" value={campos.email}
 *         onChange={e => setCampos(c => ({ ...c, email: e.target.value }))}
 *         onBlur={() => setTocados(t => ({ ...t, email: true }))} />
 *       {tocados.email && !emailValido && <span style={{ color: "red" }}>Email inválido</span>}
 *     </div>
 *     <div>
 *       <label htmlFor="password">Contraseña</label>
 *       <input id="password" name="password" type="password" value={campos.password}
 *         onChange={e => setCampos(c => ({ ...c, password: e.target.value }))}
 *         onBlur={() => setTocados(t => ({ ...t, password: true }))} />
 *       {fortaleza && (
 *         <div style={{ background: fortaleza.color, color: "#fff", padding: "2px 8px", marginTop: 4 }}>
 *           {fortaleza.texto}
 *         </div>
 *       )}
 *       {tocados.password && !passwordValida && <span style={{ color: "red" }}>Mínimo 8 caracteres</span>}
 *     </div>
 *     <button type="submit" disabled={!formularioValido}>Entrar</button>
 *   </form>
 * );
 *
 *
 * // 5C:
 * const [step, setStep] = useState(1);
 * const [formData, setFormData] = useState({
 *   nombre: "", email: "", plan: "free", newsletter: false,
 * });
 *
 * function handleChange(e) {
 *   const { name, type, value, checked } = e.target;
 *   setFormData(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
 * }
 *
 * const puedeAvanzar =
 *   step === 1 ? formData.nombre && formData.email.includes("@") :
 *   step === 2 ? true :
 *   false;
 *
 * return (
 *   <div>
 *     <p>Paso {step} de 3</p>
 *     {step === 1 && (
 *       <div>
 *         <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
 *         <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
 *       </div>
 *     )}
 *     {step === 2 && (
 *       <div>
 *         <select name="plan" value={formData.plan} onChange={handleChange}>
 *           <option value="free">Free</option>
 *           <option value="pro">Pro</option>
 *           <option value="enterprise">Enterprise</option>
 *         </select>
 *         <label>
 *           <input name="newsletter" type="checkbox" checked={formData.newsletter} onChange={handleChange} />
 *           Recibir newsletter
 *         </label>
 *       </div>
 *     )}
 *     {step === 3 && (
 *       <div>
 *         <p>Nombre: {formData.nombre}</p>
 *         <p>Email: {formData.email}</p>
 *         <p>Plan: {formData.plan}</p>
 *         <p>Newsletter: {formData.newsletter ? "Sí" : "No"}</p>
 *       </div>
 *     )}
 *     <div>
 *       {step > 1 && <button onClick={() => setStep(s => s - 1)}>Atrás</button>}
 *       {step < 3 ? (
 *         <button onClick={() => setStep(s => s + 1)} disabled={!puedeAvanzar}>Siguiente</button>
 *       ) : (
 *         <button onClick={() => alert(JSON.stringify(formData, null, 2))}>Confirmar</button>
 *       )}
 *     </div>
 *   </div>
 * );
 *
 *
 * // 5D:
 * const [entradas, setEntradas] = useState([
 *   { id: Date.now(), empresa: "", cargo: "", años: 0 },
 * ]);
 * const [error, setError] = useState("");
 *
 * const totalAños = entradas.reduce((sum, e) => sum + Number(e.años), 0);
 *
 * function agregar() {
 *   setEntradas(prev => [...prev, { id: Date.now(), empresa: "", cargo: "", años: 0 }]);
 * }
 *
 * function quitar(id) {
 *   setEntradas(prev => prev.filter(e => e.id !== id));
 * }
 *
 * function actualizar(id, campo, valor) {
 *   setEntradas(prev => prev.map(e => e.id === id ? { ...e, [campo]: valor } : e));
 * }
 *
 * function handleSubmit(e) {
 *   e.preventDefault();
 *   const incompleta = entradas.some(e => !e.empresa.trim() || !e.cargo.trim());
 *   if (incompleta) { setError("Completa todos los campos"); return; }
 *   setError("");
 *   alert(JSON.stringify(entradas, null, 2));
 * }
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     {entradas.map(entrada => (
 *       <div key={entrada.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
 *         <input placeholder="Empresa" value={entrada.empresa}
 *           onChange={e => actualizar(entrada.id, "empresa", e.target.value)} />
 *         <input placeholder="Cargo" value={entrada.cargo}
 *           onChange={e => actualizar(entrada.id, "cargo", e.target.value)} />
 *         <input type="number" placeholder="Años" value={entrada.años}
 *           onChange={e => actualizar(entrada.id, "años", e.target.value)} />
 *         {entradas.length > 1 && (
 *           <button type="button" onClick={() => quitar(entrada.id)}>✕ Quitar</button>
 *         )}
 *       </div>
 *     ))}
 *     <button type="button" onClick={agregar}>+ Agregar experiencia</button>
 *     <p>Total de años: {totalAños}</p>
 *     {error && <p style={{ color: "red" }}>{error}</p>}
 *     <button type="submit">Enviar</button>
 *   </form>
 * );
 */
