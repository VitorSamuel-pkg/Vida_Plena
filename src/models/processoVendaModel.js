const { sequelize } = require("../config/db");
const { DataTypes } = require('sequelize');

const { produtoModel } = require('./produtoModel');
const { pedidoModel } = require('./pedidoModel');

const processoVendaModel = sequelize.define('ProcessoVendas', {
    ID_ProcessoVenda:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idProcessoProdutos:{
        type: DataTypes.INTEGER,
        references:{
            model: produtoModel,
            key: 'ID_Produto'
        },
        allowNull: false
    },
    idProcessoPedidos:{
        type: DataTypes.INTEGER,
        references:{
            model: pedidoModel,
            key: 'ID_Pedido'
        },
        allowNull: false
    }
},{
     tableName: 'ProcessoVendas',
     timestamps: false
});

produtoModel.belongsToMany(pedidoModel, {through: processoVendaModel, foreignKey: 'idProcessoProdutos', as: 'produtoPedido'});

pedidoModel.belongsToMany(produtoModel, {through: processoVendaModel, foreignKey: 'idProcessoPedidos', as: 'pedidoProduto'});

module.exports = {processoVendaModel};