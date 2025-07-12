const express = require('express');
const router = express.Router();
const pedidoProdutoController = require('../controller/pedidoProdutoController');

router.post('/', pedidoProdutoController.criar);
router.get('/', pedidoProdutoController.listarTodos);
router.get('/:ID_Pedido', pedidoProdutoController.listarPorPedido);
router.delete('/:ID_pedidoProdutos', pedidoProdutoController.deletar);

module.exports = router;
