# Listas y Keys — Cómo React identifica cada elemento

---

## El problema que resuelve

Cuando tienes una lista de elementos y algo cambia (agregas, eliminas, reordenas), React necesita saber **cuál elemento es cuál** para actualizar solo lo necesario en el DOM.

Sin keys, React no puede distinguir entre los elementos y puede cometer errores: reutilizar el estado de un elemento para otro, perder datos de inputs, o re-renderizar toda la lista innecesariamente.

---

## La analogía: Pulseras de identificación

Imagina un grupo de niños en una excursión. Si todos llevan una **pulsera con su nombre** (key), el profesor siempre sabe quién es quién, aunque cambien de orden.

Sin pulseras: "el tercero de la fila" puede ser un niño diferente si alguien se cambió de lugar. El profesor se confunde.

```jsx
// ❌ Sin key (o con el índice) — "el tercero de la fila"
{items.map((item, index) => <li key={index}>{item.text}</li>)}

// ✅ Con ID estable — "la pulsera con nombre"
{items.map(item => <li key={item.id}>{item.text}</li>)}
```

---

## Cómo renderizar listas

Para mostrar un array como JSX, usas `.map()`:

```jsx
const frutas = ["Manzana", "Banana", "Naranja"];

function ListaFrutas() {
  return (
    <ul>
      {frutas.map(fruta => (
        <li key={fruta}>{fruta}</li>
      ))}
    </ul>
  );
}
```

`.map()` transforma cada elemento del array en un elemento JSX. React necesita un `key` en cada elemento para identificarlo.

---

## Keys: las reglas

### 1. Usa un ID único y estable

```jsx
// ✅ ID de base de datos, UUID, o cualquier identificador único
{usuarios.map(user => <Card key={user.id} user={user} />)}
```

### 2. Nunca uses el índice si el orden puede cambiar

```jsx
const [items, setItems] = useState(["A", "B", "C"]);

// ❌ Si agregas "D" al principio, los índices se mueven:
//    "A" era key=0, ahora "D" es key=0
//    React piensa que "D" ES "A" y reutiliza su estado
{items.map((item, index) => <li key={index}>{item}</li>)}

// ✅ Con ID estable, React sabe que "D" es nuevo
{items.map(item => <li key={item.id}>{item.text}</li>)}
```

### 3. Cuándo SÍ puedes usar el índice

- La lista es estática (no cambia)
- No se reordena
- No tiene estado interno (checkboxes, inputs)

Si cumple las 3 condiciones, el índice es seguro. Si no, usa IDs.

### 4. Las keys deben ser únicas entre hermanos

```jsx
// ✅ Cada <li> tiene un key diferente dentro del mismo <ul>
<ul>
  <li key="1">...</li>
  <li key="2">...</li>
</ul>

// Dos listas diferentes pueden tener las mismas keys — no hay conflicto
<ul>{listaA.map(i => <li key={i.id}>...</li>)}</ul>
<ul>{listaB.map(i => <li key={i.id}>...</li>)}</ul>
```

---

## El bug clásico: índice como key + checkbox

Este es el bug más común y difícil de detectar:

```jsx
function Lista() {
  const [items, setItems] = useState([
    { id: 1, text: "Primero" },
    { id: 2, text: "Segundo" },
  ]);

  function agregarAlPrincipio() {
    setItems([{ id: 3, text: "Nuevo" }, ...items]);
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input type="checkbox" /> {item.text}
        </li>
      ))}
    </ul>
  );
}
```

**Qué pasa:**
1. Marcas el checkbox de "Primero" (key=0)
2. Haces clic en "Agregar al principio"
3. "Nuevo" toma la posición 0 y hereda el key=0
4. React piensa que key=0 es el mismo elemento → le deja el checkbox marcado
5. Resultado: "Nuevo" aparece marcado y "Primero" desmarcado

Con `key={item.id}` esto no pasa porque React sabe que `id=1` sigue siendo "Primero".

---

## Operaciones comunes con arrays en estado

### Agregar

```jsx
// Al final
setItems(prev => [...prev, nuevoItem]);

// Al principio
setItems(prev => [nuevoItem, ...prev]);
```

### Eliminar

```jsx
setItems(prev => prev.filter(item => item.id !== idAEliminar));
```

### Modificar uno

```jsx
setItems(prev => prev.map(item =>
  item.id === id ? { ...item, completada: !item.completada } : item
));
```

### Reemplazar todo

```jsx
setItems(nuevaLista);
```

---

## Generar IDs únicos

```jsx
// Opción 1: Date.now() — simple, suficiente para la mayoría de casos
const nuevoItem = { id: Date.now(), texto: "..." };

// Opción 2: crypto.randomUUID() — mejor para producción
const nuevoItem = { id: crypto.randomUUID(), texto: "..." };

// Opción 3: contador que se incrementa
let nextId = 0;
function crearItem(texto) {
  return { id: nextId++, texto };
}
```

---

## Filtrar y ordenar sin estado extra

Cuando filtras o ordenas una lista, el resultado es **estado derivado** — se calcula del estado existente:

```jsx
const [search, setSearch] = useState("");
const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"

// ✅ Calculado directo — NO uses useState para esto
const filtered = contactos.filter(c =>
  c.nombre.toLowerCase().includes(search.toLowerCase())
);

const sorted = [...filtered].sort((a, b) =>
  sortOrder === "asc"
    ? a.nombre.localeCompare(b.nombre)
    : b.nombre.localeCompare(a.nombre)
);
```

**Nota:** `[...filtered].sort()` crea una copia antes de ordenar. `.sort()` muta el array original, y en React no debes mutar estado.

---

## Edición in-place: patrón del borrador

Cuando editas un item de la lista, necesitas un "borrador" temporal:

```jsx
const [editandoId, setEditandoId] = useState(null);   // ¿qué item se está editando?
const [borrador, setBorrador] = useState({ titulo: "", contenido: "" }); // copia temporal

function empezarEdicion(item) {
  setEditandoId(item.id);
  setBorrador({ titulo: item.titulo, contenido: item.contenido });
}

function guardar() {
  setItems(prev => prev.map(i => i.id === editandoId ? { ...i, ...borrador } : i));
  setEditandoId(null);
}

function cancelar() {
  setEditandoId(null); // descarta el borrador, el item original no cambió
}
```

¿Por qué no editar directamente el item en el array? Porque si el usuario cancela, no puedes "deshacer" los cambios. El borrador es la copia de seguridad.

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Por qué keys? | Para que React identifique cada elemento y actualice solo lo necesario |
| ¿Qué usar como key? | Un ID único y estable (de la BD, UUID, etc.) |
| ¿Puedo usar el índice? | Solo si la lista es estática, no se reordena, y no tiene estado interno |
| ¿Qué pasa sin key? | React muestra un warning y puede tener bugs con estado/checkboxes |
| ¿Las keys deben ser globalmente únicas? | No — solo entre hermanos del mismo array |
| ¿Filtrar/ordenar necesita useState? | No — son estado derivado, calcula directo |
