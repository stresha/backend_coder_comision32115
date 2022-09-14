const express = require("express");
const router1 = express.Router();
const router2 = express.Router();
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/productos", router1);
app.use("/api/carrito", router2);

app.listen(port, () => {
  console.log("Server activo en http://localhost:" + port);
});

app.get("/server", (req, res) => {
  res.send({ server: "Express" });
});

const Contenedor = require("./src/contenedor");
let archivo = new Contenedor("./src/productos.json");

app.get("/public", (res, req) => {
  res.sendFile(__dirname + "./public/index.html");
});

router1.get("/", async (req, res) => {
  const lista = await archivo.getAll();

  res.send(lista);
});

router1.get("/:id", async (req, res) => {
  const { id } = req.params;
  const productById = await archivo.getById(id);

  if (productById) {
    res.send(productById);
  } else {
    res.send(`NO existe un producto con id ${id}.`);
  }
});

router1.post("/", async (req, res) => {
  const { body } = req;

  await archivo.saveNewProduct(body);

  res.send(body);
});

router1.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const borrado = await archivo.deleteById(id);

  if (borrado) {
    res.send({ borrado });
    console.log("Producto borrado: ", borrado);
  } else {
    res.send("El producto que se intenta borrar no existe.");
  }
});

router1.put("/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const anterior = await archivo.getById(id);

  const nuevo = await archivo.updateById(id, body);

  if (anterior) {
    res.send({ anterior, nuevo });
  } else {
    res.send(`El producto ${id} no existe`);
  }
});
