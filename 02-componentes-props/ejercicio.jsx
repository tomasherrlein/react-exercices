/**
 * EJERCICIO 2 — Componentes y Props
 *
 * Cinco ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 */


// ─────────────────────────────────────────────
// EJERCICIO 2A — Descomponer en componentes (★☆☆)
// ─────────────────────────────────────────────
/**
 * Esta app de películas tiene todo en un solo componente.
 * Tu tarea: descomponerla en componentes reutilizables.
 *
 * PASO 1: Crea un componente Badge que muestre el rating con ★
 * PASO 2: Crea un componente TarjetaPelicula con las props necesarias
 * PASO 3: Completa App usando los componentes + .map() sobre el array
 */

// ❌ ANTES — todo en un componente, código repetido:
function AppAntes() {
  return (
    <div>
      <h1>Mis películas favoritas</h1>

      <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
        <h2>Inception</h2>
        <p>Director: Christopher Nolan</p>
        <p>Año: 2010</p>
        <span style={{ background: "gold", padding: "2px 8px", borderRadius: "4px" }}>
          ★ 8.8
        </span>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
        <h2>Interstellar</h2>
        <p>Director: Christopher Nolan</p>
        <p>Año: 2014</p>
        <span style={{ background: "gold", padding: "2px 8px", borderRadius: "4px" }}>
          ★ 8.6
        </span>
      </div>
    </div>
  );
}

// ✅ Tu tarea — crea los componentes:
const peliculas = [
  { id: 1, titulo: "Inception",       director: "Christopher Nolan", año: 2010, rating: 8.8 },
  { id: 2, titulo: "Interstellar",    director: "Christopher Nolan", año: 2014, rating: 8.6 },
  { id: 3, titulo: "The Dark Knight", director: "Christopher Nolan", año: 2008, rating: 9.0 },
];

// Crea Badge aquí:

// Crea TarjetaPelicula aquí:

// Completa App:
export function AppPeliculas() {
  return (
    <div>
      <h1>Mis películas favoritas</h1>
      {/* Usa .map() sobre peliculas para renderizar TarjetaPelicula */}
    </div>
  );
}


// ─────────────────────────────────────────────
// EJERCICIO 2B — Props por defecto y transformaciones (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un componente Avatar que muestre una imagen de perfil.
 *
 * Props:
 * - name (string, requerido)
 * - imageUrl (string, opcional — default: null)
 * - size (number, opcional — default: 48)
 *
 * Requisitos:
 * 1. Si imageUrl existe → mostrar <img> con width y height = size, borderRadius 50%
 * 2. Si imageUrl es null → mostrar un <div> circular del mismo size con fondo gris (#ccc)
 *    y la primera letra del nombre en mayúscula centrada dentro
 * 3. Debajo de la imagen/placeholder, mostrar el nombre
 */
export function Avatar({ name, imageUrl, size }) {
  // Tu código aquí
}

// Prueba con:
// <Avatar name="Ana García" imageUrl="https://i.pravatar.cc/48" />
// <Avatar name="Luis" />
// <Avatar name="Marta" size={80} imageUrl="https://i.pravatar.cc/80" />


// ─────────────────────────────────────────────
// EJERCICIO 2C — children: componentes contenedor (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea un componente Card que sea un contenedor genérico.
 *
 * Props:
 * - title (string, opcional)
 * - children (lo que va entre las etiquetas)
 * - variant ("default" | "outlined" | "elevated") — default: "default"
 *
 * Estilos por variante:
 * - default:  fondo blanco, borde 1px solid #e0e0e0
 * - outlined: fondo transparente, borde 2px dashed #999
 * - elevated: fondo blanco, sin borde, sombra: 0 2px 8px rgba(0,0,0,0.15)
 *
 * Todos: padding 16px, borderRadius 8px, marginBottom 12px
 *
 * Si title existe, mostrarlo como <h3> arriba del children.
 */
export function Card({ title, children, variant }) {
  // Tu código aquí
}

// Prueba con:
// <Card title="Info"><p>Contenido normal</p></Card>
// <Card variant="outlined"><p>Sin título, borde punteado</p></Card>
// <Card title="Destacado" variant="elevated"><p>Con sombra</p></Card>


// ─────────────────────────────────────────────
// EJERCICIO 2D — Spread operator con props (★★☆)
// ─────────────────────────────────────────────
/**
 * Tienes un array de usuarios. Crea los componentes necesarios para
 * renderizar una lista de tarjetas de contacto.
 *
 * Requisitos:
 * 1. Crea ContactCard que reciba: name, email, phone, department
 * 2. Muestra cada dato en un <p>
 * 3. En el componente padre, usa spread {...user} para pasar las props
 *    en vez de user.name, user.email, etc.
 * 4. Muestra cuántos contactos hay en total con un <p> arriba de la lista
 */
const usuarios = [
  { id: 1, name: "Ana Ruiz",   email: "ana@mail.com",   phone: "+34 612 345 678", department: "Diseño" },
  { id: 2, name: "Carlos Vega", email: "carlos@mail.com", phone: "+34 698 765 432", department: "Dev" },
  { id: 3, name: "Lucía Mora", email: "lucia@mail.com",  phone: "+34 655 111 222", department: "Dev" },
];

// Crea ContactCard aquí:

// Completa DirectorioContactos:
export function DirectorioContactos() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 2E — Composición avanzada (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un sistema de layout reutilizable con 3 componentes:
 *
 * 1. Page: contenedor principal (max-width 800px, margin auto, padding 20px)
 *    Props: children
 *
 * 2. Section: sección con título
 *    Props: title (string), children, collapsible (boolean, default false)
 *    - Si collapsible es true, el título tiene un botón [+]/[-] que muestra/oculta children
 *    - Si collapsible es false, siempre muestra children
 *    - NOTA: para el toggle necesitarás useState — ¡está permitido usarlo!
 *
 * 3. InfoRow: fila de información con label y valor
 *    Props: label (string), value (string | number), highlight (boolean, default false)
 *    - Si highlight es true, el valor se muestra en negrita y color azul
 *
 * El resultado final se usa así:
 *
 * <Page>
 *   <Section title="Datos personales">
 *     <InfoRow label="Nombre" value="Ana" />
 *     <InfoRow label="Rol" value="Admin" highlight />
 *   </Section>
 *   <Section title="Notas" collapsible>
 *     <p>Contenido colapsable</p>
 *   </Section>
 * </Page>
 */
import { useState } from "react";

// Crea Page, Section, InfoRow aquí:


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 2A:
 * function Badge({ rating }) {
 *   return (
 *     <span style={{ background: "gold", padding: "2px 8px", borderRadius: "4px" }}>
 *       ★ {rating}
 *     </span>
 *   );
 * }
 *
 * function TarjetaPelicula({ titulo, director, año, rating }) {
 *   return (
 *     <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
 *       <h2>{titulo}</h2>
 *       <p>Director: {director}</p>
 *       <p>Año: {año}</p>
 *       <Badge rating={rating} />
 *     </div>
 *   );
 * }
 *
 * function AppPeliculas() {
 *   return (
 *     <div>
 *       <h1>Mis películas favoritas</h1>
 *       {peliculas.map(p => (
 *         <TarjetaPelicula key={p.id} titulo={p.titulo} director={p.director}
 *           año={p.año} rating={p.rating} />
 *       ))}
 *     </div>
 *   );
 * }
 *
 *
 * // 2B:
 * function Avatar({ name, imageUrl = null, size = 48 }) {
 *   return (
 *     <div>
 *       {imageUrl ? (
 *         <img src={imageUrl} alt={name}
 *           style={{ width: size, height: size, borderRadius: "50%" }} />
 *       ) : (
 *         <div style={{
 *           width: size, height: size, borderRadius: "50%",
 *           background: "#ccc", display: "flex",
 *           alignItems: "center", justifyContent: "center",
 *           fontSize: size / 2, color: "#fff",
 *         }}>
 *           {name[0].toUpperCase()}
 *         </div>
 *       )}
 *       <p>{name}</p>
 *     </div>
 *   );
 * }
 *
 *
 * // 2C:
 * function Card({ title, children, variant = "default" }) {
 *   const base = { padding: 16, borderRadius: 8, marginBottom: 12 };
 *   const estilos = {
 *     default:  { ...base, background: "#fff", border: "1px solid #e0e0e0" },
 *     outlined: { ...base, background: "transparent", border: "2px dashed #999" },
 *     elevated: { ...base, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" },
 *   };
 *   return (
 *     <div style={estilos[variant]}>
 *       {title && <h3>{title}</h3>}
 *       {children}
 *     </div>
 *   );
 * }
 *
 *
 * // 2D:
 * function ContactCard({ name, email, phone, department }) {
 *   return (
 *     <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8, borderRadius: 4 }}>
 *       <p><strong>{name}</strong></p>
 *       <p>{email}</p>
 *       <p>{phone}</p>
 *       <p>Departamento: {department}</p>
 *     </div>
 *   );
 * }
 *
 * function DirectorioContactos() {
 *   return (
 *     <div>
 *       <p>Total: {usuarios.length} contactos</p>
 *       {usuarios.map(user => <ContactCard key={user.id} {...user} />)}
 *     </div>
 *   );
 * }
 *
 *
 * // 2E:
 * function Page({ children }) {
 *   return <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>{children}</div>;
 * }
 *
 * function Section({ title, children, collapsible = false }) {
 *   const [open, setOpen] = useState(true);
 *   return (
 *     <section style={{ marginBottom: 16 }}>
 *       <h2>
 *         {title}
 *         {collapsible && (
 *           <button onClick={() => setOpen(o => !o)} style={{ marginLeft: 8 }}>
 *             {open ? "[-]" : "[+]"}
 *           </button>
 *         )}
 *       </h2>
 *       {(collapsible ? open : true) && children}
 *     </section>
 *   );
 * }
 *
 * function InfoRow({ label, value, highlight = false }) {
 *   return (
 *     <p>
 *       {label}:{" "}
 *       <span style={{ fontWeight: highlight ? "bold" : "normal", color: highlight ? "blue" : "inherit" }}>
 *         {value}
 *       </span>
 *     </p>
 *   );
 * }
 */
