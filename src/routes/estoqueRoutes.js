const express = require("express");
const router = express.Router(); 

const {estoqueController} = require("../controller/estoqueController")

router.get("/", estoqueController.listarEstoque);

router.post("/", estoqueController.cadastrarEstoque);

router.put("/:ID_Estoque", estoqueController.atualizarEstoque);

router.delete("/:ID_Estoque" , estoqueController.deletarEstoque);

module.exports = { rotasEstoque: router};    