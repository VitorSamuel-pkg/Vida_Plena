const express = require("express");
const router = express.Router(); 
const {clienteModel} = require("../models/clienteModel")
const {clienteController} = require("../controller/clienteController")

router.get("/", clienteController.listarClientes);

router.post("/", clienteController.cadastrarCliente);

router.put("/:ID_Cliente", clienteController.atualizarCliente);

router.delete("/:ID_Cliente" , clienteController.deletarCliente);

module.exports = { rotasClientes: router};    

/*const teste = async ()=> {
    const dados = await clienteModel.findAll();

    console.log(dados);
}

teste();*/