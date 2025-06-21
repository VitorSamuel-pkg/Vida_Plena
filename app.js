const express = require("express");
const clienteRoutes = require("./src/routes/clienteRoutes");
const app = express();

const PORT = 8081;
app.use(express.json());
app.use("/clientes", clienteRoutes.rotasClientes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em ${PORT}`)});
