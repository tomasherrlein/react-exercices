/**
 * EJERCICIO 2 — Componentes y Props
 *
 * Tienes una app que muestra una lista de películas, pero toda la UI está
 * en un solo componente gigante. Tu tarea: descomponerla en componentes
 * más pequeños y reutilizables.
 *
 * PASO 1: Identifica qué partes se repiten o tienen sentido como componente
 * PASO 2: Crea los componentes con las props necesarias
 * PASO 3: Verifica que el resultado visual sea idéntico
 *
 * Reglas:
 * - Cada componente en su propia función
 * - Props claras y bien nombradas
 * - NUNCA modifiques las props dentro del componente
 */

// ❌ ANTES — todo en un componente, difícil de mantener
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

      <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
        <h2>The Dark Knight</h2>
        <p>Director: Christopher Nolan</p>
        <p>Año: 2008</p>
        <span style={{ background: "gold", padding: "2px 8px", borderRadius: "4px" }}>
          ★ 9.0
        </span>
      </div>
    </div>
  );
}


// ✅ DESPUÉS — tu tarea es completar esto:

const peliculas = [
  { id: 1, titulo: "Inception",       director: "Christopher Nolan", año: 2010, rating: 8.8 },
  { id: 2, titulo: "Interstellar",    director: "Christopher Nolan", año: 2014, rating: 8.6 },
  { id: 3, titulo: "The Dark Knight", director: "Christopher Nolan", año: 2008, rating: 9.0 },
];

// TODO: Crea el componente Badge para mostrar el rating
// Props: rating (número)
function Badge({ rating }) {
  return (
    <span style={{ background: "gold", padding: "2px 8px", borderRadius: "4px" }}>
      ★ {rating}
    </span>
  );
}

// TODO: Crea el componente TarjetaPelicula
// Props: titulo, director, año, rating
function TarjetaPelicula({ titulo, director, año, rating }) {
  return(
  <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
        <h2>{titulo}</h2>
        <p>Director: {director}</p>
        <p>Año: {año} </p>
        <Badge rating={rating}/>
  </div>
  )
}

// TODO: Completa el componente App usando los componentes anteriores
export default function AppPeliculas() {
  return (
    <div>
      <h1>Mis películas favoritas</h1>
      {peliculas.map(peli => 
      <TarjetaPelicula key={peli.id} 
      titulo={peli.titulo} 
      director={peli.director }
      año={peli.año}
      rating={peli.rating}/>)}
    </div>
  );
}


/**
 * SOLUCIÓN:
 *
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
 * function App() {
 *   return (
 *     <div>
 *       <h1>Mis películas favoritas</h1>
 *       {peliculas.map(p => (
 *         <TarjetaPelicula
 *           key={p.id}
 *           titulo={p.titulo}
 *           director={p.director}
 *           año={p.año}
 *           rating={p.rating}
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 */
