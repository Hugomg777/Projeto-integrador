const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Pedido = require('./Pedido'); 
const Produto = require('./produto'); 

const PedidoProduto = sequelize.define('PedidoProduto', {
  id_pedido_produto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Chaves estrangeiras para conectar com outras tabelas
  id_pedido: {
    type: DataTypes.INTEGER,
    references: {
      model: Pedido, // 'Pedidos'
      key: 'id_pedido'
    }
  },
  id_produto: {
    type: DataTypes.INTEGER,
    references: {
      model: Produto, // 'Produtos'
      key: 'id_produto'
    }
  }
}, {
  tableName: 'pedido_produtos',
  timestamps: false
});

// Definindo as associações
Pedido.belongsToMany(Produto, { through: PedidoProduto, foreignKey: 'id_pedido' });
Produto.belongsToMany(Pedido, { through: PedidoProduto, foreignKey: 'id_produto' });

module.exports = PedidoProduto;