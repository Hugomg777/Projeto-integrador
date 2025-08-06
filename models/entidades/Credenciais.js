const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Credencial = sequelize.define('Credencial', {
  id_credencial: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email_credencial: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha_credencial: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'credenciais', // Garante que o nome da tabela no banco seja 'credenciais'
  timestamps: false // Se você não tiver colunas como createdAt e updatedAt
});

module.exports = Credencial;