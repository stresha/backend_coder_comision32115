import { FileSystemCont } from "../api/fileSystem.js";
import { config } from "../config/config.js";
import { errors } from "../utils/errors.js";
import { request,response } from "express";

const apiCart = new FileSystemCont(config.db.carts)
const apiProducts = new FileSystemCont(config.db.products)

const baseCart = {products:[],};

//creamos carrito
const cartPost = async(request,response)=>{
    try{
        const cart = await apiCart.save(baseCart)
        const cartId= cart.cartId
        response.send(cartId)
    }catch (error){
        response.send(error)
    }
}

//borramos carrito
const cartDelete = async (request, response)=>{
    try{
        const {id} =request.params
        const cart =await apiCart.getById(id)

        if(!cart){
            throw {error:errors.messages.noCart}
        }
        const cartDelete= await apiCart.deleteById(id)
        
        response.send({
            mensaje:'Carrito eliminado con exito',
            cartDelete: cartDelete,
        })
    }catch(error){
        response.send(error)
    }
}

//mostramos productos del carrito
const cartGetProducts = async (request, response)=>{
    try{
        const {id}= request.params
        const cart = await apiCart.getById(id)

        if(!cart){
            throw{error: errors.messages.noCart}
        }

        response.send(cart.products)
    }catch(error){
        response.send(error)
    }
}

//agregamos un prod a nuestro cart
const cartPostProducts = async (request,response)=>{
    try{
        const {id}=request.params
        const productId=request.body["id"]
        
        const carts= await apiCart.getById(id);
        console.log("soy un carrito" + carts)
        if(!carts){
            throw{error: errors.messages.noCart}
        }
        const product = await apiProducts.getById(productId)
        
        if(!product){
            throw{error: errors.messages.noProduct}
        }
        carts.products.push(product)
        console.log(carts.products)
        console.log("como todo funciono bien le hago un push")
        const cartUpdate = await apiCart.updateById(id, carts)
        console.log(cartUpdate)
        response.send(cartUpdate)
    }catch(error){
        response.send(error)
    }
}

//eliminamos producto del carrito
const cartDeleteProducts = async (request,response) => {
    try {
        const {id} = request.params
        const {prodId} =request.params

        let cart = await apiCart.getById(id)
        if(!cart){
            throw{error: errors.messages.noCart}
        }
        const product = cart.products.find((elem)=>elem.id == prodId)
        if(!product){
            throw{error: errors.messages.noProduct}
        }
        cart.products= cart.products.filter((elem)=> elem.id != prodId)
        const cartUpdate = apiCart.updateById(id,cart)
        response.send(cartUpdate)
    }catch(error){
        response.send(error)
    }
}

export {cartPost, cartDelete, cartPostProducts, cartGetProducts, cartDeleteProducts}