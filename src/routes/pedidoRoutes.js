const express = require("express");
const router = express.Router(); 

const {pedidoController} = require("../controller/pedidoController")

router.get("/", pedidoController.listarPedido);

router.post("/", pedidoController.cadastrarPedido);

router.put("/:ID_Pedido", pedidoController.atualizarPedido);

router.delete("/:ID_Pedido" , pedidoController.deletarPedido);

module.exports = { rotasPedido: router};    