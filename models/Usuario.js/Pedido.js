const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pedido = sequelize.define('Pedido', {
    id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_pedido'
    },
    valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'valor_total'
    },
    status_pedido: {
        type: DataTypes.ENUM('pendente', 'pago', 'em_processamento', 'enviado', 'entregue', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente', // definir um valor padrão
        field: 'status_pedido'
    }
   
}, {
    tableName: 'pedido', // nome da tabela no banco de dados MySQL
    timestamps: true,
    underscored: true
});

module.exports = Pedido;