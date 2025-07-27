const express = require('express');
const { sequelize, connectDB } = require('./config/db');
require('dotenv').config(); // Para carregar as variáveis do .env

const app = express();

// --- Middlewares (A PARTE MAIS IMPORTANTE) ---
// ✅ ESTAS DUAS LINHAS TÊM QUE VIR PRIMEIRO, LOGO DEPOIS DE 'const app = express();'
// Elas ensinam o Express a ler o JSON enviado pelo Insomnia.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Importar as Rotas (DEPOIS dos middlewares) ---
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const artistaRoutes = require('./routes/artistaRoutes');

// --- Usar as Rotas ---
app.use('/api/users', userRoutes);
app.use('/api/produtos', productRoutes);
app.use('/api/artistas', artistaRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindos ao Vale das Artes! API a funcionar.');
});

const initializeApp = async () => {
    try {
        await connectDB(); // Chama a função que tenta autenticar a conexão com o DB

        await sequelize.sync({ alter: true }); // Escolha { force: true } para resetar ou { alter: true } para atualizar
        console.log('Todos os modelos foram sincronizados com sucesso com o banco de dados.');

        // 3. Iniciar o Servidor Express
        const PORT = process.env.PORT || 3000; // Pega a porta do .env ou usa 3000
        app.listen(PORT, () => {
            console.log(`Servidor a rodar na porta ${PORT}`);
            console.log(`Acesse: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erro na inicialização da aplicação:', error);
        process.exit(1);
    }
};

initializeApp();
