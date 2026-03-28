# useEffect — Sincronización con el mundo exterior

---

## El problema que resuelve

Tu componente React vive en su burbuja: recibe props, tiene estado, y devuelve JSX. Pero a veces necesitas **conectarte con cosas fuera de React**: una API, el título del navegador, un temporizador, una suscripción a WebSocket, etc.

`useEffect` es el puente entre React y el mundo exterior.

---

## La analogía: El vigilante

Imagina que contratas un vigilante y le das instrucciones:

> "Cuando cambie el **userId**, ve a buscar los datos de ese usuario. Y cuando te diga que ya no lo necesito, cancela la búsqueda."

Eso es exactamente un `useEffect`:

```jsx
useEffect(() => {
  // instrucción: qué hacer
  fetchUser(userId)

  return () => {
    // cancelación: qué hacer al limpiar
    cancelFetch()
  }
}, [userId]) // cuándo reaccionar: cuando userId cambie
```

---

## Anatomía de un useEffect

```jsx
useEffect(() => {
  // 1. EFECTO: código que se ejecuta
  //    → corre después del render

  return () => {
    // 2. CLEANUP (opcional): limpieza
    //    → corre antes del siguiente efecto O al desmontar
  }
}, [dependencia1, dependencia2]) // 3. DEPENDENCIAS: cuándo re-ejecutar
```

### Las 3 variantes del array de dependencias

```jsx
// Variante 1: Sin array → corre en CADA render (raro, casi nunca lo necesitas)
useEffect(() => { ... })

// Variante 2: Array vacío → corre SOLO al montar (una vez)
useEffect(() => { ... }, [])

// Variante 3: Con dependencias → corre al montar + cuando alguna cambie
useEffect(() => { ... }, [userId, filter])
```

---

## Modelo mental correcto: Sincronización, NO ciclo de vida

La trampa más común es pensar en "montado/actualizado/desmontado" como en las clases de React antiguas. El modelo correcto es **sincronización**:

> "Mantén X sincronizado con Y"

```jsx
// ❌ Pensamiento incorrecto: "cuando el componente se monta, haz fetch"
useEffect(() => {
  fetchData()
}, [])

// ✅ Pensamiento correcto: "sincroniza los datos con el userId actual"
useEffect(() => {
  fetchData(userId)
}, [userId])
```

¿Cuál es la diferencia? El segundo reacciona cuando `userId` cambia. El primero solo corre una vez y se olvida — si el usuario navega a otro perfil, los datos no se actualizan.

---

## Cleanup: por qué es importante

Sin cleanup, puedes tener **memory leaks** (fugas de memoria) o **bugs de race condition**.

### Ejemplo: timer sin cleanup

```jsx
// ❌ El intervalo sigue corriendo aunque el componente se desmonte
useEffect(() => {
  setInterval(() => {
    setCount(c => c + 1)
  }, 1000)
}, [])

// ✅ Se limpia al desmontar
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1)
  }, 1000)
  return () => clearInterval(id)  // cleanup
}, [])
```

### Ejemplo: fetch con race condition

```jsx
// ❌ Si userId cambia rápido, el fetch lento puede sobreescribir al rápido
useEffect(() => {
  fetchUser(userId).then(data => setUser(data))
}, [userId])

// ✅ Flag de cancelación evita que un fetch viejo sobreescriba datos nuevos
useEffect(() => {
  let cancelled = false
  fetchUser(userId).then(data => {
    if (!cancelled) setUser(data)
  })
  return () => { cancelled = true }
}, [userId])
```

---

## Reglas de las dependencias

### Regla de oro: si lo usas dentro del efecto, ponlo en las dependencias

```jsx
// ❌ Dependencia faltante — bug silencioso
useEffect(() => {
  document.title = `${name} - ${count} items`
}, [name]) // falta `count`

// ✅ Todas las variables usadas están en las dependencias
useEffect(() => {
  document.title = `${name} - ${count} items`
}, [name, count])
```

### Excepción: funciones de setState y refs

`setState` y `useRef` son estables — React garantiza que no cambian entre renders, así que no necesitas ponerlos en las dependencias (aunque si los pones no pasa nada malo).

---

## Cuándo NO usar useEffect

Muchos problemas se resuelven mejor SIN efecto:

### 1. Estado derivado — calcúlalo directamente

```jsx
// ❌ Efecto innecesario — dos renders por nada
const [fullName, setFullName] = useState('')
useEffect(() => {
  setFullName(first + ' ' + last)
}, [first, last])

// ✅ Cálculo directo durante el render
const fullName = first + ' ' + last
```

### 2. Respuesta a un evento del usuario — ponlo en el handler

```jsx
// ❌ Efecto para algo que el usuario hizo
const [submitted, setSubmitted] = useState(false)
useEffect(() => {
  if (submitted) sendForm(data)
}, [submitted])

// ✅ Directo en el handler
function handleSubmit() {
  sendForm(data)
}
```

### 3. Filtrar/transformar datos — useMemo o cálculo directo

```jsx
// ❌ Efecto para filtrar
useEffect(() => {
  setFilteredList(list.filter(item => item.active))
}, [list])

// ✅ Cálculo directo (o useMemo si es costoso)
const filteredList = list.filter(item => item.active)
```

---

## Resumen rápido

| Pregunta | Respuesta |
|---|---|
| ¿Qué hace useEffect? | Sincroniza tu componente con algo externo |
| ¿Cuándo corre? | Después de cada render que cambie sus dependencias |
| ¿Qué hace el cleanup? | Limpia el efecto anterior antes de correr el nuevo |
| ¿Qué va en las dependencias? | Todo lo que usas dentro del efecto |
| ¿Cuándo NO usarlo? | Estado derivado, respuestas a eventos, transformaciones de datos |
