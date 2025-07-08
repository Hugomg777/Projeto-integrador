const express = require('express');
const { sequelize, connectDB } = require('./config/db'); // importa a instancia do sequelize e a função de conexão
require('dotenv').config(); // para carregar as variáveis do .env

const app = express();

// --- Middlewares Globais ---
// Habilita o parseamento de JSON para o corpo das requisições
app.use(express.json());
// Habilita o parseamento de dados de formulário URL-encoded
app.use(express.urlencoded({ extended: true }));

// --- Importar Todas as Rotas ---
const usuarioRoutes = require('./routes/usuarioRoutes');
const productRoutes = require('./routes/productRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const carteiraRoutes = require('./routes/carteiraRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const administradorRoutes = require('./routes/administradorRoutes');
const credenciaisRoutes = require('./routes/credenciaisRoutes');

app.get('/', (req, res) => {
    res.send('Bem-vindos ao Vale das Artes!');
});

// --- Montar Todas as Rotas da API ---
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/products', productRoutes);
app.use('/api/artistas', artistaRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/carteiras', carteiraRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/administradores', administradorRoutes);
app.use('/api/credenciais', credenciaisRoutes);

// --- Função de Inicialização do Aplicativo ---
const initializeApp = async () => {
    try {
        // 1. Conectar ao Banco de Dados MySQL
        await connectDB();

        // 2. Sincronizar Modelos com o Banco de Dados
        await sequelize.sync({ alter: true });
        console.log('Todos os modelos foram sincronizados com sucesso com o banco de dados.');

        // 3. Iniciar o Servidor Express
        const PORT = process.env.PORT || 3000;
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