const { sequelize } = require("../config/db");
const { DataTypes } = require('sequelize');

const produtoModel =  sequelize.define('Produtos',{
   ID_Produto:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
   },
   nomeProduto:{
        type: DataTypes.STRING,
        allowNull: false
   },
   valorProduto:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
   },
   tipoProduto:{
        type: DataTypes.STRING,
        allowNull: false
   },
   marcaProduto:{
        type: DataTypes.STRING,
        allowNull: true
   }
},{
    tableName: 'Produtos',
    timestamps: false
});

module.exports = {produtoModel};