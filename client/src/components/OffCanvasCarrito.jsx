function OffCanvasCarrito({
    carrito,
    totalCarrito,
    onAgregar,
    onRestar,
    onEliminar,
    onVaciar,
}) {
    return (
        <div 
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasCarrito"
            aria-labelledby="offcanvasCarritoLabel"
        >
            <div className="offcanvas-header">
                <h5 id="offcanvasCarritoLabel">🛒 Tu carrito</h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                />
            </div>

            <div className="offcanvas-body">
                {carrito.length ===0 ? (

                 <p className="text-muted">El carrito está vacío</p>
                ) : (
                    <>
                        {carrito.map((p) => (
                            <div key={p.id} className="mb-3 border-bottom pb-2">
                                <strong>{p.nombre}</strong>
                                <div className="d-flex gap-2 mt-2">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => onRestar(p)}                                    
                                    >
                                        -
                                    </button>

                                    <span> x {p.cantidad}</span>
                                    
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => onAgregar(p)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger ms-auto"
                                        onClick={() => onEliminar(p)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    <hr />
                    <p className="fw-bold">
                        Total:${totalCarrito.toLocaleString("es-CL")}
                    </p>

                    <button className="btn btn-danger w-100 mb-2" onClick={onVaciar}>
                        Vaciar Carrito
                    </button>
                    <button className="btn btn-success w-100">
                        Finalizar Compra
                    </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default OffCanvasCarrito;