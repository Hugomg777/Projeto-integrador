const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); 

const Cartao = sequelize.define('Cartao', {
  id_cartao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  token_cartao: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  bandeira: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  validade: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'cartao', 
  timestamps: false,     
  underscored: true    
});

module.exports = Cartao;