const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Credenciais = sequelize.define('Credenciais', {
  id_credenciais: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_credenciais'
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'usuario_id'
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'token'
  },
  data_expiracao: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'data_expiracao'
  }
}, {
  tableName: 'credenciais', // Nome da tabela no banco de dados MySQL
  timestamps: true,
  underscored: true
});

module.exports = Credenciais;