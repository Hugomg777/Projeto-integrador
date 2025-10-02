const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Carrinho = require('./Carrinho');
const Produto = require('./Product'); 

const CarrinhoProduto = sequelize.define('CarrinhoProduto', {
  id_carrinho_produto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Chaves estrangeiras para conectar com outras tabelas
  id_carrinho: {
    type: DataTypes.INTEGER,
    references: {
      model: Carrinho,
      key: 'id_carrinho'
    }
  },
  id_produto: {
    type: DataTypes.INTEGER,
    references: {
      model: Produto,
      key: 'id_produto'
    }
  }
}, {
  tableName: 'carrinho_produtos',
  timestamps: false
});


module.exports = CarrinhoProduto;