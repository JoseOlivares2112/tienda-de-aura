function Producto ({ nombre, precio, onAgregar }) {
    return (
        <li>
            {nombre} - ${precio}{" "}
            <button onClick={onAgregar}>Agregar</button>
        </li>
    )
}

export default Producto