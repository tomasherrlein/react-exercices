# useRef — La caja secreta que React no vigila

---

## El problema que resuelve

A veces necesitas guardar algo entre renders que **no debe causar un re-render**. O necesitas acceder directamente a un elemento del DOM (hacer focus en un input, medir tamaños, scroll, etc.).

`useState` no sirve para esto porque cada cambio de estado dispara un re-render. `useRef` es la alternativa: guarda un valor que persiste entre renders pero que React ignora completamente.

---

## La analogía: Un cajón secreto

Imagina que tu componente es un escritorio. Los `useState` son las cosas que están encima del escritorio — visibles para todos (React las observa y actualiza la pantalla cuando cambian).

`useRef` es un **cajón secreto**: puedes guardar y cambiar cosas ahí, pero nadie se entera. La pantalla no se actualiza cuando cambias el contenido del cajón.

---

## Los 2 usos de useRef

### Uso 1: Acceder al DOM

React maneja el DOM por ti, pero a veces necesitas tocarlo directamente: dar focus a un input, hacer scroll, medir dimensiones, integrar librerías que manipulan el DOM.

```jsx
function FormularioBusqueda() {
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()  // accede directamente al <input> del DOM
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Buscar..." />
      <button onClick={handleClick}>Enfocar</button>
    </div>
  )
}
```

El flujo:
1. Creas la ref: `useRef(null)` — empieza vacía
2. La conectas al elemento: `ref={inputRef}` — React llena `.current` con el nodo DOM
3. La usas: `inputRef.current.focus()` — accedes al nodo real

### Uso 2: Guardar valores que no causan re-render

```jsx
function Cronometro() {
  const [segundos, setSegundos] = useState(0)
  const intervalRef = useRef(null)  // guarda el ID del intervalo

  function iniciar() {
    intervalRef.current = setInterval(() => {
      setSegundos(s => s + 1)
    }, 1000)
  }

  function parar() {
    clearInterval(intervalRef.current)  // usa el ID guardado
  }

  return (
    <div>
      <p>{segundos}s</p>
      <button onClick={iniciar}>Iniciar</button>
      <button onClick={parar}>Parar</button>
    </div>
  )
}
```

¿Por qué no usar `useState` para el ID del intervalo? Porque no necesitas que la pantalla se actualice cuando cambia el ID. Sería un re-render desperdiciado.

---

## useRef vs useState — Cuándo usar cuál

| Pregunta | useState | useRef |
|---|---|---|
| ¿El cambio debe actualizar la pantalla? | Si | No |
| ¿Persiste entre renders? | Si | Si |
| ¿Dispara re-render al cambiar? | Si | No |
| ¿React "lo vigila"? | Si | No |

**Regla simple:** Si el usuario necesita VER el cambio → `useState`. Si es un dato interno que no afecta la UI → `useRef`.

### Ejemplos

```jsx
// ✅ useState — el usuario ve el contador cambiar
const [count, setCount] = useState(0)

// ✅ useRef — guardar un timer ID (el usuario no lo ve)
const timerRef = useRef(null)

// ✅ useRef — contar renders sin causar más renders
const renderCount = useRef(0)
renderCount.current += 1  // se incrementa en cada render sin causar otro

// ✅ useRef — guardar el valor previo de algo
const prevName = useRef(name)
useEffect(() => {
  prevName.current = name  // se actualiza después del render
}, [name])
```

---

## La trampa: modificar .current NO re-renderiza

```jsx
// ❌ Esto NO funciona — la pantalla no se actualiza
const countRef = useRef(0)

function handleClick() {
  countRef.current += 1
  // La pantalla sigue mostrando el valor viejo
  // React no sabe que cambió
}

return <p>Clicks: {countRef.current}</p>  // nunca se actualiza
```

Si necesitas que la pantalla muestre el valor, usa `useState`.

---

## Acceder al DOM: casos comunes

### Focus automático

```jsx
function Login() {
  const emailRef = useRef(null)

  useEffect(() => {
    emailRef.current.focus()  // focus al montar
  }, [])

  return <input ref={emailRef} type="email" />
}
```

### Scroll a un elemento

```jsx
function Chat({ messages }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div>
      {messages.map(msg => <p key={msg.id}>{msg.text}</p>)}
      <div ref={bottomRef} />  {/* elemento invisible al final */}
    </div>
  )
}
```

### Medir dimensiones

```jsx
function MedirCaja() {
  const cajaRef = useRef(null)
  const [ancho, setAncho] = useState(0)

  useEffect(() => {
    setAncho(cajaRef.current.getBoundingClientRect().width)
  }, [])

  return (
    <div ref={cajaRef}>
      <p>Esta caja mide {ancho}px de ancho</p>
    </div>
  )
}
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es useRef? | Una caja que guarda un valor entre renders sin causar re-render |
| ¿Cuándo usarlo para DOM? | Focus, scroll, medir, integrar librerías externas |
| ¿Cuándo usarlo para valores? | Timer IDs, valores previos, contadores internos, cualquier cosa que no deba re-renderizar |
| ¿Qué NO hacer? | No uses `.current` para mostrar datos en la UI — usa `useState` |
