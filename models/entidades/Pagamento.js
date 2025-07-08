const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pagamento = sequelize.define('Pagamento', {
  id_pagamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_pagamento'
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'valor'
  },
  data_pagamento: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'data_pagamento'
  },
  metodo_pagamento: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'metodo_pagamento'
  },
  pedido_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'pedido_id'
  }
}, {
  tableName: 'pagamento', // Nome da tabela no banco de dados MySQL
  timestamps: true,
  underscored: true
});

module.exports = Pagamento;