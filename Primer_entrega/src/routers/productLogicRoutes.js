import { FileSystemCont } from "../api/fileSystem.js";
import { config } from "../config/config.js";
import { errors } from "../utils/errors.js";
import { joiValidator } from "../utils/joiValidators.js";
import { request, response } from "express";

const apiProducts = new FileSystemCont(config.db.products)

const productGet = async (request, response)=>{
    try{
        const products = await apiProducts.getAll()
        response.send(products)
    }catch(error){
        response.send(error)
    }
}

const productGetById = async (request,response)=>{
    try{
        const {id}= request.params
        const product = await apiProducts.getById(id)

        if(!product){
            throw{error: errors.messages.noProduct}
        }

        response.send(product)
    }catch(error){
        response.send(error)
    }
}

const productPost = async (request,response)=>{
    try{
        const{name,description,code,img,price,stock}=request.body

        const product = await joiValidator.product.validateAsync({
            name,
            description,
            code,
            img,
            price,
            stock,
        })

        const productSave = await apiProducts.save(product)

        response.send(productSave)
    }catch(error){
        response.send(error)
    }
}

const productPut = async(request, response)=>{
    try{
        const {id} = request.params
        const {name,description,code,img,price,stock} = request.body
        const product = await joiValidator.product.validateAsync({
            name,
            description,
            code,
            img,
            price,
            stock,
        })
        const productUpdate = await apiProducts.updateById(id, product)

        response.send(productUpdate)
    }catch(error){
        response.send(error)
    }
}

const productDelete = async (request,response) => {
    try{
        const {id} = request.params
        const product = await apiProducts.getById(id)
        if(!product){
            throw { error: errors.messages.noProduct}
        }
        const productDelete= await apiProducts.deleteById(id)
        response.send({
            mensaje: 'Producto exitosamente eliminado',
            productoEliminado: productDelete,
        })
    }catch(error){
        response.send(error)
    }
}

export {productGet,productGetById,productPost,productPut,productDelete}