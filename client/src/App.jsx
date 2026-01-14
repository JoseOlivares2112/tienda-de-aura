import { useEffect, useState } from "react"
import ListaProductos from "./components/ListaProductos"
import "./App.css"

function App() {
  const [productos, setProductos] = useState([]);
  const [ mensajeCheckout, setMensajeCheckout] = useState(null);

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito")
    return guardado ? JSON.parse(guardado) : []
  });

  const [cargando, setCargando] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);


  function onAgregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existente = prev.find((p) => p.id === producto.id)

      if (existente) {
        return prev.map((p) =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad +1 }
          : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  function restarDelCarrito(producto) {
  setCarrito((prev) =>{
    const existente = prev.find((p)=> p.id === producto.id)

    // si no existe, no hacemos nada
    if(!existente) return prev

    // si hay mas de 1 restamos 1 

  if (existente.cantidad > 1) {
    return prev.map((p) => 
    p.id === producto.id ? { ...p, cantidad: p.cantidad - 1} : p
    )
  }

  // si cantidad es 1, al restar se elimina completamente
  return prev.filter((p)  => p.id !== producto.id)
  })
  }

  function eliminarProducto(producto) {
  setCarrito((prev) => prev.filter((p) => p.id !== producto.id))
  }

  const totalCarrito = carrito.reduce(
  (suma, p) => suma + p.precio * p.cantidad,
  0
  )

  function vaciarCarrito() {
  setCarrito([])
  localStorage.removeItem("carrito")
  }

  async function finalizarCompra() {
    try {
      setMensajeCheckout(null);

      //armamos el payload que espera el backend
      const items = carrito.map((p) => ({
        id: p.id,
        cantidad: p.cantidad,
      }));

      const total = totalCarrito;

      const res = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ items, total }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensajeCheckout({
          tipo: "error",
          texto: data.error || "Error de Checkout"
        });
        return;
      }

      setMensajeCheckout({
        tipo: "ok",
        texto: data.mensaje || "Compra realizada con éxito"
      });

      //si fue exitoso vaciamos el carrito

      setCarrito([]);
      localStorage.removeItem("carrito");
    } catch (error) {
      console.error(error);
      setMensajeCheckout({
        tipo: "error",
        texto: "No se pudo conectar con el servidor",
      });
    }
  }

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
    }, [carrito])

  useEffect(() => {
    async function cargarProductos() {
      try {
        const res = await fetch("http://localhost:3000/api/productos");
        if (!res.ok) throw new Error("No se pudieron cargar los productos");

        const data = await res.json();

        setProductos(data);
        } catch (error) {
          console.error("Error cargando productos:", error);
          setErrorProductos("No se pudieron cargar los productos. Intentelo nuevamente");
        } finally {
          setCargando(false);
        }

       
    }

    cargarProductos();
    }, []);

    return (
    <div className="app">
      <header className="header">
        <h1 className="Title">Tienda de Aura</h1>

        <div className="summary">
          <p><strong>Carrito:</strong>{" "}
            {carrito.reduce((total, p) => total + p.cantidad, 0)} productos
          </p>
          <p>
            <strong>Total:</strong>{" "}
            ${totalCarrito.toLocaleString("es-CL")}
          </p>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>Catálogo</h2>

          {cargando && <p className="text-muted">Cargando productos...</p>}

          {errorProductos && (
            <div className="alert alert-danger" role="alert">
              {errorProductos}
            </div>
          )}

          {!cargando && !errorProductos && (
            <ListaProductos 
            productos={productos}
            onAgregarAlCarrito={onAgregarAlCarrito}
            />
          )}
        </section>

        <aside className="card">
          <div className="card-body">
          <div className="cartHeader d-flex justify-content-between align-items-center mb-3">
            <h2 className="m-0">Carrito</h2>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={vaciarCarrito} disabled={carrito.length === 0}>
              Vaciar Carrito
            </button>
          </div>

          <ul className="cartList">
            {carrito.map((p) => (
              <li key={p.id} className="card mb-2">
                <div className="card-body p-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="cartName">{p.nombre}</span>
                  <span className="cartQty">x {p.cantidad}</span>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => restarDelCarrito(p)}>-</button>{" "}
                  <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => onAgregarAlCarrito(p)}>+</button>{" "}
                  <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => eliminarProducto(p)}>Eliminar</button>
                </div>
                </div>
              </li>
            ))}
          </ul>

            <div className="mt-3 d-grid gap-2">
              <button 
              className="btn btn-success"
              onClick={finalizarCompra}
              disabled={carrito.length === 0}
              >
                Finalizar compra
              </button>

              {mensajeCheckout && (
                <div 
                  className={`alert ${
                    mensajeCheckout.tipo === "ok" ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                >
                  {mensajeCheckout.texto}
                </div>
              )}
            </div>

          </div>
        </aside>
      </main>
    </div>
  )
}



export default App