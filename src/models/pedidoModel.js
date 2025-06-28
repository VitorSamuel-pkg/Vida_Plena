const { sequelize } = require("../config/db");
const { DataTypes } = require('sequelize');

const { clienteModel } = require('./clienteModel');

const pedidoModel = sequelize.define('Pedidos',{
    ID_Pedido:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numeroPedido:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valorTotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    dataPedido:{
        type: DataTypes.DATE,
        allowNull: false
    },
    idPedidoCliente:{
        type: DataTypes.INTEGER,
        references:{
            model: clienteModel,
            key: 'ID_Cliente'
        },
        allowNull: false
    }
},{
    tableName: 'Pedidos',
    timestamps: false
});

clienteModel.hasMany(pedidoModel, {foreignKey: 'idPedidoCliente', as: 'Cliente'});
pedidoModel.belongsTo(clienteModel, {foreignKey: 'idPedidoCliente', as: 'Cliente'});

module.exports = {pedidoModel};