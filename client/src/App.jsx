import { useEffect, useState } from "react"
import ListaProductos from "./components/ListaProductos"
import "./App.css"

function App() {
  const [productos] = useState([
    { id: 1, nombre: "Pulsera de cuero", precio: 5990 },
    { id: 2, nombre: "Collar de plata", precio: 12990 },
    { id: 3, nombre: "Aros dorados", precio: 7990 },
  ])

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito")
    return guardado ? JSON.parse(guardado) : []
  })

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

useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}, [carrito])

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
          <ListaProductos 
            productos={productos}
            onAgregarAlCarrito={onAgregarAlCarrito}
          />
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
          </div>
        </aside>
      </main>
    </div>
  )
}



export default App
