const { sequelize } = require("../config/db");
const { DataTypes } = require('sequelize');

const { produtoModel } = require('./produtoModel');

const estoqueModel = sequelize.define('Estoque', {
    ID_Estoque:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    qtdEntradaProduto:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qtdSaidaProdutos:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProdutoEstoque:{
        type: DataTypes.INTEGER,
        references:{
            model: produtoModel,
            key: 'ID_Produto'
        },
        allowNull: false
    }

},{
     tableName: 'Estoque',
     timestamps: false
});

produtoModel.hasMany(estoqueModel, {estoqueModel, foreignKey: 'idProdutoEstoque', as: 'idProdutosEstoque'});
estoqueModel.belongsTo(produtoModel, {estoqueModel, foreignKey: 'idProdutoEstoque', as: 'idEstoqueProdutos'});

module.exports = {estoqueModel};