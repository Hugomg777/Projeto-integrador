const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Administrador = sequelize.define('Administrador', {
  id_administrador: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome_administrador: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf_administrador: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  telefone_administrador: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email_administrador: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  senha_administrador: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'administradores',
  timestamps: false // Se não houver campos como createdAt e updatedAt
});

module.exports = Administrador;