# Eventos y Formularios Controlados — React es la fuente de verdad

---

## El problema que resuelve

En HTML normal, el navegador maneja los formularios: el input guarda su propio valor, el form se envía y la página se recarga. Tú lees los datos al final con `document.getElementById`.

En React, esto no funciona bien porque React quiere ser **la fuente de verdad** de la UI. Si el navegador tiene un valor y React tiene otro, se desincronizan.

Los formularios **controlados** resuelven esto: React controla el valor de cada input en todo momento.

---

## La analogía: Dictado vs escritura libre

- **Formulario no controlado** (HTML normal): el alumno escribe lo que quiere en su cuaderno. El profesor solo lee al final.
- **Formulario controlado** (React): el profesor dicta cada letra. El alumno escribe exactamente lo que el profesor dice. Si el profesor quiere cambiar algo, dicta de nuevo.

```jsx
// Controlado: React dicta el valor, el input obedece
<input value={nombre} onChange={e => setNombre(e.target.value)} />

// No controlado: el input decide su propio valor
<input defaultValue="Juan" />
```

---

## Eventos en React

### Diferencias con HTML

```jsx
// HTML: string, minúsculas
<button onclick="handleClick()">

// React: función, camelCase
<button onClick={handleClick}>
//               ^^^^^^^^^^^
//               SIN paréntesis — pasas la función, no la ejecutas
```

### Pasar la función vs ejecutarla

```jsx
// ✅ Pasa la referencia — se ejecuta cuando el usuario haga click
<button onClick={handleClick}>

// ❌ Se ejecuta inmediatamente al renderizar
<button onClick={handleClick()}>

// ✅ Si necesitas pasar argumentos, usa una función flecha
<button onClick={() => handleDelete(item.id)}>
```

### El objeto evento (e)

Cuando React llama a tu handler, le pasa un objeto `e` (SyntheticEvent) con información sobre el evento:

```jsx
function handleClick(e) {
  e.target          // el elemento que disparó el evento (el <button>, el <input>, etc.)
  e.target.value    // el valor del input
  e.target.name     // el atributo name del input
  e.target.type     // "text", "checkbox", "email", etc.
  e.target.checked  // true/false (solo checkboxes)
  e.preventDefault() // evita el comportamiento por defecto (ej: submit recarga la página)
}
```

---

## Formularios controlados — paso a paso

### 1. Input de texto básico

```jsx
function NombreForm() {
  const [nombre, setNombre] = useState("");

  return (
    <input
      value={nombre}              // React DICTA el valor
      onChange={e => setNombre(e.target.value)}  // el usuario lo CAMBIA vía React
    />
  );
}
```

El ciclo:
1. El usuario escribe "J"
2. `onChange` se dispara con `e.target.value = "J"`
3. `setNombre("J")` actualiza el estado
4. React re-renderiza con `value="J"` en el input

### 2. Múltiples inputs con un solo handler

En vez de crear un handler para cada campo, puedes usar el atributo `name`:

```jsx
const [form, setForm] = useState({ nombre: "", email: "" });

function handleChange(e) {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
  //                          ^^^^^^
  //                          "computed property" — usa el valor de name como clave
}

// name="nombre" → actualiza form.nombre
<input name="nombre" value={form.nombre} onChange={handleChange} />
// name="email" → actualiza form.email
<input name="email" value={form.email} onChange={handleChange} />
```

### 3. Checkbox — usa `checked`, no `value`

```jsx
function handleChange(e) {
  const { name, type, value, checked } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
}

<input name="activo" type="checkbox" checked={form.activo} onChange={handleChange} />
```

El checkbox es la excepción: su estado es `checked` (true/false), no `value` (que siempre es "on").

### 4. Select

```jsx
<select name="rol" value={form.rol} onChange={handleChange}>
  <option value="usuario">Usuario</option>
  <option value="admin">Admin</option>
</select>
```

El `value` del `<select>` controla qué opción está seleccionada.

---

## Submit: prevenir recarga

```jsx
function handleSubmit(e) {
  e.preventDefault();  // sin esto, la página se recarga
  // procesar los datos...
  console.log(form);
}

<form onSubmit={handleSubmit}>
  {/* inputs... */}
  <button type="submit">Enviar</button>
</form>
```

---

## Validación

### Validación derivada (sin estado extra)

```jsx
const emailValido = email.includes("@") && email.includes(".");
const passwordValida = password.length >= 8;
const formularioValido = emailValido && passwordValida;

// El botón se deshabilita automáticamente
<button disabled={!formularioValido}>Enviar</button>
```

Estas validaciones son **estado derivado** — se calculan del estado existente, no necesitan su propio `useState`.

### Mostrar errores solo después de interactuar

```jsx
const [tocados, setTocados] = useState({ email: false, password: false });

// onBlur se dispara cuando el usuario sale del campo
<input onBlur={e => setTocados(t => ({ ...t, [e.target.name]: true }))} />

// Solo muestra error si el campo fue tocado Y es inválido
{tocados.email && !emailValido && <span>Email inválido</span>}
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es un formulario controlado? | React controla el valor de cada input con estado |
| ¿Por qué controlado? | Para que React sea la fuente de verdad — input y estado siempre sincronizados |
| ¿Cómo manejar múltiples inputs? | Un handler con `e.target.name` y `[name]: value` |
| ¿Y el checkbox? | Usa `checked` en vez de `value` |
| ¿Cómo evitar la recarga al submit? | `e.preventDefault()` en el handler del form |
| ¿Cómo validar? | Calcula la validación como estado derivado (sin useState extra) |
