const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Pedido = sequelize.define('Pedido', {
  id_pedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status_pedido: {
    type: DataTypes.ENUM('pendente', 'pago', 'em_processamento', 'enviado', 'entregue', 'cancelado'),
    allowNull: false,
    defaultValue: 'pendente'
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  data_pagamento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  data_envio: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'pedidos',
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

module.exports = Pedido;