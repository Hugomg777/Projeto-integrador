const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db');

const Product = sequelize.define('Product', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_produto' // Mapeia 'id' para a coluna 'id_produto' do seu SQL
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: { 
        type: DataTypes.TEXT,
        allowNull: true
    },
    preco: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'produtos',
    timestamps: true,
    underscored: true 
});


module.exports = Product;