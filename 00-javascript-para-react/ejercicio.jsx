/**
 * ============================================
 * EJERCICIO 0A — Destructuring (★☆☆)
 * ============================================
 *
 * Objetivo: Practicar destructuring de objetos y arrays.
 *
 * Instrucciones:
 * 1. Usa destructuring de OBJETO para extraer nombre, edad y ciudad de `persona`
 * 2. Usa destructuring de ARRAY para extraer los dos primeros colores de `colores`
 * 3. Crea un componente `UserCard` que reciba props {nombre, edad, ciudad}
 *    usando destructuring en los parámetros
 * 4. El componente debe mostrar: "Ana (28) - Buenos Aires"
 *
 * Datos:
 *   const persona = { nombre: "Ana", edad: 28, ciudad: "Buenos Aires", activo: true };
 *   const colores = ["rojo", "verde", "azul", "amarillo"];
 */

// export default function Ejercicio0A() {
//   const persona = { nombre: "Ana", edad: 28, ciudad: "Buenos Aires", activo: true };
//   const colores = ["rojo", "verde", "azul", "amarillo"];
//
//   // Tu código aquí
// }

/**
 * ============================================
 * EJERCICIO 0B — Spread, Rest e Inmutabilidad (★☆☆)
 * ============================================
 *
 * Objetivo: Crear copias de objetos y arrays sin mutar los originales.
 *
 * Instrucciones:
 * 1. Dado el array `frutas`, creá `masFrutas` agregando "kiwi" al final SIN mutar el original
 * 2. Dado el objeto `config`, creá `nuevaConfig` cambiando `theme` a "dark" SIN mutar
 * 3. Dado el array `numeros`, creá `sinTres` eliminando el 3 SIN mutar (usa .filter)
 * 4. Crea un componente `Button` que reciba `children` y cualquier otra prop (...rest)
 *    y las pase al <button> nativo
 * 5. Renderizá 3 botones: uno disabled, uno con className "primary", uno con onClick que haga alert
 *
 * Datos:
 *   const frutas = ["manzana", "banana", "naranja"];
 *   const config = { theme: "light", language: "es", fontSize: 16 };
 *   const numeros = [1, 2, 3, 4, 5];
 */

// export default function Ejercicio0B() {
//   const frutas = ["manzana", "banana", "naranja"];
//   const config = { theme: "light", language: "es", fontSize: 16 };
//   const numeros = [1, 2, 3, 4, 5];
//
//   // Tu código aquí
// }

/**
 * ============================================
 * EJERCICIO 0C — Métodos de arrays (★★☆)
 * ============================================
 *
 * Objetivo: Usar .map(), .filter(), .find(), .some(), .reduce() para transformar datos.
 *
 * Instrucciones:
 * Dado el array de productos, renderizá:
 * 1. Una lista con TODOS los productos mostrando "nombre - $precio"
 * 2. Una lista solo con productos que cuesten más de $500
 * 3. El nombre del producto con id 3 (usa .find)
 * 4. Un texto que diga "Hay productos caros: Sí/No" (usa .some, > $1000)
 * 5. El precio total de todos los productos (usa .reduce)
 *
 * Datos:
 *   const productos = [
 *     { id: 1, nombre: "Remera", precio: 350 },
 *     { id: 2, nombre: "Zapatillas", precio: 1200 },
 *     { id: 3, nombre: "Pantalón", precio: 800 },
 *     { id: 4, nombre: "Gorra", precio: 250 },
 *     { id: 5, nombre: "Campera", precio: 1500 },
 *   ];
 */

// export default function Ejercicio0C() {
//   const productos = [
//     { id: 1, nombre: "Remera", precio: 350 },
//     { id: 2, nombre: "Zapatillas", precio: 1200 },
//     { id: 3, nombre: "Pantalón", precio: 800 },
//     { id: 4, nombre: "Gorra", precio: 250 },
//     { id: 5, nombre: "Campera", precio: 1500 },
//   ];
//
//   // Tu código aquí
// }

/**
 * ============================================
 * EJERCICIO 0D — Ternarios, && y Optional Chaining (★★☆)
 * ============================================
 *
 * Objetivo: Usar operadores condicionales correctamente en JSX.
 *
 * Instrucciones:
 * Dado un array de usuarios, renderizá una tarjeta por cada uno que muestre:
 * 1. El nombre. Si es admin, mostrar un badge "(Admin)" al lado
 * 2. El email. Si no tiene email, mostrar "Sin email" en gris
 * 3. La ciudad (está en usuario.direccion.ciudad). Usá optional chaining
 *    porque algunos usuarios no tienen dirección. Mostrá "Ciudad desconocida" como fallback
 * 4. Un badge de color: verde si está activo, rojo si no
 * 5. La cantidad de posts. ⚠️ Cuidado: un usuario tiene 0 posts.
 *    Asegurate de NO renderizar "0" suelto en pantalla (usá ternario, no &&)
 *
 * Datos:
 *   const usuarios = [
 *     { id: 1, nombre: "Ana", admin: true, activo: true, email: "ana@mail.com",
 *       direccion: { ciudad: "Buenos Aires" }, posts: 5 },
 *     { id: 2, nombre: "Luis", admin: false, activo: false, email: null,
 *       direccion: null, posts: 0 },
 *     { id: 3, nombre: "María", admin: false, activo: true,
 *       direccion: { ciudad: "Córdoba" }, posts: 12 },
 *   ];
 */

// export default function Ejercicio0D() {
//   const usuarios = [
//     { id: 1, nombre: "Ana", admin: true, activo: true, email: "ana@mail.com",
//       direccion: { ciudad: "Buenos Aires" }, posts: 5 },
//     { id: 2, nombre: "Luis", admin: false, activo: false, email: null,
//       direccion: null, posts: 0 },
//     { id: 3, nombre: "María", admin: false, activo: true,
//       direccion: { ciudad: "Córdoba" }, posts: 12 },
//   ];
//
//   // Tu código aquí
// }

/**
 * ============================================
 * EJERCICIO 0E — Async/Await y Promesas (★★★)
 * ============================================
 *
 * Objetivo: Entender async/await, fetch y Promise.all antes de usarlos en React.
 *
 * NOTA: Este ejercicio es conceptual — no uses useState ni useEffect todavía.
 *       Solo escribí las funciones async. Podés probarlas en la consola del navegador.
 *
 * Instrucciones:
 * 1. Escribí una función `fetchUser(id)` que haga fetch a
 *    `https://jsonplaceholder.typicode.com/users/${id}` y retorne el JSON parseado.
 *    Debe manejar errores con try/catch.
 *
 * 2. Escribí una función `fetchUserAndPosts(id)` que haga fetch EN PARALELO
 *    (Promise.all) del usuario y sus posts:
 *    - Usuario: https://jsonplaceholder.typicode.com/users/${id}
 *    - Posts:   https://jsonplaceholder.typicode.com/posts?userId=${id}
 *    Debe retornar { user, posts }.
 *
 * 3. Escribí una función `fetchFirstThreeUsers()` que obtenga los usuarios
 *    con id 1, 2 y 3 EN PARALELO y retorne un array de 3 usuarios.
 *
 * 4. En el componente, mostrá un botón "Cargar" que al hacer click llame a
 *    fetchUser(1) y muestre el resultado con JSON.stringify en un <pre>.
 *    (Usá una variable let resultado y re-renderizá... o simplemente hacé
 *    console.log por ahora — lo vamos a hacer bien con useState en el tema 03).
 */

// export async function fetchUser(id) {
//   // Tu código aquí
// }

// export async function fetchUserAndPosts(id) {
//   // Tu código aquí
// }

// export async function fetchFirstThreeUsers() {
//   // Tu código aquí
// }

// export default function Ejercicio0E() {
//   // Tu código aquí
// }

/**
 * ============================================
 * EJERCICIO 0F — Closures y Callbacks (★★★)
 * ============================================
 *
 * Objetivo: Entender closures porque son la base de cómo funcionan los hooks de React.
 *
 * Instrucciones:
 *
 * 1. Escribí una función `crearContador(inicial)` que retorne un objeto con:
 *    - incrementar(): suma 1 y retorna el nuevo valor
 *    - decrementar(): resta 1 y retorna el nuevo valor
 *    - obtener(): retorna el valor actual
 *    (El valor debe estar "encerrado" en el closure, no accesible desde afuera)
 *
 * 2. Escribí una función `crearSaludo(idioma)` que retorne una función.
 *    - Si idioma es "es" → retorna (nombre) => `Hola ${nombre}`
 *    - Si idioma es "en" → retorna (nombre) => `Hello ${nombre}`
 *    - Si idioma es "pt" → retorna (nombre) => `Olá ${nombre}`
 *    Ejemplo: const saludarEs = crearSaludo("es"); saludarEs("Ana") → "Hola Ana"
 *
 * 3. Escribí una función `crearLimitador(fn, limite)` que retorne una función
 *    que solo ejecuta `fn` las primeras `limite` veces. Después no hace nada.
 *    Ejemplo:
 *      const log3 = crearLimitador(console.log, 3);
 *      log3("a"); // imprime "a"
 *      log3("b"); // imprime "b"
 *      log3("c"); // imprime "c"
 *      log3("d"); // no hace nada
 *
 * 4. En el componente, usá crearContador y mostrá el valor en pantalla.
 *    Agregá botones +1 y -1 que llamen a incrementar/decrementar.
 *    ⚠️ Vas a notar que la pantalla NO se actualiza aunque el valor cambie.
 *    Eso es porque sin useState, React no sabe que debe re-renderizar.
 *    Dejá un comentario explicando POR QUÉ no se actualiza.
 */

// export function crearContador(inicial) {
//   // Tu código aquí
// }

// export function crearSaludo(idioma) {
//   // Tu código aquí
// }

// export function crearLimitador(fn, limite) {
//   // Tu código aquí
// }

// export default function Ejercicio0F() {
//   // Tu código aquí
// }

/**
 * ============================================
 * SOLUCIONES (no mirar antes de intentar!)
 * ============================================
 */

/*
 * --- SOLUCIÓN 0A ---
 *
 * function UserCard({ nombre, edad, ciudad }) {
 *   return <p>{nombre} ({edad}) - {ciudad}</p>;
 * }
 *
 * export default function Ejercicio0A() {
 *   const persona = { nombre: "Ana", edad: 28, ciudad: "Buenos Aires", activo: true };
 *   const colores = ["rojo", "verde", "azul", "amarillo"];
 *
 *   // 1. Destructuring de objeto
 *   const { nombre, edad, ciudad } = persona;
 *
 *   // 2. Destructuring de array
 *   const [primero, segundo] = colores;
 *
 *   return (
 *     <div>
 *       <h2>Destructuring</h2>
 *       <p>Nombre: {nombre}, Edad: {edad}, Ciudad: {ciudad}</p>
 *       <p>Primeros colores: {primero}, {segundo}</p>
 *       <UserCard nombre={persona.nombre} edad={persona.edad} ciudad={persona.ciudad} />
 *     </div>
 *   );
 * }
 */

/*
 * --- SOLUCIÓN 0B ---
 *
 * function Button({ children, ...rest }) {
 *   return <button {...rest}>{children}</button>;
 * }
 *
 * export default function Ejercicio0B() {
 *   const frutas = ["manzana", "banana", "naranja"];
 *   const config = { theme: "light", language: "es", fontSize: 16 };
 *   const numeros = [1, 2, 3, 4, 5];
 *
 *   // 1. Agregar sin mutar
 *   const masFrutas = [...frutas, "kiwi"];
 *
 *   // 2. Cambiar propiedad sin mutar
 *   const nuevaConfig = { ...config, theme: "dark" };
 *
 *   // 3. Eliminar sin mutar
 *   const sinTres = numeros.filter(n => n !== 3);
 *
 *   return (
 *     <div>
 *       <h2>Spread e Inmutabilidad</h2>
 *       <p>Frutas original: {frutas.join(", ")}</p>
 *       <p>Más frutas: {masFrutas.join(", ")}</p>
 *       <p>Config original: {JSON.stringify(config)}</p>
 *       <p>Nueva config: {JSON.stringify(nuevaConfig)}</p>
 *       <p>Números sin 3: {sinTres.join(", ")}</p>
 *
 *       <Button disabled>Deshabilitado</Button>
 *       <Button className="primary">Primario</Button>
 *       <Button onClick={() => alert("Click!")}>Con onClick</Button>
 *     </div>
 *   );
 * }
 */

/*
 * --- SOLUCIÓN 0C ---
 *
 * export default function Ejercicio0C() {
 *   const productos = [
 *     { id: 1, nombre: "Remera", precio: 350 },
 *     { id: 2, nombre: "Zapatillas", precio: 1200 },
 *     { id: 3, nombre: "Pantalón", precio: 800 },
 *     { id: 4, nombre: "Gorra", precio: 250 },
 *     { id: 5, nombre: "Campera", precio: 1500 },
 *   ];
 *
 *   const caros = productos.filter(p => p.precio > 500);
 *   const producto3 = productos.find(p => p.id === 3);
 *   const hayCaros = productos.some(p => p.precio > 1000);
 *   const total = productos.reduce((sum, p) => sum + p.precio, 0);
 *
 *   return (
 *     <div>
 *       <h2>Todos los productos</h2>
 *       <ul>
 *         {productos.map(p => (
 *           <li key={p.id}>{p.nombre} - ${p.precio}</li>
 *         ))}
 *       </ul>
 *
 *       <h2>Más de $500</h2>
 *       <ul>
 *         {caros.map(p => (
 *           <li key={p.id}>{p.nombre} - ${p.precio}</li>
 *         ))}
 *       </ul>
 *
 *       <p>Producto con id 3: {producto3.nombre}</p>
 *       <p>Hay productos caros (&gt;$1000): {hayCaros ? "Sí" : "No"}</p>
 *       <p>Total: ${total}</p>
 *     </div>
 *   );
 * }
 */

/*
 * --- SOLUCIÓN 0D ---
 *
 * export default function Ejercicio0D() {
 *   const usuarios = [
 *     { id: 1, nombre: "Ana", admin: true, activo: true, email: "ana@mail.com",
 *       direccion: { ciudad: "Buenos Aires" }, posts: 5 },
 *     { id: 2, nombre: "Luis", admin: false, activo: false, email: null,
 *       direccion: null, posts: 0 },
 *     { id: 3, nombre: "María", admin: false, activo: true,
 *       direccion: { ciudad: "Córdoba" }, posts: 12 },
 *   ];
 *
 *   return (
 *     <div>
 *       <h2>Usuarios</h2>
 *       {usuarios.map(u => (
 *         <div key={u.id} style={{ border: "1px solid #ccc", padding: 12, margin: 8 }}>
 *           <h3>
 *             {u.nombre} {u.admin ? <span style={{ color: "purple" }}>(Admin)</span> : null}
 *           </h3>
 *           <p>{u.email ?? <span style={{ color: "gray" }}>Sin email</span>}</p>
 *           <p>Ciudad: {u.direccion?.ciudad ?? "Ciudad desconocida"}</p>
 *           <span style={{
 *             display: "inline-block",
 *             width: 12,
 *             height: 12,
 *             borderRadius: "50%",
 *             backgroundColor: u.activo ? "green" : "red",
 *           }} />
 *           <span> {u.activo ? "Activo" : "Inactivo"}</span>
 *           <p>
 *             {u.posts > 0 ? `${u.posts} posts` : "Sin posts"}
 *           </p>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */

/*
 * --- SOLUCIÓN 0E ---
 *
 * export async function fetchUser(id) {
 *   try {
 *     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
 *     if (!response.ok) throw new Error(`HTTP ${response.status}`);
 *     return await response.json();
 *   } catch (error) {
 *     console.error("Error fetching user:", error);
 *     return null;
 *   }
 * }
 *
 * export async function fetchUserAndPosts(id) {
 *   try {
 *     const [userRes, postsRes] = await Promise.all([
 *       fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
 *       fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`),
 *     ]);
 *     const [user, posts] = await Promise.all([userRes.json(), postsRes.json()]);
 *     return { user, posts };
 *   } catch (error) {
 *     console.error("Error:", error);
 *     return null;
 *   }
 * }
 *
 * export async function fetchFirstThreeUsers() {
 *   const users = await Promise.all([
 *     fetchUser(1),
 *     fetchUser(2),
 *     fetchUser(3),
 *   ]);
 *   return users;
 * }
 *
 * export default function Ejercicio0E() {
 *   const handleClick = async () => {
 *     const user = await fetchUser(1);
 *     console.log("Usuario:", user);
 *     // Sin useState, no podemos mostrar esto en pantalla de forma reactiva.
 *     // Lo veremos en el tema 03-useState + 06-useEffect
 *   };
 *
 *   return (
 *     <div>
 *       <h2>Async/Await</h2>
 *       <p>Abrí la consola del navegador para ver los resultados</p>
 *       <button onClick={handleClick}>Cargar usuario 1</button>
 *     </div>
 *   );
 * }
 */

/*
 * --- SOLUCIÓN 0F ---
 *
 * export function crearContador(inicial = 0) {
 *   let count = inicial;
 *   return {
 *     incrementar: () => ++count,
 *     decrementar: () => --count,
 *     obtener: () => count,
 *   };
 * }
 *
 * export function crearSaludo(idioma) {
 *   const saludos = { es: "Hola", en: "Hello", pt: "Olá" };
 *   const saludo = saludos[idioma] || "Hi";
 *   return (nombre) => `${saludo} ${nombre}`;
 * }
 *
 * export function crearLimitador(fn, limite) {
 *   let llamadas = 0;
 *   return (...args) => {
 *     if (llamadas < limite) {
 *       llamadas++;
 *       return fn(...args);
 *     }
 *   };
 * }
 *
 * // Creamos el contador FUERA del componente para que no se recree en cada render
 * const miContador = crearContador(0);
 *
 * export default function Ejercicio0F() {
 *   return (
 *     <div>
 *       <h2>Closures</h2>
 *       <p>Valor: {miContador.obtener()}</p>
 *       <button onClick={() => {
 *         miContador.incrementar();
 *         console.log("Valor actual:", miContador.obtener());
 *         // ⚠️ La pantalla NO se actualiza porque React no sabe que algo cambió.
 *         // Sin useState, React no tiene forma de saber que debe re-renderizar.
 *         // El valor SÍ cambia internamente (mirá la consola), pero la UI queda congelada.
 *         // Esto es exactamente lo que useState resuelve — le avisa a React
 *         // "hey, algo cambió, sacá una foto nueva del componente".
 *       }}>+1</button>
 *       <button onClick={() => {
 *         miContador.decrementar();
 *         console.log("Valor actual:", miContador.obtener());
 *       }}>-1</button>
 *     </div>
 *   );
 * }
 */
