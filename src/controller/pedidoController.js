const { default: Message } = require('tedious/lib/message');
const {pedidoModel} = require('../models/pedidoModel');
const pM = require('../models/produtoModel');
const { Op } = require('sequelize');
const { produtoModel } = require('../models/produtoModel');

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
            console.error('Erro ao listar Pedidos', error)
            return res.status(500).json({message: 'Erro ao listar Pedidos'})
        }
    }, 
    cadastrarPedido: async(req, res)=>{
        try {


            const {numeroPedido, valorTotal, dataPedido, idPedidoCliente } = req.body;

            if (!numeroPedido || !valorTotal || !dataPedido || !idPedidoCliente){
                return res.status(400).json({message: "Campos obrigatórios não preenchidos!"});
            } 

            const pedidoExistente = await pedidoModel.findOne({ where: { numeroPedido } });

            if (pedidoExistente) {
                return res.status(409).json({ message: 'Pedido já cadastrado!' });
            }


            await pedidoModel.create({numeroPedido, valorTotal, dataPedido, idPedidoCliente});

            return res.status(201).json({message: 'Pedido cadastrado com sucesso!'});

        } catch (error) {
            console.error("Erro ao cadastrar pedido!", error);
            return res.status(500).json({message: "Erro ao cadastrar pedido!"})
        }
    },
   atualizarPedido: async (req, res) => {
    try {
        const { ID_Pedido } = req.params;
        const { numeroPedido, valorTotal, dataPedido } = req.body;

        let pedido = await pedidoModel.findByPk(ID_Pedido);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado!' });
        }

        let dadosAtualizado = {
            numeroPedido,
            valorTotal,
            dataPedido,
            
        };

        await pedidoModel.update(dadosAtualizado, { where: { ID_Pedido } });

        pedido = await pedidoModel.findByPk(ID_Pedido);
        return res.status(200).json({ message: 'Pedido atualizado com sucesso', pedido: pedido });

    } catch (error) {
        console.error("Erro ao atualizar Pedido!", error);
        return res.status(500).json({ message: "Erro ao atualizar pedido!" });
    };
  },
    deletarPedido: async(req, res)=>{

       try {

        const {ID_Pedido} = req.params;
        let pedido = await pedidoModel.findByPk(ID_Pedido);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado!' });
        }

        let numeroPedido = pedido.numeroPedido;

        let result = await pedidoModel.destroy({where: {ID_Pedido}});

        if (result>0) {
            return res.status(200).json({message: `${numeroPedido} foi excluido com sucesso!`});
        } else{
            return res.status(404).json({message: 'Erro ao Excluir pedido!'});
        }

        } catch (error) {
            console.error('Erro ao excluir pedido:', error);
            return res.status(500).json({message: 'Erro ao excluir pedido'});
        }

    }
};

module.exports= {pedidoController};