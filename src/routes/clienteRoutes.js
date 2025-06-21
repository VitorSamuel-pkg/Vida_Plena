const express = require("express");
const router = express.Router(); //instancia o router, um objeto do express usado para definir rotas de forma modular e organizada.

const {clienteController} = require("../controller/clienteController")

router.get("/", clienteController.listarClientes);

router.post("/", clienteController.cadastrarCliente);

router.put("/:ID_Cliente", clienteController.atualizarCliente);

router.delete("/:ID_Cliente" , clienteController.deletarCliente);

module.exports = { rotasClientes: router};    