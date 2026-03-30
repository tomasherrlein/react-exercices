# 00 — JavaScript que necesitás para React

## Por qué esto primero

React es JavaScript. Si no tenés claros estos conceptos, cada tutorial de React va a parecer magia negra. Esta sección cubre **solo** lo que React usa constantemente — no es un curso completo de JS.

> **Analogía:** Aprender React sin saber estos conceptos de JS es como intentar cocinar sin saber usar cuchillo, fuego ni sartén. Podés seguir la receta, pero no vas a entender *por qué* hacés lo que hacés.

---

## 1. Destructuring (desestructuración)

React lo usa en **cada componente** para leer props y estado.

### En objetos

```js
const usuario = { nombre: "Ana", edad: 28, ciudad: "Buenos Aires" };

// ❌ Sin destructuring — repetitivo
const nombre = usuario.nombre;
const edad = usuario.edad;

// ✅ Con destructuring — limpio
const { nombre, edad } = usuario;

// ✅ Con valor por defecto
const { nombre, rol = "usuario" } = usuario; // rol será "usuario" si no existe

// ✅ Renombrando
const { nombre: userName } = usuario; // userName === "Ana"
```

### En arrays

```js
const colores = ["rojo", "verde", "azul"];

// ✅ Destructuring por posición
const [primero, segundo] = colores; // "rojo", "verde"

// ✅ Saltar elementos
const [, , tercero] = colores; // "azul"
```

**En React lo vas a ver así:**

```jsx
// Props (objeto)
function Saludo({ nombre, edad }) {
  return <p>Hola {nombre}, tenés {edad} años</p>;
}

// useState (array)
const [count, setCount] = useState(0);
```

---

## 2. Spread y Rest (`...`)

### Spread: "desparramar" elementos

```js
// En arrays — crear copias con cambios
const frutas = ["manzana", "banana"];
const masFrutas = [...frutas, "naranja"]; // ["manzana", "banana", "naranja"]

// En objetos — crear copias con cambios (CLAVE para estado en React)
const usuario = { nombre: "Ana", edad: 28 };
const actualizado = { ...usuario, edad: 29 }; // { nombre: "Ana", edad: 29 }
```

### Rest: "juntar lo que sobra"

```js
// En funciones
function suma(...numeros) {
  return numeros.reduce((a, b) => a + b, 0);
}
suma(1, 2, 3); // 6

// En destructuring
const { nombre, ...resto } = { nombre: "Ana", edad: 28, ciudad: "BA" };
// nombre = "Ana", resto = { edad: 28, ciudad: "BA" }
```

**En React lo vas a ver así:**

```jsx
// Pasar todas las props a un hijo
function Button({ children, ...rest }) {
  return <button {...rest}>{children}</button>;
}

// Actualizar estado sin mutar
setUsuario(prev => ({ ...prev, edad: prev.edad + 1 }));
```

> **Regla de oro en React:** Nunca mutes un objeto o array del estado directamente. Siempre creá una copia con spread.

---

## 3. Arrow functions (funciones flecha)

```js
// Función tradicional
function sumar(a, b) {
  return a + b;
}

// Arrow function
const sumar = (a, b) => a + b;

// Con un solo parámetro, sin paréntesis
const doble = x => x * 2;

// Con cuerpo de múltiples líneas, necesitás {} y return
const procesar = (x) => {
  const resultado = x * 2;
  return resultado + 1;
};

// ⚠️ Retornar un objeto literal: envolver en ()
const crearUsuario = (nombre) => ({ nombre, activo: true });
```

**En React lo vas a ver así:**

```jsx
// Componentes
const Saludo = ({ nombre }) => <h1>Hola {nombre}</h1>;

// Handlers de eventos
<button onClick={() => setCount(c => c + 1)}>+1</button>

// .map() para listas
{usuarios.map(u => <li key={u.id}>{u.nombre}</li>)}
```

---

## 4. Template literals (plantillas de texto)

```js
const nombre = "Ana";

// ❌ Concatenación clásica
const saludo = "Hola " + nombre + ", bienvenida!";

// ✅ Template literal — backticks + ${}
const saludo = `Hola ${nombre}, bienvenida!`;

// ✅ Multilínea
const html = `
  <div>
    <h1>${nombre}</h1>
  </div>
`;

// ✅ Expresiones dentro
const mensaje = `Tenés ${items.length} items (${items.length === 0 ? "vacío" : "hay cosas"})`;
```

**En React:** lo usás constantemente en className dinámicos y estilos:

```jsx
<div className={`card ${activo ? "card--active" : ""}`}>
```

---

## 5. Métodos de arrays: `.map()`, `.filter()`, `.find()`, `.some()`, `.reduce()`

Estos son el pan de cada día en React. No se usa `for` casi nunca.

### `.map()` — transforma cada elemento

```js
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2); // [2, 4, 6]

const usuarios = [{ nombre: "Ana" }, { nombre: "Luis" }];
const nombres = usuarios.map(u => u.nombre); // ["Ana", "Luis"]
```

### `.filter()` — filtra elementos que cumplen una condición

```js
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(n => n % 2 === 0); // [2, 4]

const usuarios = [
  { nombre: "Ana", activo: true },
  { nombre: "Luis", activo: false },
];
const activos = usuarios.filter(u => u.activo); // [{ nombre: "Ana", activo: true }]
```

### `.find()` — encuentra el primer elemento que cumple

```js
const usuarios = [
  { id: 1, nombre: "Ana" },
  { id: 2, nombre: "Luis" },
];
const luis = usuarios.find(u => u.id === 2); // { id: 2, nombre: "Luis" }
```

### `.some()` y `.every()` — verificar condiciones

```js
const edades = [15, 22, 30];
edades.some(e => e >= 18);  // true (al menos uno es mayor)
edades.every(e => e >= 18); // false (no todos son mayores)
```

### `.reduce()` — acumular un resultado

```js
const precios = [100, 200, 50];
const total = precios.reduce((acum, precio) => acum + precio, 0); // 350
```

**En React:**

```jsx
// .map() para renderizar listas
{usuarios.map(u => <UserCard key={u.id} user={u} />)}

// .filter() + .map() para filtrar y renderizar
{usuarios
  .filter(u => u.activo)
  .map(u => <UserCard key={u.id} user={u} />)
}

// .find() para buscar un elemento
const seleccionado = productos.find(p => p.id === selectedId);

// .reduce() para totales
const total = carrito.reduce((sum, item) => sum + item.precio * item.qty, 0);
```

---

## 6. Operador ternario y evaluación corta

### Ternario: `condición ? siVerdadero : siFalso`

```js
const mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";
```

### AND lógico: `condición && valor`

```js
// Si condición es truthy, retorna valor. Si es falsy, retorna condición.
const resultado = true && "hola";  // "hola"
const resultado = false && "hola"; // false

// ⚠️ Cuidado con 0 y "" — son falsy
const resultado = 0 && "hola"; // 0 (no "hola"!)
```

### Nullish coalescing: `??`

```js
// Solo usa el fallback si el valor es null o undefined (NO 0, NO "")
const nombre = null ?? "Anónimo";     // "Anónimo"
const cantidad = 0 ?? 10;             // 0 (respeta el 0!)
const cantidad = undefined ?? 10;     // 10
```

### Optional chaining: `?.`

```js
const usuario = { direccion: { calle: "Av. Corrientes" } };

// ❌ Sin optional chaining — explota si direccion es null
const calle = usuario.direccion.calle;

// ✅ Con optional chaining — retorna undefined en vez de explotar
const calle = usuario?.direccion?.calle; // "Av. Corrientes"
const zip = usuario?.direccion?.zip;     // undefined (no explota)
```

**En React:**

```jsx
// Ternario para renderizado condicional
{isLoading ? <Spinner /> : <Content />}

// && para "mostrar si existe"
{error && <ErrorMessage text={error} />}

// ?? para valores por defecto
<h1>{usuario?.nombre ?? "Anónimo"}</h1>

// ⚠️ Cuidado con && y números
{count && <Badge>{count}</Badge>}     // ❌ Si count=0, renderiza "0"
{count > 0 ? <Badge>{count}</Badge> : null} // ✅ Seguro
```

---

## 7. Módulos: `import` / `export`

React usa módulos ES6 para organizar todo en archivos separados.

### Named exports (múltiples por archivo)

```js
// utils.js
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;

// otro-archivo.js
import { sumar, restar } from "./utils";
import { sumar as add } from "./utils"; // renombrar
```

### Default export (uno por archivo)

```js
// Button.jsx
export default function Button({ children }) {
  return <button>{children}</button>;
}

// otro-archivo.jsx
import Button from "./Button"; // el nombre lo elegís vos
import MiBoton from "./Button"; // también funciona
```

### Cuándo usar cuál

```
Default export → componentes (un componente principal por archivo)
Named exports  → utilidades, constantes, hooks, tipos
```

**En React:**

```jsx
// Componente (default)
import App from "./App";

// Hooks de React (named)
import { useState, useEffect } from "react";

// Tu custom hook (named o default, vos elegís)
import { useDebounce } from "./hooks/useDebounce";
```

---

## 8. Promesas y `async/await`

Para fetch de datos — lo vas a usar con `useEffect` y React Query.

### Promesas con `.then()`

```js
fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### async/await (más legible)

```js
async function obtenerUsuarios() {
  try {
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### Paralelo con `Promise.all()`

```js
// ❌ Secuencial — cada uno espera al anterior
const users = await fetch("/api/users").then(r => r.json());
const posts = await fetch("/api/posts").then(r => r.json());

// ✅ Paralelo — ambos al mismo tiempo
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
]);
```

**En React:**

```jsx
useEffect(() => {
  // ⚠️ useEffect no puede ser async directamente
  const fetchData = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };
  fetchData();
}, []);
```

---

## 9. Inmutabilidad

El concepto más importante para React. React detecta cambios comparando referencias (`===`). Si mutás un objeto, la referencia no cambia y React no re-renderiza.

### Arrays

```js
const items = [1, 2, 3];

// ❌ MUTAR — React no detecta el cambio
items.push(4);

// ✅ NUEVA COPIA — React detecta el cambio
const nuevos = [...items, 4];             // agregar
const sinDos = items.filter(i => i !== 2); // quitar
const dobles = items.map(i => i * 2);     // transformar
```

### Objetos

```js
const user = { nombre: "Ana", edad: 28 };

// ❌ MUTAR
user.edad = 29;

// ✅ NUEVA COPIA
const userActualizado = { ...user, edad: 29 };
```

### Objetos anidados

```js
const state = {
  user: { nombre: "Ana", direccion: { ciudad: "BA" } },
  items: [1, 2, 3],
};

// ✅ Copiar cada nivel que cambiás
const nuevoState = {
  ...state,
  user: {
    ...state.user,
    direccion: {
      ...state.user.direccion,
      ciudad: "Córdoba",
    },
  },
};
```

> **Analogía:** Mutar es como editar una foto original — perdés la versión anterior. Inmutabilidad es hacer una copia, editar la copia, y guardarla como versión nueva. React compara la foto vieja con la nueva para saber qué cambió.

---

## 10. Closures (clausuras)

Una función "recuerda" las variables del scope donde fue creada, incluso después de que ese scope terminó.

```js
function crearContador() {
  let count = 0; // esta variable queda "encerrada"
  return {
    incrementar: () => ++count,
    obtener: () => count,
  };
}

const contador = crearContador();
contador.incrementar(); // 1
contador.incrementar(); // 2
contador.obtener();     // 2
```

**Por qué importa en React:**

Los hooks como `useState` y `useEffect` usan closures. A veces el closure "atrapa" un valor viejo:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ❌ Este closure capturó count = 0 en el primer render
    setTimeout(() => {
      setCount(count + 1); // siempre suma 1 al valor viejo
    }, 1000);
  };

  const handleClickCorrect = () => {
    // ✅ Función updater — siempre usa el valor actual
    setTimeout(() => {
      setCount(c => c + 1); // c es siempre el valor más reciente
    }, 1000);
  };
}
```

---

## Resumen: lo mínimo indispensable

| Concepto | Para qué en React |
|----------|-------------------|
| Destructuring | Leer props y useState |
| Spread/Rest | Copiar estado, pasar props |
| Arrow functions | Componentes, handlers, callbacks |
| Template literals | Clases dinámicas, strings |
| `.map()/.filter()` | Renderizar y filtrar listas |
| Ternario / `&&` / `??` | Renderizado condicional |
| `import`/`export` | Organizar componentes y hooks |
| `async/await` | Fetch de datos |
| Inmutabilidad | Actualizar estado correctamente |
| Closures | Entender por qué los hooks "recuerdan" |

---

**Consejo:** No necesitás dominar todo esto antes de empezar React. Pero cuando algo no tenga sentido en un componente, probablemente sea uno de estos conceptos de JS. Volvé acá como referencia.
