function Producto ({ producto, onAgregar }) {
    const { nombre, descripcion, precio, imagen, categoria } = producto;

    const precioFormateado = Number(precio).toLocaleString("es-CL");
    const imagenFinal = imagen || "https://via.placeholder.com/600x400?text=Producto";


    return (
        <div className="card h-100 shadow-sm product-card">
            <div className="product-img-wrap">
                <img 
                src={imagenFinal} 
                alt={nombre}
                className="card-img-top product-img"
                loading="lazy"
            />
            {categoria && (
                <span className="badge bg-dark product-badge">
                    {categoria}
                </span>
            )}
            </div>
            {/* Imagen (placeholder por ahora) */}
        
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title product-title mb-1">{nombre}</h5>
                    {descripcion && (
                        <p className="card-text text-muted product-desc mb-3">
                            {descripcion}
                        </p>
                    )}

                    <div className="mt-auto d-flex align-items-center justify-content-between">
                        <span className="fw-bold fs-5">
                            ${precioFormateado}
                        </span>
                        <button  type="button" className="btn btn-primary btn-sm mt-auto"
                            onClick={onAgregar}>Agregar al carrito
                        </button>
                    </div>
                </div>
        </div>
    );
}

export default Producto;