# useState — La memoria del componente

---

## El problema que resuelve

Una variable normal de JavaScript se pierde cada vez que el componente se re-renderiza. React llama a tu función de nuevo, y todas las variables locales empiezan de cero.

```jsx
// ❌ Esto NO funciona — count siempre es 0
function Contador() {
  let count = 0;
  return <button onClick={() => count++}>{count}</button>;
  // El click aumenta count, pero React no lo sabe
  // y no re-renderiza. Y si re-renderizara, count volvería a 0.
}
```

`useState` le dice a React: "guarda este valor entre renders, y cuando yo lo cambie, vuelve a pintar la pantalla".

---

## La analogía: La memoria a corto plazo

Un componente sin estado es como una persona sin memoria: cada vez que le hablas, se olvida de todo lo anterior.

`useState` le da memoria: recuerda lo que pasó y puede reaccionar al cambio.

```jsx
function Contador() {
  const [count, setCount] = useState(0);
  //     ^^^^^  ^^^^^^^^              ^
  //     valor  función para        valor
  //     actual  cambiarlo         inicial

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## Anatomía de useState

```jsx
const [valor, setValor] = useState(valorInicial);
```

1. **`valor`** — el dato actual. React lo recuerda entre renders.
2. **`setValor`** — la función para cambiarlo. Cuando la llamas, React re-renderiza.
3. **`valorInicial`** — solo se usa en el primer render.

El `[valor, setValor]` es destructuración de un array. `useState` retorna un array con 2 elementos.

---

## Reglas clave

### 1. Nunca modifiques el estado directamente

```jsx
// ❌ React no se entera del cambio — no re-renderiza
count = 5;
persona.edad = 25;

// ✅ Usa siempre la función setter
setCount(5);
setPersona({ ...persona, edad: 25 });
```

### 2. Usa la función updater cuando el nuevo valor depende del anterior

```jsx
// ❌ Puede tener bugs si se llama varias veces rápido
setCount(count + 1);

// ✅ La función recibe el valor más reciente
setCount(prev => prev + 1);
```

¿Por qué? Porque `count` es una foto del valor en el momento del render. Si haces dos `setCount(count + 1)` seguidos, ambos ven el mismo `count` y solo sumas 1 en vez de 2. Con `prev => prev + 1`, cada llamada usa el valor más reciente.

### 3. Los objetos y arrays se copian, no se mutan

```jsx
// ❌ Mutar el objeto — React no detecta el cambio
persona.edad = 25;
setPersona(persona);  // mismo objeto en memoria, React lo ignora

// ✅ Crear un objeto NUEVO con el cambio
setPersona({ ...persona, edad: 25 });

// ❌ Mutar el array
items.push(newItem);
setItems(items);

// ✅ Crear un array NUEVO
setItems([...items, newItem]);
```

**¿Por qué copiar?** React compara el valor viejo con el nuevo usando `===`. Si es el mismo objeto en memoria (aunque hayas cambiado una propiedad), React piensa que no cambió y no re-renderiza.

---

## Qué poner en estado (y qué no)

### Si se puede calcular, no lo pongas en estado

```jsx
// ❌ Estado derivado innecesario
const [firstName, setFirstName] = useState("Juan");
const [lastName, setLastName] = useState("Pérez");
const [fullName, setFullName] = useState("Juan Pérez");  // ¡sobra!

// ✅ Calcúlalo directo
const [firstName, setFirstName] = useState("Juan");
const [lastName, setLastName] = useState("Pérez");
const fullName = firstName + " " + lastName;  // se calcula en cada render gratis
```

### Pregúntate antes de crear un estado

| Pregunta | Si "sí" | Si "no" |
|---|---|---|
| ¿Cambia con el tiempo? | Puede ser estado | No es estado — usa una constante |
| ¿Se puede calcular de otro estado/props? | No es estado — calcúlalo directo | — |
| ¿Al cambiar, debe actualizar la pantalla? | `useState` | `useRef` (lo veremos en tema 8) |

---

## Estado con diferentes tipos de datos

### Números

```jsx
const [count, setCount] = useState(0);
setCount(prev => prev + 1);
```

### Booleanos (toggle)

```jsx
const [visible, setVisible] = useState(false);
setVisible(prev => !prev);  // alterna true/false
```

### Strings

```jsx
const [nombre, setNombre] = useState("");
setNombre(e.target.value);  // desde un input
```

### Objetos

```jsx
const [form, setForm] = useState({ nombre: "", email: "" });
setForm(prev => ({ ...prev, nombre: "Nuevo" }));
// spread copia todo, luego sobreescribes lo que cambió
```

### Arrays

```jsx
const [items, setItems] = useState([]);

// Agregar
setItems(prev => [...prev, nuevoItem]);

// Eliminar
setItems(prev => prev.filter(item => item.id !== idAEliminar));

// Modificar uno
setItems(prev => prev.map(item =>
  item.id === id ? { ...item, completada: true } : item
));
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué hace useState? | Guarda un valor entre renders y re-renderiza al cambiarlo |
| ¿Puedo modificar el valor directamente? | No — siempre usa `setValor()` |
| ¿Por qué usar `prev => prev + 1`? | Para asegurar que usas el valor más reciente |
| ¿Puedo mutar objetos/arrays? | No — crea copias nuevas con spread `...` |
| ¿Qué NO poner en estado? | Valores que se pueden calcular de otro estado o props |
