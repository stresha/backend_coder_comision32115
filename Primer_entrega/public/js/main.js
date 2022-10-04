import { apiRoutes } from "./routes.js";
import { utils } from "./utils.js";

const getProductsBtn = document.getElementById("getProductsBtn");
const productsList = document.getElementById("productsList");

const getProducts = async ()=>{
    const products = await apiRoutes.getProducts();
    productsList.innerHTML= await utils.createProdTable(products);
}

getProductsBtn.addEventListener("click", getProducts);