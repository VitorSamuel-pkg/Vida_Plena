const {sequelize} = require('../config/db')
const {DataTypes} = require('sequelize')



  const pedidoProduto = sequelize.define('pedidoProduto', {
    ID_pedidoProdutos: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ID_Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_Produto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'pedidosProdutos',
    timestamps: false
  });

  pedidoProduto.associate = (models) => {
    pedidoProduto.belongsTo(models.Pedidos, {
      foreignKey: 'ID_Pedido',
      as: 'pedido'
    });

    pedidoProduto.belongsTo(models.Produtos, {
      foreignKey: 'ID_Produto',
      as: 'produto'
    });
  ;
};

module.exports = { pedidoProduto }; 