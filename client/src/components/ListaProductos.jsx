import Producto from "./Producto"

function ListaProductos({ productos, onAgregarAlCarrito }) {
  return (
    <ul>
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          onAgregar={() => onAgregarAlCarrito(producto)}
        />
      ))}
    </ul>
  )
}

export default ListaProductos
