const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    price: {  
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
        defaultValue: 0.00
    },
    description: { 
        type: DataTypes.TEXT, 
    }

}, {
    tableName: 'products', 
    timestamps: true, 
    underscored: true 
});

module.exports = Product;