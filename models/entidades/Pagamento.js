const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Pagamento = sequelize.define('Pagamento', {
    id_pagamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_transacao_gateway: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('pendente', 'aprovado', 'recusado', 'reembolsado'),
        allowNull: false,
        defaultValue: 'pendente'
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    detalhes_gateway: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
    timestamps: true,
    updatedAt: 'data_ultima_atualizacao',
    createdAt: 'data_criacao'
});

module.exports = Pagamento;