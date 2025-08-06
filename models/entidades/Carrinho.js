const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); 

const Carrinho = sequelize.define('Carrinho', {
  id_carrinho: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
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
  underscored: true 
});

module.exports = Carrinho;