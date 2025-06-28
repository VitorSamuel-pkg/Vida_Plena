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
    qtdSaidaProduto:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEstoqueProduto:{
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

produtoModel.hasMany(estoqueModel, {foreignKey: 'idEstoqueProduto', as: 'Produto'});
estoqueModel.belongsToMany(produtoModel, {foreignKey: 'idEstoqueProduto', as: 'Produto'});

module.exports = {estoqueModel};