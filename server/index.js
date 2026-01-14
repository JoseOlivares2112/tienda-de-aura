const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));    

app.use(express.json());

const productos = [
        { 
            id: 1, 
            nombre: "Pulsera de cuero (api)", 
            precio: 5990,
            categoria: "Pulseras",
            descripcion: "Bonita pulsera de cuero ajustable, estilo minimalista",
            imagen: "https://madeheart.com/media/productphoto/812/40627737/211_2.jpg"
         },
        { 
            id: 2, 
            nombre: "Collar de plata", 
            precio: 12990,
            categoria: "Collares",
            descripcion: "Collar de plata con diseño de colibrí con bonitas incrustaciones de colores",
            imagen: "https://resources.sears.com.mx/medios-plazavip/mkt/60e4b25835600_colibri-2jpg.jpg?scale=500&qlty=75"
         },
        { 
            id: 3, 
            nombre: "Aros dorados",
            precio: 7990,
            categoria: "Aros",
            descripcion: "Elegantes aros de oro puro de diseño simple",
            imagen: "https://joyaspatriciolillo.cl/wp-content/uploads/2023/12/20190820_171341.jpg"
         },
    ];



app.get("/", (req, res) => {
    res.json({ mensaje: "Backend funcionando ✅"});
});

app.get("/api/productos", (req, res) => {
    res.json(productos);
});

app.post("/api/echo", (req, res) => {
    const {producto, cantidad} = req.body;

    //validación básica
    if (!producto || typeof producto !== "string"){
        return res.status(400).json({
            error: "El campo 'producto' es obligatorio y debe ser texto"
        });
    }

    if (!cantidad || typeof cantidad !== "number" || cantidad <= 0){
        return res.status(400).json({
            error: "El campo 'cantidad' es obligatorio y debe ser un número mayor a 0 "
        });
    }

    res.status(201).json({
        mensaje: "Datos recibidos correctamente",
        data: {
            producto,cantidad
        }
    });
});

app.post("/api/checkout", (req, res) =>{
    const { items, total } = req.body;

    //validar presencia
    if (!items, Array.isArray(items) || items.length === 0){
        return res.status(400).json({
            error: "el carrito debe tener al menos un item"
        });
    } 

    if (typeof total !== "number" || total <= 0){
        return res.status(400).json({
            error: "El total debe ser un número válido"
        });
    }
    // recalcular total real desde el backend

    let totalCalculado =0;

    for ( const item of items) {
        const producto = productos.find(p => p.id === item.id);

        if (!producto) {
            return res.status(400).json({
                error: `Producto con id ${item.id} no existe`
            });
        }

        if(typeof item.cantidad !== "number" || item.cantidad <= 0){
            return res.status(400).json({
                error: "cantidad inválida en el carrito"
            });
        }

        totalCalculado += producto.precio * item.cantidad;
    }

    // comparar totales

    if (totalCalculado !== total) {
        return res.status(400).json({
            error:"El total enviado no coincide con el total real",
            totalEsperado : totalCalculado
        });
    }

    //checkout exitoso

    res.status(201).json({
        mensaje: "Compra realizada con éxito",
        total: totalCalculado,
        items
    });

});

app.listen(3000, () => {
    console.log("✅ Servidor corriendo en http://localhost:3000");
});



