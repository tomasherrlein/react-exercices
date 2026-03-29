# Componentes y Props — Las piezas de LEGO de React

---

## El problema que resuelve

Imagina que tienes una página con 50 tarjetas de producto. Sin componentes, copias y pegas el mismo HTML 50 veces. Si luego quieres cambiar el diseño de la tarjeta, tienes que editar 50 bloques.

Los componentes son **piezas reutilizables**. Defines la tarjeta una vez y la usas 50 veces, cada una con datos diferentes.

---

## La analogía: Máquina expendedora

Un componente es como una máquina expendedora:

- Le metes algo (monedas) → **props** (datos de entrada)
- Te devuelve algo (un producto) → **JSX** (lo que se ve en pantalla)
- Siempre funciona igual: misma entrada → misma salida

```jsx
// La "máquina expendedora" de tarjetas de usuario
function TarjetaUsuario({ nombre, email }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <p>{email}</p>
    </div>
  );
}

// La usas 3 veces con datos diferentes
<TarjetaUsuario nombre="Ana" email="ana@mail.com" />
<TarjetaUsuario nombre="Luis" email="luis@mail.com" />
<TarjetaUsuario nombre="Marta" email="marta@mail.com" />
```

---

## ¿Qué es un componente?

Es una **función de JavaScript** que:
1. Su nombre empieza con **mayúscula** (PascalCase)
2. Recibe un objeto como argumento (props)
3. Retorna JSX

```jsx
// Un componente válido — lo mínimo que necesitas
function Saludo({ nombre }) {
  return <h1>Hola {nombre}</h1>;
}
```

### Componentes funcionales vs clases

```jsx
// ✅ Componente funcional — siempre usa este
function Boton({ texto }) {
  return <button>{texto}</button>;
}

// ❌ Componente de clase — obsoleto, no lo uses en código nuevo
class Boton extends React.Component {
  render() {
    return <button>{this.props.texto}</button>;
  }
}
```

En código moderno siempre se usan componentes funcionales. Las clases son de versiones antiguas de React.

---

## Props — los argumentos del componente

Props es abreviación de "properties". Son los datos que el **padre** le pasa al **hijo**.

### Cómo se pasan y se reciben

```jsx
// El padre PASA las props (como atributos HTML)
<Perfil nombre="Carlos" edad={28} activo={true} />

// El hijo las RECIBE (como un objeto)
function Perfil({ nombre, edad, activo }) {
  return <p>{nombre} tiene {edad} años</p>;
}

// Las llaves {} destruturan el objeto. Equivale a:
function Perfil(props) {
  const nombre = props.nombre;
  const edad = props.edad;
  // ...
}
```

### Regla de oro: las props son de solo lectura

```jsx
// ❌ NUNCA modifiques las props
function Perfil({ nombre }) {
  nombre = nombre.toUpperCase();  // ERROR conceptual
  return <p>{nombre}</p>;
}

// ✅ Crea una variable nueva si necesitas transformar
function Perfil({ nombre }) {
  const nombreFormateado = nombre.toUpperCase();
  return <p>{nombreFormateado}</p>;
}
```

¿Por qué? Porque las props vienen del padre. Si el hijo las modifica, el padre no se entera y la app se vuelve impredecible. Es como cambiar los ingredientes de una receta sin decirle al chef.

### Props por defecto

```jsx
function Boton({ texto = "Click", color = "blue" }) {
  return <button style={{ background: color }}>{texto}</button>;
}

// Si no le pasas una prop, usa el valor por defecto
<Boton />                    // texto="Click", color="blue"
<Boton texto="Enviar" />     // texto="Enviar", color="blue"
```

### `children` — la prop especial

Todo lo que pongas **entre** las etiquetas del componente llega como `children`:

```jsx
function Tarjeta({ children }) {
  return <div className="tarjeta">{children}</div>;
}

// Uso — lo de adentro es children
<Tarjeta>
  <h2>Título</h2>
  <p>Contenido que quieras</p>
</Tarjeta>
```

Esto permite crear componentes "contenedores" que no saben qué van a contener.

---

## Descomposición: cuándo crear un componente nuevo

### Señales de que debes extraer un componente

1. **Se repite** — el mismo bloque de JSX aparece más de una vez
2. **Hace demasiado** — si necesitas "y" para describir qué hace, divídelo
3. **Tiene lógica propia** — si tiene su propio estado o lógica, merece su propia función

### Ejemplo: de monolito a componentes

```jsx
// ❌ Todo junto — difícil de leer y mantener
function App() {
  return (
    <div>
      <div className="header"><h1>Mi App</h1><nav>...</nav></div>
      <div className="card">...(20 líneas)...</div>
      <div className="card">...(20 líneas)...</div>
      <div className="card">...(20 líneas)...</div>
      <div className="footer">...</div>
    </div>
  );
}

// ✅ Descompuesto — cada pieza tiene nombre y responsabilidad clara
function App() {
  return (
    <div>
      <Header />
      <ProductCard product={product1} />
      <ProductCard product={product2} />
      <ProductCard product={product3} />
      <Footer />
    </div>
  );
}
```

---

## El spread operator con props

Cuando tienes un objeto con las mismas propiedades que las props, puedes pasarlo con spread:

```jsx
const pelicula = { titulo: "Inception", director: "Nolan", año: 2010 };

// ❌ Repetitivo
<TarjetaPelicula titulo={pelicula.titulo} director={pelicula.director} año={pelicula.año} />

// ✅ Spread — pasa todas las propiedades del objeto como props
<TarjetaPelicula {...pelicula} />
```

---

## Composición — componentes dentro de componentes

La composición es el patrón más poderoso de React. En vez de crear componentes gigantes, combinas componentes pequeños como piezas de LEGO.

### Componentes contenedor (Layout)

Puedes crear componentes que solo se encarguen de la estructura visual y acepten cualquier contenido via `children`:

```jsx
function Page({ children }) {
  return <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>{children}</div>;
}

function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// Uso — como piezas de LEGO encajadas
<Page>
  <Section title="Perfil">
    <p>Contenido del perfil</p>
  </Section>
  <Section title="Configuración">
    <p>Opciones aquí</p>
  </Section>
</Page>
```

### Variantes con props

Un solo componente puede tener diferentes apariencias según una prop:

```jsx
function Card({ variant = "default", children }) {
  const estilos = {
    default:  { border: "1px solid #e0e0e0" },
    outlined: { border: "2px dashed #999" },
    elevated: { boxShadow: "0 2px 8px rgba(0,0,0,0.15)" },
  };

  return <div style={estilos[variant]}>{children}</div>;
}

<Card variant="elevated">Contenido destacado</Card>
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es un componente? | Una función que recibe props y retorna JSX |
| ¿Qué son las props? | Datos que el padre le pasa al hijo (solo lectura) |
| ¿Puedo modificar las props? | No — nunca. Crea variables nuevas si necesitas transformar |
| ¿Cuándo crear un componente nuevo? | Cuando algo se repite, hace demasiado, o tiene lógica propia |
| ¿Qué es children? | Todo lo que va entre las etiquetas de apertura y cierre del componente |
| ¿Qué es composición? | Combinar componentes pequeños para construir UIs complejas |
