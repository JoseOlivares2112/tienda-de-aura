
function Navbar({ totalItems, busqueda, setBusqueda }) {
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
            <div className="container-fluid">
                <span className="navbar-brand fw-bold">Tienda de aura</span>

                <form 
                    className="d-flex flex-grow-1 mx-3" 
                    role="search"
                    onSubmit={(e) => e.preventDefault()}
                    >
                    <input className="form-control"
                    type="search"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    />
                </form>

                <button className="btn btn-outline-dark position-relative" 
                type="button" 
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCarrito"
                >
                    🛒
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                    </span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
