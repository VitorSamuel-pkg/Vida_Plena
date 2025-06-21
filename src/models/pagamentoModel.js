const { sequelize } = require("../config/db");
const { DataTypes } = require('sequelize');

const { pedidoModel } = require('./pedidoModel');

const pagamentoModel = sequelize.define('Pagamentos', {
    ID_Pagamento:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    formaDePagamento:{
        type: DataTypes.STRING,
        allowNull: false
    },
    idPagamentoPedido:{
        type: DataTypes.INTEGER,
        references:{
            model: pedidoModel,
            key: 'ID_Pedido'
        },
        allowNull: false
    },
     idPagamentoCliente:{
        type: DataTypes.INTEGER,
        references:{
            model: clienteModel,
            key: 'ID_Cliente'
        },
        allowNull: false
    }
},{
    tableName: 'Pagamentos',
    timestamps: false
});

pedidoModel.hasMany(pagamentoModel, {foreignKey: 'idPagamentoPedido', as: 'Pedido'});
pagamentoModel.belongsTo(pedidoModel, {foreignKey: 'idPagamentoPedido', as: 'Pedido'});

module.exports = { pagamentoModel };
