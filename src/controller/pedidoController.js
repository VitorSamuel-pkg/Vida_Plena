const { default: Message } = require('tedious/lib/message');
const {pedidoModel} = require('../models/pedidoModel');
const { Op } = require('sequelize');

const pedidoController = {
    listarPedidos: async(req, res)=>{
        try {
            let {numeroPedido} = req.query;

            let conditions = {};
            
            if (numeroPedido) {
                conditions.numeroPedido = numeroPedido;
            }

            let pedido = await pedidoModel.findAll({
                where: conditions
            });
            return res.status(200).json(pedido);
        } catch (error) {
            console.error('Erro ao listar Produtos', error)
            return res.status(500).json({message: 'Erro ao listar Produtos'})
        }
    }, 
    cadastrarPedido: async(req, res)=>{
        try {
            
            const {nomeProduto, valorProduto, tipoProduto, marcaProduto} = req.body;

            if (!nomeProduto || !valorProduto || !tipoProduto ||!marcaProduto){
                return res.status(400).json({message: "Campos obrigatórios não preenchidos!"});
            } 

            if(produto){
                return res.status(409).json({message: 'Produto já cadastrado!'});
            }

            await produtoModel.create({nomeProduto, valorProduto, tipoProduto, marcaProduto});

            return res.status(201).json({message: 'Produto cadastrado com sucesso!'});

        } catch (error) {
            console.error("Erro ao cadastrar produto!", error);
            return res.status(500).json({message: "Erro ao cadastrar produto!"})
        }
    },
   atualizarPedido: async (req, res) => {
    try {
        const { ID_Produto } = req.params;
        const { nomeProduto, valorProduto, tipoProduto, marcaProduto } = req.body;

        let produto = await produtoModel.findByPk(ID_Produto);

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        let dadosAtualizado = {
            nomeProduto,
            valorProduto,
            tipoProduto,
            marcaProduto
        };

        await produtoModel.update(dadosAtualizado, { where: { ID_Produto } });

        produto = await produtoModel.findByPk(ID_Produto);
        return res.status(200).json({ message: 'Produto atualizado com sucesso', produto: produto });

    } catch (error) {
        console.error("Erro ao atualizar Produto!", error);
        return res.status(500).json({ message: "Erro ao atualizar produto!" });
    };
  },
    deletarPedido: async(req, res)=>{

       try {

        const {ID_Produto} = req.params;
        let produto = await produtoModel.findByPk(ID_Produto);

        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        let nomeProduto = produto.nomeProduto;

        let result = await produtoModel.destroy({where: {ID_Produto}});

        if (result>0) {
            return res.status(200).json({message: `${nomeProduto} foi excluido com sucesso!`});
        } else{
            return res.status(404).json({message: 'Erro ao Excluir Produto!'});
        }

        } catch (error) {
            console.error('Erro ao excluir Produto:', error);
            return res.status(500).json({message: 'Erro ao excluir Produto'});
        }

    }
};

module.exports= {pedidoController};