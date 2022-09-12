import { Router } from "express";
import { itemNoDisp } from "../consts/index.js";
import { datos } from "../api/Contenedor.js";

const productRouter = Router();
const datosProd = new datos();

productRouter.get("/", (req, res) => {
  const response = datosProd.getAll();

  if (!response) res.send({ error: itemNoDisp });

  res.render("productos", { productos: response });
});

productRouter.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;

  datosProd.save({ title, price, thumbnail });

  res.redirect("/");
});

export { productRouter };