require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Asegúrate de que esté importado

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb+srv://gimenezsabrina244:yYgeukFTSpc4ErjP@cluster0.ins8x.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => console.log('Conectado a MongoDB'));

// Definir el esquema y modelo
const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
});

const Producto = mongoose.model('Producto', productoSchema);

// 📌 🔹 **Nueva Ruta para listar los endpoints**
app.get('/routes', (req, res) => {
  const routes = app._router.stack
    .filter(layer => layer.route) // Filtra solo rutas definidas
    .map(layer => ({
      method: Object.keys(layer.route.methods)[0].toUpperCase(),
      path: layer.route.path
    }));

  res.json(routes);
});

// Rutas CRUD
app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
});

app.post('/productos', async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el producto' });
  }
});

app.put('/productos/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el producto' });
  }
});

app.delete('/productos/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar el producto' });
  }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
