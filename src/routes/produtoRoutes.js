const express = require("express");
const router = express.Router(); //instancia o router, um objeto do express usado para definir rotas de forma modular e organizada.
const {produtoModel} = require("../models/produtoModel")
const {produtoController} = require("../controller/produtoController")

router.get("/", produtoController.listarProdutos);

router.post("/", produtoController.cadastrarProduto);

router.put("/:ID_Produto", produtoController.atualizarProduto);

router.delete("/:ID_Produto" , produtoController.deletarProduto);

module.exports = {rotasProdutos: router};    

/*const teste = async ()=> {
    const dados = await produtoModel.findAll();

    console.log(dados);
}

teste();*/