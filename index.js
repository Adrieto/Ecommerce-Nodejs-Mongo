const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.set("view engine", "ejs")

app.get("/",(req, res)=>{
    res.render('index')
})


app.listen(3900,()=>{
    console.log("El servidor está funcionando")
})