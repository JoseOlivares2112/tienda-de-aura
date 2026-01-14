import Producto from "./Producto"

function ListaProductos({ productos, onAgregarAlCarrito }) {
  return (
    <ul className="row g-3 list-unstyled">
      {productos.map((producto) => (
        <div key={producto.id} className="col-12 col-md-6 col-lg-4">
        <Producto
          producto={producto}
          onAgregar={() => onAgregarAlCarrito(producto)}
        />
      </div>
      ))}
    </ul>
  )
}

export default ListaProductos
