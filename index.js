const express = require('express');
const { sequelize, connectDB } = require('./config/db'); 
require('dotenv').config(); // Para carregar as variáveis do .env

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Bem-vindos ao Vale das Artes! API funcionando.');
});

const initializeApp = async () => {
    try {
      
        await connectDB(); // Chama a função que tenta autenticar a conexão com o DB

        await sequelize.sync({ alter: true }); // Escolha { force: true } para resetar ou { alter: true } para atualizar
        console.log('Todos os modelos foram sincronizados com sucesso com o banco de dados.');

        // 3. Iniciar o Servidor Express
        const PORT = process.env.PORT || 3000; // Pega a porta do .env ou usa 3000
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Acesse: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erro na inicialização do aplicativo:', error);
        process.exit(1);
    }
};

initializeApp();