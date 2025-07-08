// loja-artesanato/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const bcrypt = require('bcryptjs'); // importar bcryptjs para hash de senhas

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
        unique: true, // garante que o email seja único
        validate: {
            isEmail: true // valida se é um formato de e-mail válido
        }
    },
    password: { // A coluna que armazena a senha (já hasheada)
        type: DataTypes.STRING,
        allowNull: false
    },
    resetPasswordToken: { // NOVO CAMPO: Para armazenar o token de redefinição de senha
        type: DataTypes.STRING,
        allowNull: true // Pode ser nulo quando não há um reset em andamento
    },
    resetPasswordExpires: { // NOVO CAMPO: Para armazenar a data de expiração do token de redefinição
        type: DataTypes.DATE,
        allowNull: true // Pode ser nulo
    }
}, {
    tableName: 'users', // Nome da tabela no banco de dados MySQL
    timestamps: true, // Adiciona 'createdAt' e 'updatedAt' automaticamente
    underscored: true // Usa snake_case (e.g., 'created_at') para colunas geradas no DB
});

// --- HOOK (Gatilho): Executa ANTES de um novo usuário ser criado ---
// Este hook faz o hash da senha antes de salvá-la no banco de dados.
User.beforeCreate(async (user) => {
    if (user.password) { // Verifica se há uma senha para fazer hash
        const salt = await bcrypt.genSalt(10); // Gera um "sal" (string aleatória)
        user.password = await bcrypt.hash(user.password, salt); // Faz o hash da senha combinando com o sal
    }
});

// --- HOOK (Gatilho): Executa ANTES de um usuário ser atualizado ---
// Este hook também faz o hash da senha, mas SÓ SE ela foi modificada (útil para redefinição).
User.beforeUpdate(async (user) => {
    if (user.changed('password')) { // Verifica se o campo 'password' foi alterado
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// --- MÉTODO DE INSTANCIA: Para comparar senhas ---
// Adiciona um método 'comparePassword' a cada instância de usuário para verificar senhas.
User.prototype.comparePassword = async function(candidatePassword) {
    // Compara a senha digitada pelo usuário com a senha hasheada salva no DB
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;