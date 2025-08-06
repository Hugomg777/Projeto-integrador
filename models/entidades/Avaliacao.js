const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db'); 

const Avaliacao = sequelize.define('Avaliacao', {
  id_avaliacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nota: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true // O campo pode ser nulo
  },
  data_avaliacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'avaliacao', 
  timestamps: false,     
  underscored: true
});

module.exports = Avaliacao;