import Producto from "./Producto"

function ListaProductos({ productos, onAgregarAlCarrito }) {
  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div key={producto.id} className="col-12 col-md-6 col-lg-4">
        <Producto
          producto={producto}
          onAgregar={() => onAgregarAlCarrito(producto)}
        />
      </div>
      ))}
    </div>
  );
}

export default ListaProductos
