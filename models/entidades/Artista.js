const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Artista = sequelize.define('Artista', {
    id_artista: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_artista' 
    },
    cpf_artista: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'cpf_artista'
    },
    cnpj_artista: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'cnpj_artista'
    },
    telefone_artista: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'telefone_artista'
    },
    nome_artista: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nome_artista'
    },
    nome_empresa: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'nome_empresa'
    }
}, {
    tableName: 'artistas', 
    timestamps: true, 
    underscored: true
});

module.exports = Artista;