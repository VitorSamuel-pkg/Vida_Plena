const { pedidoProduto } = require('../models/pedidoProdutoModel');


  const pedidoProdutoController = {
  async criar(req, res) {
    try {
      const { ID_Pedido, ID_Produto, quantidade } = req.body;

      const novo = await pedidoProduto.create({
        ID_Pedido,
        ID_Produto,
        quantidade
      });

      res.status(201).json(novo);
    } catch (err) {
      res.status(500).json({
        erro: 'Erro ao criar item do pedido',
        detalhes: err.message
      });
    }
  },

  async listarTodos(req, res) {
    try {
      const lista = await pedidoProduto.findAll();
      res.json(lista);
    } catch (err) {
      res.status(500).json({
        erro: 'Erro ao buscar todos os itens de pedidos',
        detalhes: err.message
      });
    }
  },

  async listarPorPedido(req, res) {
    try {
      const { ID_Pedido } = req.params;

      const itens = await pedidoProduto.findAll({
        where: { ID_Pedido }
      });

      res.json(itens);
    } catch (err) {
      res.status(500).json({
        erro: 'Erro ao buscar itens do pedido',
        detalhes: err.message
      });
    }
  },

  async deletar(req, res) {
    try {
      const { ID_pedidoProdutos } = req.params;

      await pedidoProduto.destroy({
        where: { ID_pedidoProdutos }
      });

      res.status(204).send();
    } catch (err) {
      res.status(500).json({
        erro: 'Erro ao deletar item do pedido',
        detalhes: err.message
      });
    }
  }};

module.exports = pedidoProdutoController;