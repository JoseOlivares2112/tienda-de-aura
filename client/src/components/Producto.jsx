function Producto ({ nombre, precio, onAgregar }) {
    return (
        <li className="card h-100">
            <div className="card-body d-flex flex-column">
            <h3 className="h6">{nombre}</h3>
            <p className="fw-semibold">${precio.toLocaleString("es-CL")}</p>
            <button className="btn btn-primary btn-sm mt-auto"
            onClick={onAgregar}>Agregar</button>
            </div>
        </li>
    )
}

export default Producto