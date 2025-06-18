const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para carregar variáveis de ambiente do .env

// Configurações do banco de dados do .env
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = 'mysql'; // Define o dialeto como MySQL
                          
// Cria uma nova instância do Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false, // Desativa o log de consultas SQL no console, defina como true para depurar
    define: {
        timestamps: true, // Adiciona automaticamente createdAt e updatedAt
        underscored: true, // Usa snake_case para nomes de colunas gerados 
    }
});

// função para testar a conexão com o banco de dados
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o MySQL estabelecida com sucesso!');
    } catch (error) {
        console.error('Não foi possível conectar ao MySQL:', error);
        process.exit(1); // sai do processo em caso de falha na conexão
    }
};

// exporta a instância do sequelize e a função de conexão
module.exports = { sequelize, connectDB };