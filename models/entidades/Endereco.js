const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Endereco = sequelize.define('Endereco', {
    id_endereco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_endereco'
    },
    logradouro: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'logradouro'
    },
    complemento: {
        type: DataTypes.STRING(100),
        allowNull: true, 
        field: 'complemento'
    },
    telefone: { 
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'telefone'
    },
    numero: { 
        type: DataTypes.STRING,
        allowNull: false,
        field: 'numero'
    },
    bairro: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'bairro'
    },
    cidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'cidade'
    },
    estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'estado'
    },
    cep: {
        type: DataTypes.STRING(100), // usar STRING para CEP é comum devido a formatos como "XXXXX-XXX"
        allowNull: false,
        field: 'cep'
    }
}, {
    tableName: 'endereco', 
    timestamps: true,
    underscored: true
});

module.exports = Endereco;