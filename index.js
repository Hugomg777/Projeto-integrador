const express = require('express');
const { sequelize, connectDB } = require('./config/db');
require('dotenv').config(); // Para carregar as variáveis do .env

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const carteiraRoutes = require('./routes/carteiraRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const enderecoRoutes = require('./routes/enderecoRoute');
const pedidoRoutes =  require('./routes/pedidoRoute');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const administradorRoutes = require('./routes/administradorRoutes'); // Alef
const carrinhoRoutes = require('./routes/carrinhoRoutes'); //Alef
const carrinhoProdutoRoutes = require('./routes/carrinho_produtoRoutes'); // Alef
const credenciaisRoutes = require('./routes/credenciaisRoutes'); // Alef
const pedidoProdutoRoutes = require('./routes/pedido_produtoRoutes');// Alef


app.use('/api/carteiras', carteiraRoutes);
app.use('/api/users', userRoutes);
app.use('/api/produtos', productRoutes);
app.use('/api/artistas', artistaRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/administradores', administradorRoutes); // Alef
app.use('/api/carrinhos', carrinhoRoutes); //Alef
app.use('/api/pedido-produtos', pedidoProdutoRoutes); // Alef
app.use('/api/credenciais', credenciaisRoutes); // Alef
app.use('/api/carrinho-produto', carrinhoProdutoRoutes); // Alef

app.get('/', (_req, res) => {
    res.send('Bem-vindos ao Vale das Artes! API a funcionar.');
});

const initializeApp = async () => {
    try {
        await connectDB(); // Chama a função que tenta autenticar a conexão com o DB

        await sequelize.sync();
        console.log('Todos os modelos foram sincronizados com sucesso com o banco de dados.');

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
