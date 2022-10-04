import express from "express";
import { config } from "./config/config.js";
import { cartRouter } from "./routers/carROUTER.js";
import { productsRouter } from "./routers/productROUTER.js";

const app= express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(config.server.routes.products, productsRouter);
app.use(config.server.routes.carts, cartRouter);

const server = app.listen(config.server.PORT,()=>{
    console.log(`server corriendo en puerto ${server.address().port}`)
})

server.on('error',(error)=>{
    console.log(`Server error: ${error}`)
})
