const { default: Message } = require('tedious/lib/message');
const { pagamentoModel } = require('../models/pagamentoModel');
const { clienteModel } = require('../models/clienteModel')
const { pedidoModel } = require('../models/pedidoModel')
const { Op, where } = require('sequelize');

const pagamentoController = {
    listarPagamento: async (req, res) => {
        try {
            let { ID_Pagamento } = req.query;

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
            return res.status(500).json({ message: 'Erro ao listar o pagamento' })
        }
    },
    cadastrarPagamento: async (req, res) => {
        try {

            const { formaDePagamento, idPagamentoPedido, idPagamentoCliente } = req.body;

            if (!formaDePagamento || !idPagamentoPedido || !idPagamentoCliente) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos!" });
            }

            const pedido = await pedidoModel.findByPk(idPagamentoPedido);
            const cliente = await clienteModel.findByPk(idPagamentoCliente);

            if (!pedido || !cliente) {
                return res.status(404).json({ message: 'pedido ou cliente nao encontrado!' });
            }

            const novoPagamento = await pagamentoModel.create((
                formaDePagamento,
                idPagamentoPedido,
                idPagamentoCliente
            ));

            res.status(201).json({ message: "pagamento cadastrado com sucesso!", pagamento: novoPagamento })

        } catch (error) {
            console.error("Erro ao cadastrar pagamento:", error);
            res.status(500).json({ message: "Erro ao cadastrar pagamento." });
        }
    },
    atualizarPagamento: async (req, res) => {
        try {
            const { ID_Pagamento } = req.params;
            const { formaDePagamento, idPagamentoPedido, idPagamentoCliente } = req.body;

            let pagamento = await pagamentoModel.findByPk(ID_Pagamento);

            if (!pagamento) {
                return res.status(404).json({ message: 'pagamento não encontrado!' });
            }

            await pagamentoModel.update({
                formaDePagamento,
                idPagamentoPedido,
                idPagamentoCliente
            }, {
                where: { ID_Pagamento }
            });

            const atualizado = await pagamentoModel.findByPk(ID_Pagamento);
            return res.status(200).json({ message: 'Pagamento atualizado com sucesso', pagamento: atualizado });

        } catch (error) {
            console.error("Erro ao atualizar pagamento!", error);
            return res.status(500).json({ message: "Erro ao atualizar pagamento!" });
        };
    },

    deletarPagamento: async (req, res) => {

        try {

            
            const { ID_Pagamento } = req.params;
            let pagamento = await pagamentoModel.findByPk({ ID_Pagamento });

            if (!pagamento) {
                return res.status(404).json({ message: 'Pagamento não encontrado!' });
            }

            let result = await pagamentoModel.destroy({ where: { ID_Pagamento } })

            if (result > 0) {
                return res.status(200).json({ message: `Pagamento Cancelado!` });
            } else {
                return res.status(404).json({ message: 'Erro ao cancelar' });
            }

        } catch (error) {
            console.error('Erro ao cancelar pagamento:', error);
            return res.status(500).json({ message: 'Erro ao cancelar pagamento' });
        }

    }
};

module.exports = { pagamentoController };