const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Administrador = sequelize.define('Administrador', {
  id_administrador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_administrador'
  },
  nome_administrador: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'nome_administrador'
  },
  email_administrador: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'email_administrador'
  },
  senha_administrador: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'senha_administrador'
  }
}, {
  tableName: 'administradores', // Nome da tabela no banco de dados MySQL
  timestamps: true,
  underscored: true
});

module.exports = Administrador;