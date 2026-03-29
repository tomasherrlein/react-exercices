# Lifting State Up — Subir el estado al ancestro común

---

## El problema que resuelve

Tienes dos componentes hermanos que necesitan compartir datos. Por ejemplo: un input de búsqueda y una lista filtrada. El input tiene el texto, la lista necesita ese texto para filtrar. Pero en React, **los datos solo fluyen de padre a hijo** (via props), nunca entre hermanos directamente.

¿Cómo se comunican entonces? **Subiendo el estado al padre que ambos comparten.**

---

## La analogía: La pizarra del salón

Imagina dos estudiantes sentados lejos el uno del otro. No pueden pasarse papelitos directamente. Pero ambos pueden ver la **pizarra del frente** (el padre).

- El **Estudiante A** (input) le pide al profesor que escriba algo en la pizarra
- El **Estudiante B** (lista) lee la pizarra y actúa según lo que dice

La pizarra es el **estado en el padre**. Ambos hijos se sincronizan a través de ella.

```
      ┌──── Padre (tiene el estado) ────┐
      │        search = "react"          │
      │                                  │
      ▼                                  ▼
  ┌─────────┐                    ┌──────────────┐
  │ Input    │                    │ Lista        │
  │ value=   │                    │ filtra por   │
  │ {search} │                    │ {search}     │
  └─────────┘                    └──────────────┘
```

---

## El patrón paso a paso

### 1. Detectar que necesitas lifting

Cuando dos componentes necesitan el mismo dato:

```jsx
// ❌ Cada uno tiene su propio estado — no se sincronizan
function Input() {
  const [text, setText] = useState("");
  return <input value={text} onChange={e => setText(e.target.value)} />;
}

function Display() {
  const [text, setText] = useState(""); // ¿cómo sabe lo que el input tiene?
  return <p>Escribiste: {text}</p>;
}
```

### 2. Subir el estado al padre

```jsx
// ✅ El padre tiene el estado, los hijos reciben props
function Parent() {
  const [text, setText] = useState("");

  return (
    <>
      <Input value={text} onChange={setText} />
      <Display text={text} />
    </>
  );
}

function Input({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function Display({ text }) {
  return <p>Escribiste: {text}</p>;
}
```

### 3. El ciclo completo

1. El usuario escribe en `Input`
2. `Input` llama a `onChange` (que es `setText` del padre)
3. El padre actualiza su estado
4. React re-renderiza al padre
5. Los nuevos valores bajan como props a `Input` y `Display`
6. Ambos están sincronizados

---

## Cuándo subir y cuándo no

### SÍ sube el estado cuando:

- Dos hermanos necesitan el mismo dato
- Un hijo necesita modificar algo que otro hijo muestra
- Necesitas coordinar acciones entre componentes

### NO subas el estado cuando:

- Solo un componente usa ese dato (déjalo local)
- El estado es puramente visual (ej: si un dropdown está abierto)
- Subirlo causaría re-renders innecesarios en muchos componentes

```jsx
// ❌ No subas esto — solo el dropdown lo necesita
function Parent() {
  const [isOpen, setIsOpen] = useState(false); // ¿para qué está aquí?
  return <Dropdown isOpen={isOpen} onToggle={() => setIsOpen(o => !o)} />;
}

// ✅ Estado local donde pertenece
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(o => !o)}>Toggle</button>
      {isOpen && <ul>...</ul>}
    </div>
  );
}
```

---

## El patrón "callback para el hijo"

Cuando el hijo necesita modificar el estado del padre, el padre le pasa una **función callback**:

```jsx
function Parent() {
  const [items, setItems] = useState([]);

  // El padre define la lógica
  function addItem(text) {
    setItems(prev => [...prev, { id: Date.now(), text }]);
  }

  // El hijo recibe la función para usarla
  return (
    <>
      <AddForm onAdd={addItem} />
      <ItemList items={items} />
    </>
  );
}

function AddForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(text);   // Llama al padre
    setText("");    // Limpia su propio estado local
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Agregar</button>
    </form>
  );
}
```

Nota que `AddForm` tiene su **propio estado local** (`text`) para el input — eso no necesita subirse porque solo él lo usa. Pero cuando se envía, comunica el resultado al padre vía `onAdd`.

---

## Prop drilling — el problema de subir demasiado

Cuando subes el estado muchos niveles, tienes que pasar props a través de componentes intermedios que no las necesitan:

```jsx
// El estado está en App, pero lo necesita DeepChild
function App() {
  const [user, setUser] = useState({ name: "Ana" });
  return <Layout user={user} />;        // Layout no usa user
}

function Layout({ user }) {
  return <Sidebar user={user} />;        // Sidebar no usa user
}

function Sidebar({ user }) {
  return <UserAvatar user={user} />;     // ¡Por fin lo usa!
}
```

Esto se llama **prop drilling** y es la señal de que necesitas Context (tema 10).

**Regla:** si pasas una prop a través de 2+ componentes que no la usan, considera Context.

---

## Principio de la fuente de verdad única

Cada dato debe tener **un solo dueño**. Si el mismo dato existe en dos estados diferentes, eventualmente se desincronizan.

```jsx
// ❌ Dos fuentes de verdad — se van a desincronizar
function Parent() {
  const [count, setCount] = useState(0);
  return <Child initialCount={count} />;
}

function Child({ initialCount }) {
  const [count, setCount] = useState(initialCount); // copia del padre
  // Si el padre cambia su count, el hijo no se entera
}

// ✅ Una sola fuente de verdad — el padre controla
function Parent() {
  const [count, setCount] = useState(0);
  return <Child count={count} onIncrement={() => setCount(c => c + 1)} />;
}

function Child({ count, onIncrement }) {
  return <button onClick={onIncrement}>{count}</button>;
}
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es lifting state up? | Mover el estado al ancestro común de los componentes que lo necesitan |
| ¿Por qué? | Los datos en React fluyen de padre a hijo — los hermanos no se comunican directo |
| ¿Cómo modifica el hijo al padre? | El padre le pasa una función callback como prop |
| ¿Cuándo NO subir? | Si solo un componente lo usa, déjalo local |
| ¿Qué es prop drilling? | Pasar props a través de componentes que no las necesitan |
| ¿Cuándo usar Context en vez de lifting? | Cuando haces prop drilling a través de 2+ niveles |
