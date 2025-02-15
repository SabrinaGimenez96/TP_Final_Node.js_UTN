const mongoose = require('mongoose');
const Producto = require('../models/productoModel');
const connectDB = require('../config/connectDB');

connectDB();

const productos = [
    { nombre: "Ramo de rosas", precio: 20000,  descripcion: "Elegante, delicado y con mucha pasion" },
    { nombre: "Ramo de margaritas", precio: 18000, descripcion: "Hermoso, adorable y con mucha luz" }
];

const importarDatos = async () => {
    try {
        await Producto.deleteMany();
        await Producto.insertMany(productos);
        console.log('Datos insertados');
        process.exit();
    } catch (error) {
        console.error('Error al insertar datos:', error);
        process.exit(1);
    }
};

importarDatos();
