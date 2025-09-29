const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const User = require('./User'); 

const Carrinho = sequelize.define('Carrinho', {
  id_carrinho: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // CAMPO DE LIGAÇÃO CORRIGIDO Tive que modificar o nome do campo para casar com a chave primária da tabela User
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',       // Nome exato da TABELA de usuários
      key: 'id_cliente'  // Chave primária exata da TABELA de usuários
    }
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status_carrinho: {
    type: DataTypes.ENUM('ativo', 'abandonado', 'finalizado'),
    allowNull: false,
    defaultValue: 'ativo'
  }
}, {
  tableName: 'carrinho',
  timestamps: false,
});

Carrinho.belongsTo(User, { foreignKey: 'id_cliente' });
User.hasOne(Carrinho, { foreignKey: 'id_cliente' });

module.exports = Carrinho;