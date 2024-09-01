const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.set("view engine", "ejs")

// Conexion de Mongo
// colocar el nombre al final tambien a la basde de datos en linea
mongoose.connect("mongodb://localhost:27017/tiendaVelas").then(()=>{
    console.log("Conectado a Mongo")
}).catch(error=>{
    console.log("Se produjo el siguiente error: ", error)
})

// Definimos un Schema
const productSchema = new mongoose.Schema({
    nombre:{type:String, unique:true},
    descripcion:String,
    duracion:Number,
    Tamanio:Number,
    precio:Number,
    imagen:String
})

const Producto = mongoose.model("Producto", productSchema) //con Producto. accedo a metodos de Mongoose


app.get("/", async(req, res)=>{
    const productos = await Producto.find()
    res.render('index', {productos})
})


app.get("/add-products", async (req, res) => {
    const products = [
        {
            nombre: "Vela de prueba",
            descripcion: "Esencia a vainilla y café",
            duracion: 9,
            Tamanio: 20,
            precio: 6700,
            imagen: "https://picsum.photos/200"
        },
        {
            nombre: "Vela corazon",
            descripcion: "Rosas",
            duracion: 7,
            Tamanio: 15,
            precio: 6200,
            imagen: "https://picsum.photos/200"
        },
        {
            nombre: "Vela Verde",
            descripcion: "Esencia a menta",
            duracion: 11,
            Tamanio: 17,
            precio: 7000,
            imagen: "https://picsum.photos/200"
        }
    ];

    await Producto.insertMany(products)
    console.log("Funciono")
    res.send("Productos agregados exitosamente")
})

// mongodb://localhost:27017
app.listen(3900,()=>{
    console.log("El servidor está funcionando")
})