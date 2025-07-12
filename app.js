const express = require("express");
require("dotenv").config();

const clienteRoutes = require("./src/routes/clienteRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");
const estoqueRoutes = require("./src/routes/estoqueRoutes");
const pedidoRoutes = require("./src/routes/pedidoRoutes");
const pagamentoRoutes = require("./src/routes/pagamentoRoutes");
const pedidoProdutoRoutes = require ("./src/routes/pedidoProdutosRoutes");
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use("/clientes", clienteRoutes.rotasClientes);
app.use("/estoque", estoqueRoutes.rotasEstoque);
app.use("/produtos", produtoRoutes.rotasProdutos);
app.use("/pedidos", pedidoRoutes.rotasPedido);
app.use("/pagamentos", pagamentoRoutes.rotasPagamento);
app.use("/pedido-produto", pedidoProdutoRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em ${PORT}`)
});
