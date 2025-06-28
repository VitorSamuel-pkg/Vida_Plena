const { default: Message } = require('tedious/lib/message');
const {estoqueModel} = require('../models/estoqueModel');
const { Op } = require('sequelize');
const { produto } = require ('../models/produtoModel');

const estoqueController = {
    listarEstoque: async(req, res)=>{
        try {
            let {nomeProduto} = req.query;

            let conditions = {};
            
            if (nomeProduto) {
                conditions.nomeProduto = nomeProduto;
            }

            let estoque = await estoqueModel.findAll({
                where: conditions
            });
            return res.status(200).json(estoque);
        } catch (error) {
            console.error('Erro ao listar estoque', error)
            return res.status(500).json({message: 'Erro ao listar estoque'})
        }
    }, 
    atualizarEntrada: async(req, res)=>{
        try {
            
            const {nomeProduto, valorProduto, tipoProduto, marcaProduto} = req.body;

            if (!nomeProduto || !valorProduto || !tipoProduto || !marcaProduto){
                return res.status(400).json({message: "Campos obrigatórios não preenchidos!"});
            } 


            } catch (error) {
            console.error("Erro ao cadastra cliente!", error);
            return res.status(500).json({message: "Erro ao cadastrar estoque!"})
        }
    },

   atualizarSaida: async (req, res) => {
    try {
        const { ID_Produto } = req.params;
       

        let produto = await estoqueModel.findByPk(idEstoqueProduto);

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        /*
        if (produto) {
            const ID_Produto = await estoqueModel.findOne({
                where: { ID_Produto: { [Op.ne]: ID_Produto } }
            });

            if (ID_Produto) {
                return res.status(409).json({ message: 'Produto existente' });
            }
       
        }*/

        let dadosAtualizado = {
            qtdSaidoProduto
            
        };

        await estoqueModel.update(dadosAtualizado, { where: { ID_Produto } });

        produto = await estoqueModel.findByPk(idEstoqueProduto);
        return res.status(200).json({ message: 'Produto atualizado com sucesso'});

    } catch (error) {
        console.error("Erro ao atualizar produto!", error);
        return res.status(500).json({ message: "Erro ao atualizar cliente!" });
    };
  },

}

module.exports= {clienteController};