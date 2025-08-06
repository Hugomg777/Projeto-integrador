const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const User = sequelize.define('User', {
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha_cliente: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  nome_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  telefone_cliente: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'user', // Garante que o nome da tabela no banco seja 'user'
  timestamps: false // Se você não tiver colunas como createdAt e updatedAt
});

module.exports = User;