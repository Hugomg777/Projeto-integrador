const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Carteira = sequelize.define('Carteira', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  saldo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'carteira',
  timestamps: true
});

module.exports = Carteira;