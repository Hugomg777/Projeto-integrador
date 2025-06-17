const express = require('express');
const app = express();
const porta = 3000;

app.use(express.json());

// banco de dados Fake
let products = [
    { id: 1, name: 'Vaso de barro', price: 10.00, description: 'Vaso de barro artesanal, feito à mão.' },
    { id: 2, name: 'Quadro de paisagem', price: 50.00, description: 'Quadro pintado à mão com paisagem natural.' },
];

// rota inicial
app.get('/', (req, res) => {
    res.send('Bem-vindos ao Vale das Artes!');
});

// rota para listar produtos
app.get('/products', (req, res) => {
    res.json(products);
});

// rota para buscar produto por id
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

//adicionar um novo produto
app.post('/products', (req, res) => {
  const novo = req.body;
  novo.id = products.length + 1;
  products.push(novo);
  res.status(201).json(novo);
});

// rota para atualizar produto
app.put('/products/:id', (req, res) => { 
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id); 
  if (index !== -1) { 
    products[index] = { ...products[index], ...req.body, id: id }; 
    res.json(products[index]); 
    res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
});

// DELETAR um produto
app.delete('/products/:id', (req, res) => { 
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id); 
  if (index !== -1) { 
    products.splice(index, 1); 
    res.json({ mensagem: 'Produto removido com sucesso' });
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado' }); 
  }
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});