const express = require("express");
const router = express.Router(); 

const {estoqueController} = require("../controller/estoqueController");
const { estoqueModel } = require("../models/estoqueModel");

router.get("/", estoqueController.listarEstoque);

router.put("/:ID_Estoque", estoqueController.atualizarEntrada);

router.put("/:ID_Estoque", estoqueController.atualizarSaida);

module.exports = { rotasEstoque: router};    

/*const teste = async ()=> {
    const dados = await estoqueModel.findAll();

    console.log(dados);
}

teste();
*/

module.exports = { rotasEstoque: router};    
