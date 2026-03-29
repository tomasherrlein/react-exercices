# useReducer — Estado complejo con reglas claras

---

## El problema que resuelve

Cuando el estado tiene **múltiples sub-valores** que dependen entre sí, o cuando las actualizaciones siguen **reglas complejas**, `useState` se vuelve difícil de manejar:

```jsx
// ❌ Con useState — la lógica está dispersa por todo el componente
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState("idle");

  function addItem(item) {
    setItems(prev => [...prev, item]);
    if (items.length + 1 >= 5) setDiscount(10);  // ¿y si me olvido esta regla?
    setStatus("modified");
  }

  function checkout() {
    setStatus("processing");
    // ... ¿y si checkout falla, revierto items y discount?
  }
}
```

El problema: la lógica de "qué cambios van juntos" está dispersa. Si agregas un caso nuevo, puedes olvidar actualizar uno de los estados.

---

## La analogía: El cajero del banco

Un `useReducer` funciona como un **cajero de banco**:

- Tú le pasas un **formulario** (action) que dice qué quieres hacer: "depositar $500", "retirar $200"
- El cajero mira tu **saldo actual** (state) y aplica las **reglas del banco** (reducer)
- Te devuelve el **nuevo saldo** (new state)

Tú no tocas el dinero directamente. Solo pides una operación, y el cajero la procesa según las reglas.

```
  Tú (componente)           Cajero (reducer)           Bóveda (estado)
  ─────────────────         ────────────────           ───────────────
  dispatch({                function reducer(          { balance: 1000 }
    type: "DEPOSIT",        state, action) {
    amount: 500             switch(action.type) {
  })                          case "DEPOSIT":
       ──────────────→          return {
                                  balance: state.balance
                                  + action.amount
                                }
                            }
                            }
                                  ──────────────→      { balance: 1500 }
```

---

## Cómo funciona useReducer

### Los 3 ingredientes

```jsx
import { useReducer } from "react";

// 1. El estado inicial
const initialState = { count: 0 };

// 2. El reducer: función PURA que recibe (estado actual, acción) y retorna nuevo estado
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
}

// 3. Usar en el componente
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
```

### El flujo:

1. El usuario hace clic en "+"
2. El componente ejecuta `dispatch({ type: "INCREMENT" })`
3. React llama a `reducer(estadoActual, { type: "INCREMENT" })`
4. El reducer retorna el **nuevo estado**: `{ count: estadoActual.count + 1 }`
5. React re-renderiza con el nuevo estado

---

## Reglas del reducer

### 1. Debe ser una función PURA

```jsx
// ❌ Muta el estado anterior
function reducer(state, action) {
  state.count++;  // NUNCA mutes el estado
  return state;
}

// ✅ Retorna un objeto nuevo
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}
```

### 2. Debe retornar el estado completo

```jsx
const state = { name: "Ana", age: 25, role: "admin" };

// ❌ Solo retorna una parte — pierde name y role
function reducer(state, action) {
  if (action.type === "SET_AGE") return { age: action.age };
}

// ✅ Spread del estado anterior + lo que cambia
function reducer(state, action) {
  if (action.type === "SET_AGE") return { ...state, age: action.age };
}
```

### 3. Toda la lógica va dentro del reducer

```jsx
// ❌ Lógica fuera del reducer — difícil de rastrear
function handleAdd(item) {
  if (state.items.length < 10) {
    dispatch({ type: "ADD", item });
  }
}

// ✅ Toda la lógica en el reducer — una sola fuente de verdad
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (state.items.length >= 10) return state;  // regla del negocio aquí
      return { ...state, items: [...state.items, action.item] };
  }
}
```

---

## Acciones con datos (payload)

Las acciones pueden llevar datos adicionales:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.value };

    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.item] };

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, ...action.changes } : i
        ),
      };

    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
}

// Uso:
dispatch({ type: "SET_NAME", value: "Carlos" });
dispatch({ type: "ADD_ITEM", item: { id: 1, text: "Nuevo" } });
dispatch({ type: "REMOVE_ITEM", id: 1 });
dispatch({ type: "UPDATE_ITEM", id: 1, changes: { text: "Editado" } });
```

---

## useState vs useReducer — cuándo usar cada uno

| Situación | Usa |
|---|---|
| Un valor simple (string, number, boolean) | `useState` |
| Un objeto con 1-2 campos independientes | `useState` |
| Estado con múltiples sub-valores que cambian juntos | `useReducer` |
| Lógica compleja: validación, reglas de negocio | `useReducer` |
| El próximo estado depende del anterior de forma compleja | `useReducer` |
| Quieres testear la lógica de estado por separado | `useReducer` |

```jsx
// useState es suficiente
const [isOpen, setIsOpen] = useState(false);
const [name, setName] = useState("");

// useReducer es mejor
const [formState, dispatch] = useReducer(formReducer, {
  values: { name: "", email: "" },
  errors: {},
  touched: {},
  isSubmitting: false,
});
```

---

## Patrón: useReducer + Context

Para estado global complejo, combina useReducer (para la lógica) con Context (para la distribución):

```jsx
const TodoContext = createContext(null);

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE":
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case "DELETE":
      return state.filter(t => t.id !== action.id);
    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
}

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos fuera de TodoProvider");
  return context;
}

// En cualquier componente:
function AddTodo() {
  const { dispatch } = useTodos();
  const [text, setText] = useState("");

  return (
    <form onSubmit={e => {
      e.preventDefault();
      dispatch({ type: "ADD", text });
      setText("");
    }}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Agregar</button>
    </form>
  );
}
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es useReducer? | Un hook para estado complejo manejado con acciones y un reducer |
| ¿Qué es el reducer? | Una función pura: (estado, acción) → nuevo estado |
| ¿Qué es dispatch? | La función que envía acciones al reducer |
| ¿Cuándo usarlo? | Estado complejo con múltiples sub-valores o reglas de negocio |
| ¿Cuándo no usarlo? | Estado simple (un boolean, un string) — usa useState |
| ¿Se puede combinar con Context? | Sí — useReducer para la lógica, Context para distribuirlo |
| ¿El reducer puede ser impuro? | No — nunca mutes, nunca hagas efectos secundarios |
