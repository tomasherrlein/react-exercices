# Custom Hooks — Extraer y reutilizar lógica

---

## El problema que resuelve

Imagina que tienes 5 componentes y todos hacen fetch a una API. En cada uno escribes: `useState` para loading, `useState` para error, `useState` para data, `useEffect` para el fetch, cleanup para la race condition...

Eso es **copiar y pegar lógica**. Si mañana necesitas agregar retry o cache, tienes que cambiar 5 archivos.

Los custom hooks extraen esa lógica reutilizable en una función separada. Escribes una vez, usas en todas partes.

---

## La analogía: Recetas de cocina

Un componente es como un cocinero. Un custom hook es como una **receta** que cualquier cocinero puede seguir.

Sin receta: cada cocinero memoriza sus propios pasos (código duplicado).
Con receta: todos siguen los mismos pasos, y si la receta mejora, todos se benefician.

```jsx
// Sin custom hook — cada componente repite todo
function PaginaUsuarios() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => { /* fetch... */ }, [])
  // ... 15 líneas de lógica
}

// Con custom hook — una línea
function PaginaUsuarios() {
  const { data, loading, error } = useFetch('/api/users')
  // ... solo la UI
}
```

---

## Reglas de los custom hooks

### 1. El nombre SIEMPRE empieza con "use"

```jsx
// ❌ React no sabe que es un hook — las reglas de hooks no aplican
function fetchData(url) { ... }

// ✅ React sabe que es un hook
function useFetch(url) { ... }
```

### 2. Puede usar otros hooks dentro

Un custom hook puede usar `useState`, `useEffect`, `useRef`, u otros custom hooks. Eso es lo que lo hace "hook".

### 3. Cada componente que lo usa tiene su PROPIA copia del estado

```jsx
function useContador() {
  const [count, setCount] = useState(0)
  return { count, increment: () => setCount(c => c + 1) }
}

// Cada componente tiene su propio count independiente
function BotonA() {
  const { count, increment } = useContador() // count propio de BotonA
}
function BotonB() {
  const { count, increment } = useContador() // count propio de BotonB
}
```

Los custom hooks comparten **lógica**, no **estado**.

---

## Cómo crear un custom hook: paso a paso

### Paso 1: Identifica la lógica repetida

```jsx
// Este patrón se repite en 3 componentes
const [valor, setValor] = useState(localStorage.getItem('key') ?? defaultValue)

useEffect(() => {
  localStorage.setItem('key', valor)
}, [valor])
```

### Paso 2: Extráelo a una función que empiece con "use"

```jsx
function useLocalStorage(key, defaultValue) {
  const [valor, setValor] = useState(
    () => localStorage.getItem(key) ?? defaultValue
  )

  useEffect(() => {
    localStorage.setItem(key, valor)
  }, [key, valor])

  return [valor, setValor]  // misma forma que useState
}
```

### Paso 3: Úsalo como cualquier hook

```jsx
function Configuracion() {
  const [tema, setTema] = useLocalStorage('tema', 'claro')
  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')
  // ... UI
}
```

---

## Patrones comunes de custom hooks

### useFetch — datos de una API

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) { setData(data); setLoading(false) }
      })
      .catch(err => {
        if (!cancelled) { setError(err.message); setLoading(false) }
      })

    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}
```

### useToggle — booleano con toggle

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue(v => !v)
  return [value, toggle]
}

// Uso:
const [visible, toggleVisible] = useToggle()
```

### useDebounce — retrasar un valor

```jsx
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}

// Uso: el valor solo se actualiza 500ms después de que el usuario deja de escribir
const debouncedSearch = useDebounce(searchTerm, 500)
```

---

## Cuándo crear un custom hook

| Situación | ¿Custom hook? |
|---|---|
| La misma lógica con hooks se repite en 2+ componentes | Si |
| Un componente tiene demasiada lógica y poca UI | Si — para separar responsabilidades |
| Quieres testear lógica sin montar un componente | Si |
| Solo necesitas una función helper sin hooks | No — es una función normal |
| Solo se usa en un lugar y es simple | Probablemente no — no abstraigas prematuramente |

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es un custom hook? | Una función que empieza con "use" y usa otros hooks |
| ¿Comparten estado? | No — cada componente tiene su propia copia |
| ¿Cuándo crear uno? | Cuando la misma lógica con hooks se repite, o para separar lógica de UI |
| ¿Qué retorna? | Lo que necesites: un valor, un array `[valor, setter]`, un objeto `{ data, loading }` |
