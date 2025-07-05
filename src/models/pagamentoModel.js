const { sequelize } = require("../config/db");
const { DataTypes } = require('sequelize');
const { pedidoModel } = require('./pedidoModel');
const { clienteModel } = require('./clienteModel');

const pagamentoModel = sequelize.define('Pagamentos', {
    ID_Pagamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    formaPagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idPagamentoPedido: {
        type: DataTypes.INTEGER,
        references: {
            model: pedidoModel,
            key: 'ID_Pedido'
        },
        allowNull: false
    },
    idPagamentoCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: clienteModel,
            key: 'ID_Cliente'
        },
        allowNull: false
    },
    statusPagamento: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ativo' // Valores possíveis: 'ativo', 'cancelado', etc.
    }
}, {
    tableName: 'Pagamentos',
    timestamps: false
});

// Relacionamentos
pedidoModel.hasMany(pagamentoModel, { foreignKey: 'idPagamentoPedido', as: 'pedidoPagamento' });
pagamentoModel.belongsTo(pedidoModel, { foreignKey: 'idPagamentoPedido', as: 'pagamentoPedido' });

clienteModel.hasMany(pagamentoModel, { foreignKey: 'idPagamentoCliente', as: 'clientePagamento' });
pagamentoModel.belongsTo(clienteModel, { foreignKey: 'idPagamentoCliente', as: 'pagamentoCliente' });

module.exports = { pagamentoModel };
