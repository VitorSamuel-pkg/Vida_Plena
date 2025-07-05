const express = require("express");
const router = express.Router(); 
const {pedidoModel} = require("../models/pedidoModel")
const {pedidoController} = require("../controller/pedidoController")

router.get("/", pedidoController.listarPedidos);

router.post("/", pedidoController.cadastrarPedido);

router.put("/:ID_Pedido", pedidoController.atualizarPedido);

router.delete("/:ID_Pedido" , pedidoController.deletarPedido);

module.exports = { rotasPedido: router};    

/*const teste = async ()=> {
    const dados = await pedidoModel.findAll();

    console.log(dados);
}

teste();*/