const express = require("express");
const clienteRoutes = require("./src/routes/clienteRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");
const app = express();

const PORT = 8081;
app.use(express.json());
app.use("/clientes", clienteRoutes.rotasClientes);
app.use("/estoques", produtoRoutes.rotasProdutos);
app.use("/pagamentos", produtoRoutes.rotasProdutos);
app.use("/pedidos", produtoRoutes.rotasProdutos);
app.use("/produtos", produtoRoutes.rotasProdutos);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em ${PORT}`)});
