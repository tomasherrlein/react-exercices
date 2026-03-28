# JSX — No es HTML, es JavaScript disfrazado

---

## El problema que resuelve

Antes de React, para crear una interfaz tenías que escribir HTML en un archivo y luego manipularlo con JavaScript usando `document.createElement`, `element.innerHTML`, etc. Esto separaba la estructura de la lógica y era difícil de mantener.

JSX te permite escribir la estructura y la lógica **juntas** en un solo lugar. Parece HTML, pero en realidad es JavaScript.

---

## La analogía: Un traductor

Imagina que tienes un traductor que convierte español a inglés. Tú escribes en español (JSX) y el traductor lo convierte a inglés (JavaScript).

```jsx
// Tú escribes esto (JSX):
<h1 className="titulo">Hola {nombre}</h1>

// El traductor (Babel/compilador) lo convierte a esto (JavaScript):
React.createElement("h1", { className: "titulo" }, "Hola ", nombre)
```

No necesitas escribir `React.createElement` nunca — JSX lo hace por ti. Pero saber que es JavaScript por debajo explica todas las "rarezas".

---

## Las diferencias con HTML (y por qué existen)

### 1. `className` en vez de `class`

```jsx
// ❌ HTML: class
<div class="contenedor">

// ✅ JSX: className — porque "class" es palabra reservada en JavaScript
<div className="contenedor">
```

`class` en JavaScript se usa para crear clases (`class MiClase {}`). Como JSX es JavaScript, no puede usar `class` como atributo.

### 2. `htmlFor` en vez de `for`

```jsx
// ❌ HTML: for
<label for="email">

// ✅ JSX: htmlFor — porque "for" es palabra reservada (for loops)
<label htmlFor="email">
```

### 3. Etiquetas siempre cerradas

```jsx
// ❌ HTML permite esto:
<img src="foto.jpg">
<input type="text">
<br>

// ✅ JSX exige cerrar toda etiqueta:
<img src="foto.jpg" />
<input type="text" />
<br />
```

JSX es más estricto que HTML. Si no cierras una etiqueta, el compilador no sabe dónde termina.

### 4. Atributos en camelCase

```jsx
// ❌ HTML: todo en minúsculas
<button onclick="..." tabindex="1">

// ✅ JSX: camelCase (porque son propiedades de JavaScript)
<button onClick={...} tabIndex={1}>
```

### 5. `style` es un objeto, no un string

```jsx
// ❌ HTML: string
<div style="color: red; font-size: 16px">

// ✅ JSX: objeto con propiedades en camelCase
<div style={{ color: "red", fontSize: "16px" }}>
//          ^^                                ^^
//    primer {} = "estoy en JavaScript"
//    segundo {} = el objeto de estilos
```

---

## Expresiones en JSX: las llaves `{}`

Todo lo que va entre `{}` en JSX se evalúa como JavaScript:

```jsx
// Variables
<h1>{nombre}</h1>

// Operaciones
<p>{precio * 1.21}</p>

// Llamadas a funciones
<p>{nombre.toUpperCase()}</p>

// Ternarios (if inline)
<p>{edad >= 18 ? "Adulto" : "Menor"}</p>
```

### Lo que NO puedes poner en `{}`

```jsx
// ❌ if/else no es una expresión (no devuelve un valor)
<p>{if (activo) "Sí"}</p>

// ❌ for no es una expresión
<ul>{for (let i = 0; i < 3; i++) <li>{i}</li>}</ul>

// ✅ Usa ternarios para condicionales
<p>{activo ? "Sí" : "No"}</p>

// ✅ Usa .map() para listas
<ul>{[0, 1, 2].map(i => <li key={i}>{i}</li>)}</ul>
```

**Regla:** dentro de `{}` solo puedes poner cosas que devuelvan un valor (expresiones). `if`, `for`, `while` son declaraciones — no devuelven nada.

---

## Renderizado condicional

Hay 3 formas comunes de mostrar algo condicionalmente:

### Ternario — cuando hay dos opciones

```jsx
{loggedIn ? <Dashboard /> : <Login />}
```

### `&&` — cuando solo hay una opción (mostrar o nada)

```jsx
{error && <p className="error">{error}</p>}
```

**Cuidado con `&&` y números:** si `count` es `0`, renderiza el texto "0":
```jsx
// ❌ Muestra "0" cuando count es 0
{count && <Badge>{count}</Badge>}

// ✅ Comparación explícita
{count > 0 ? <Badge>{count}</Badge> : null}
```

### Variable + if — para lógica compleja

```jsx
function Status({ estado }) {
  let icono;
  if (estado === "ok") icono = "✅";
  else if (estado === "error") icono = "❌";
  else icono = "⏳";

  return <span>{icono}</span>;
}
```

---

## Un solo elemento raíz

JSX debe retornar un solo elemento. Si necesitas retornar varios, envuélvelos:

```jsx
// ❌ Error: dos elementos raíz
return (
  <h1>Título</h1>
  <p>Párrafo</p>
)

// ✅ Opción 1: un div contenedor
return (
  <div>
    <h1>Título</h1>
    <p>Párrafo</p>
  </div>
)

// ✅ Opción 2: Fragment (no agrega nodo al DOM)
return (
  <>
    <h1>Título</h1>
    <p>Párrafo</p>
  </>
)
```

---

## Resumen rápido

| HTML | JSX | Por qué |
|---|---|---|
| `class` | `className` | `class` es palabra reservada en JS |
| `for` | `htmlFor` | `for` es palabra reservada en JS |
| `onclick` | `onClick` | Atributos en camelCase |
| `<img>` | `<img />` | Toda etiqueta debe cerrarse |
| `style="color: red"` | `style={{ color: "red" }}` | Objeto JS, no string |
| `if` en template | `{condición ? a : b}` | Solo expresiones en `{}` |
