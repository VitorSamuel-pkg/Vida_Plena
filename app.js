const express = require("express");
const clienteRoutes = require("./src/routes/clienteRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");
const estoqueRoutes = require("./src/routes/estoqueRoutes");
const pedidoRoutes = require("./src/routes/pedidoRoutes");
const app = express();

const PORT = 8081;
app.use(express.json());
app.use("/clientes", clienteRoutes.rotasClientes);
app.use("/estoque", estoqueRoutes.rotasEstoque);
app.use("/produtos", produtoRoutes.rotasProdutos);
app.use("/pedidos", pedidoRoutes.rotasPedido);




app.listen(PORT, ()=>{
    console.log(`Servidor rodando em ${PORT}`)});
