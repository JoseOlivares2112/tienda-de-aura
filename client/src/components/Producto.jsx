function Producto ({ producto, onAgregar }) {
    return (
        <div className="card h-100 shadow-sm">
            {/* Imagen (placeholder por ahora) */}
            <img 
                src={producto.imagen || "http://via.placeholder.com/300x200"} 
                alt={producto.nombre}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover"}}
            />

                <div className="card-body d-flex flex-column">
                    <span className="badge bg-secondary mb-2">{producto.categoria}</span>
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className=" small text-muted mb-2">{producto.descripcion}</p>
                    <p className="fw-bold mt-auto mb-3">
                         ${producto.precio.toLocaleString("es-CL")}
                    </p>
                     <button className="btn btn-primary btn-sm mt-auto"
                        onClick={onAgregar}>Agregar al carrito
                    </button>
                </div>
        </div>
    );
}

export default Producto