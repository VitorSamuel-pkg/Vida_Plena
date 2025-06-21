const { sequelize } = require("../config/db");
const { DataTypes } = require('sequelize');

const clienteModel =  sequelize.define('Clientes',{
    ID_Cliente:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeCliente:{
        type: DataTypes.STRING,
        allowNull: false
    },
    emailCliente:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpfCliente:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefoneCliente:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    

});