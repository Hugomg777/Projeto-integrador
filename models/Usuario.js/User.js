const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 
const bcrypt = require('bcryptjs'); 

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true 
        }
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    }
   
}, {
    tableName: 'users', 
    timestamps: true, 
    underscored: true,
});


User.beforeCreate(async (user) => {
    if (user.password) { 
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password, salt); 
    }
});

User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;