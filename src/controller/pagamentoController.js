const { default: Message } = require('tedious/lib/message');
const {pagamentoModel} = require('../models/pagamentoModel');
const {clienteModel} = require('../models/clienteModel')
const {pedidoModel} = require('../models/pedidoModel')
const { Op } = require('sequelize');

const pagamentoController = {
    listarPagamento: async(req, res)=>{
        try {
            let {ID_Pagamento} = req.query;

            let conditions = {};
            
            if (ID_Pagamento) {
                conditions.ID_Pagamento = ID_Pagamento;
            }

            let pagamentos = await pagamentoModel.findAll({
                where: conditions
            });
            return res.status(200).json(pagamentos);
        } catch (error) {
            console.error('Erro ao listar o pagamento', error)
            return res.status(500).json({message: 'Erro ao listar o pagamento'})
        }
    }, 
    cadastrarPagamento: async(req, res)=>{
        try {
            
            const {formaDePagamento, idPagamentoPedido, idPagamentoCliente} = req.body;

            if (!formaDePagamento || !idPagamentoPedido || !idPagamentoCliente){
                return res.status(400).json({message: "Campos obrigatórios não preenchidos!"});
            } 

            const pedido = await pedidoModel.findByPk(idPagamentoPedido);
            const cliente = await clienteModel.findByPk(idPagamentoCliente);

            if(!pedido || !cliente){
                return res.status(404).json({message: 'pedido ou cliente nao encontrado!'});
            }

            await pagamentoModel.create({formaPagamento, idPagamentoPedido, idPagamentoCliente});

            return res.status(201).json({message: 'Pagamento feito com sucesso!'});

        } catch (error) {
            console.error("Erro ao efetuar ao pagamento!", error);
            return res.status(500).json({message: "Erro ao efetuar ao pagamento!"})
        }
    },
   atualizarPagamento: async (req, res) => {
    try {
        const { ID_Cliente } = req.params;
        const { nomeCliente, cpfCliente, emailCliente, telefoneCliente, cepCliente } = req.body;

        let cliente = await clienteModel.findByPk(ID_Cliente);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' });
        }

        if (cpfCliente) {
            const cpfExistente = await clienteModel.findOne({
                where: { cpfCliente, ID_Cliente: { [Op.ne]: ID_Cliente } }
            });

            if (cpfExistente) {
                return res.status(409).json({ message: 'CPF já está em uso por outro cliente.' });
            }
        }
        if (emailCliente) {
            const emailExistente = await clienteModel.findOne({
                where: { emailCliente, ID_Cliente: { [Op.ne]: ID_Cliente } }
            });

            if (emailExistente) {
                return res.status(409).json({ message: 'Email já está em uso por outro cliente.' });
            }
        }

        let dadosAtualizado = {
            nomeCliente,
            cpfCliente,
            emailCliente,
            telefoneCliente,
            cepCliente
        };

        await clienteModel.update(dadosAtualizado, { where: { ID_Cliente } });

        cliente = await clienteModel.findByPk(ID_Cliente);
        return res.status(200).json({ message: 'Cliente atualizado com sucesso', Cliente: cliente });

    } catch (error) {
        console.error("Erro ao atualizar cliente!", error);
        return res.status(500).json({ message: "Erro ao atualizar cliente!" });
    };
  },
    deletarPagamento: async(req, res)=>{

       try {

        const {ID_Cliente} = req.params;
        let cliente = await clienteModel.findByPk(ID_Cliente);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' });
        }

        let nomeCliente = cliente.nomeCliente;

        let result = await clienteModel.destroy({where: {ID_Cliente}});

        if (result>0) {
            return res.status(200).json({message: `${nomeCliente} foi excluido com sucesso!`});
        } else{
            return res.status(404).json({message: 'Erro ao Excluir cliente!'});
        }

        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            return res.status(500).json({message: 'Erro ao excluir cliente'});
        }

    }
};

module.exports= {pagamentoController};