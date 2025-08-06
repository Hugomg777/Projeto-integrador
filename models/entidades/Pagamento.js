const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Pagamento = sequelize.define('Pagamento', {
  id_pagamento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data_pagamento: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Define o valor padrão como a data e hora atuais
  },
  forma_pagamento: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  valor_pagamento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'pagamentos',
  timestamps: false // Se não houver colunas como createdAt e updatedAt
});

module.exports = Pagamento;