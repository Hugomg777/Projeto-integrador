const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_cliente'
  },
  nome_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'nome_cliente'
  },
  email_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false,
     unique: true,
    field: 'email_cliente'
  },
  telefone_cliente: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'telefone_cliente'
  }
}, {
  tableName: 'cliente', // Nome da tabela no banco de dados MySQL
  timestamps: true,
  underscored: true
});

module.exports = Cliente;