const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Carteira = sequelize.define('Carteira', {
  id_carteira: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_carteira'
  },
  saldo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'saldo'
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'usuario_id'
  }
}, {
  tableName: 'carteira', // Nome da tabela no banco de dados MySQL
  timestamps: true,
  underscored: true
});

module.exports = Carteira;