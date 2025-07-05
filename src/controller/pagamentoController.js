const { pagamentoModel } = require('../models/pagamentoModel');
const { clienteModel } = require('../models/clienteModel');
const { pedidoModel } = require('../models/pedidoModel');
const { Op } = require('sequelize');

const pagamentoController = {
    // Método para listar pagamentos, podendo filtrar por ID_Pagamento via query string
    listarPagamento: async (req, res) => {
        try {
            const { ID_Pagamento } = req.query;  // Pega o ID_Pagamento da query, se fornecido
            const conditions = {};

            if (ID_Pagamento) {
                // Se o ID for passado, adiciona como condição de filtro
                conditions.ID_Pagamento = ID_Pagamento;
            }

            // Busca todos os pagamentos que satisfazem as condições (ou todos se sem filtro)
            const pagamentos = await pagamentoModel.findAll({ where: conditions });
            return res.status(200).json(pagamentos);  // Retorna os pagamentos encontrados
        } catch (error) {
            console.error('Erro ao listar o pagamento', error);
            return res.status(500).json({ message: 'Erro ao listar o pagamento' });
        }
    },

    // Método para cadastrar um novo pagamento
    cadastrarPagamento: async (req, res) => {
        try {
            // Extrai os dados enviados no corpo da requisição
            const { formaDePagamento, idPagamentoPedido, idPagamentoCliente } = req.body;

            // Valida se todos os campos obrigatórios foram enviados
            if (!formaDePagamento || !idPagamentoPedido || !idPagamentoCliente) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos!" });
            }

            // Verifica se o pedido e o cliente existem no banco
            const pedido = await pedidoModel.findByPk(idPagamentoPedido);
            const cliente = await clienteModel.findByPk(idPagamentoCliente);

            if (!pedido || !cliente) {
                // Se algum deles não existir, retorna erro 404
                return res.status(404).json({ message: 'Pedido ou cliente não encontrado!' });
            }

            // Cria o pagamento no banco, definindo statusPagamento como 'ativo' por padrão
            const novoPagamento = await pagamentoModel.create({
                formaDePagamento,
                idPagamentoPedido,
                idPagamentoCliente,
                statusPagamento: 'ativo' // campo de controle de status do pagamento
            });

            return res.status(201).json({ message: "Pagamento cadastrado com sucesso!", pagamento: novoPagamento });
        } catch (error) {
            console.error("Erro ao cadastrar pagamento:", error);
            return res.status(500).json({ message: "Erro ao cadastrar pagamento." });
        }
    },

    // Método para atualizar um pagamento existente
    atualizarPagamento: async (req, res) => {
        try {
            const { ID_Pagamento } = req.params;  // ID do pagamento que será atualizado (via rota)
            const { formaDePagamento, idPagamentoPedido, idPagamentoCliente, statusPagamento } = req.body;

            // Busca o pagamento pelo ID
            const pagamento = await pagamentoModel.findByPk(ID_Pagamento);

            if (!pagamento) {
                // Se não encontrar o pagamento, retorna erro 404
                return res.status(404).json({ message: 'Pagamento não encontrado!' });
            }

            // Se o pagamento já estiver cancelado, bloqueia qualquer alteração
            if (pagamento.statusPagamento === 'cancelado') {
                return res.status(400).json({ message: 'Pagamento já está cancelado e não pode ser alterado.' });
            }

            // Atualiza os campos enviados no banco para o pagamento com o ID informado
            await pagamentoModel.update({
                formaDePagamento,
                idPagamentoPedido,
                idPagamentoCliente,
                statusPagamento // se quiser cancelar, basta enviar 'cancelado' aqui
            }, {
                where: { ID_Pagamento }
            });

            // Busca novamente o pagamento atualizado para enviar na resposta
            const atualizado = await pagamentoModel.findByPk(ID_Pagamento);
            return res.status(200).json({ message: 'Pagamento atualizado com sucesso.', pagamento: atualizado });

        } catch (error) {
            console.error("Erro ao atualizar pagamento!", error);
            return res.status(500).json({ message: "Erro ao atualizar pagamento!" });
        }
    }
};

module.exports = { pagamentoController };