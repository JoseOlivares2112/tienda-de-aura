const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensaje: "Backend funcionando ✅"});
});

app.get("/api/productos", (req, res) => {
    const productos = [
        { id: 1, nombre: "Pulsera de cuero", precio: 5990 },
        { id: 2, nombre: "Collar de plata", precio: 12990 },
        { id: 3, nombre: "Aros dorados", precio: 7990 }
    ];

    res.json(productos);
});

app.post("/api/echo", (req, res) => {
    res.json({
        recibido: req.body
    });
});

app.listen(3000, () => {
    console.log("✅ Servidor corriendo en http://localhost:3000");
});



