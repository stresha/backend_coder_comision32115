import { Router } from "express";
import { isAdmin } from "../middlewares/admin.js";
import { productGet, productGetById, productDelete, productPost, productPut } from "./productLogicRoutes.js";

const productsRouter = Router()

productsRouter.get('/',productGet)
productsRouter.get('/:id',productGetById)
productsRouter.post('/',isAdmin ,productPost)
productsRouter.put('/:id',isAdmin ,productPut)
productsRouter.delete('/:id',isAdmin ,productDelete)

export{productsRouter}