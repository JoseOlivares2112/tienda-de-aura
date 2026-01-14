function Producto ({ producto, onAgregar }) {
    return (
        <li className="card h-100">
            <img 
                src={producto.imagen} 
                alt={producto.nombre}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover"}} 
            />
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between aling-items-start gap-2">
                    <h3 className="h6 mb-1">{producto.nombre}</h3>
                    <span className="badge text-bg-light text-dark">{producto.categoria}</span>
                </div>

                <p className=" small text-muted mb-2">{producto.descripcion}</p>

            
                <p className="badge text-bg-light text-dark">
                     ${producto.precio.toLocaleString("es-CL")}
                </p>

                <button className="btn btn-primary btn-sm mt-auto"
                    onClick={onAgregar}>Agregar
                </button>
            </div>
        </li>
    )
}

export default Producto