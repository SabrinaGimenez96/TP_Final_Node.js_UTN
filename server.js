require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();


app.use(express.json());
app.use(cors());


app.use('/productos', productoRoutes);


app.get('/routes', (req, res) => {
    const routes = app._router.stack
        .filter(layer => layer.route)
        .map(layer => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path
        }));

    res.json(routes);
});


app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
