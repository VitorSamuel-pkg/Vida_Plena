const express = require("express");
const router = express.Router(); //instancia o router, um objeto do express usado para definir rotas de forma modular e organizada.
const {pagamentoModel} = require("../models/pagamentoModel");
const {pagamentoController} = require("../controller/pagamentoController")

router.get("/", pagamentoController.listarPagamento);

router.post("/", pagamentoController.cadastrarPagamento);

router.put("/:ID_Pagamento", pagamentoController.atualizarPagamento);

router.delete("/:ID_Pagamento" , pagamentoController.deletarPagamento);

module.exports = {rotasPagamento: router};    

/*const teste = async ()=> {
    const dados = await pagamentoModel.findAll();

    console.log(dados);
}

teste();*/