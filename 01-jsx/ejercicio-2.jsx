/**
 * EJERCICIO 1B — JSX con expresiones
 *
 * Completa el componente TarjetaProducto usando los datos que se te dan.
 * No inventes datos — usa las variables que ya están definidas.
 *
 * Requisitos:
 * 1. Mostrar el nombre del producto en un <h2>
 * 2. Mostrar el precio formateado como "$XX.XX"
 * 3. Si stock > 0, mostrar "Disponible" en verde; si no, "Sin stock" en rojo
 *    (usa el atributo style={{ color: "green" }} o className si prefieres)
 * 4. Mostrar la descripción solo si existe (puede ser null)
 * 5. El botón "Comprar" debe estar deshabilitado si stock === 0
 */

export default function TarjetaProducto({ nombre, precio, stock, descripcion }) {
  
  return(
    <div>
      <h2>Producto: {nombre}</h2>

      <p>${precio.toFixed(2)}</p>

      <p style={{color: stock > 0 ? "green" : "red"}}>
        {stock > 0 ? "Disponible" : "Sin stock"}
      </p>

      {descripcion && <p>{descripcion}</p>}

      <button disabled={stock === 0} >Comprar</button>
    </div>
  );
}

// Prueba tu componente con estos datos:
// <TarjetaProducto nombre="Teclado mecánico" precio={89.99} stock={5} descripcion="Switch Cherry MX Red" />
// <TarjetaProducto nombre="Monitor 4K" precio={399.00} stock={0} descripcion={null} />


/**
 * SOLUCIÓN:
 *
 * function TarjetaProducto({ nombre, precio, stock, descripcion }) {
 *   return (
 *     <div>
 *       <h2>{nombre}</h2>
 *       <p>${precio.toFixed(2)}</p>
 *       <p style={{ color: stock > 0 ? "green" : "red" }}>
 *         {stock > 0 ? "Disponible" : "Sin stock"}
 *       </p>
 *       {descripcion && <p>{descripcion}</p>}
 *       <button disabled={stock === 0}>Comprar</button>
 *     </div>
 *   );
 * }
 */
