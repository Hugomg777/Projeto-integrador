
const Product = require('../models/entidades/Product');

exports.createProduto = async (req, res) => {
    try {
        const novoProduto = await Product.create(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        console.error("Erro detalhado ao criar produto:", error);
        res.status(500).json({ error: 'Erro ao criar o produto: ' + error.message });
    }
};

exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Product.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: 'Erro ao buscar produtos: ' + error.message });
    }
};

exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Product.findByPk(req.params.id);
        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error("Erro ao buscar produto por ID:", error);
        res.status(500).json({ error: 'Erro ao buscar o produto: ' + error.message });
    }
};

exports.updateProduto = async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const produtoAtualizado = await Product.findByPk(req.params.id);
            res.status(200).json(produtoAtualizado);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ error: 'Erro ao atualizar o produto: ' + error.message });
    }
};

exports.deleteProduto = async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        res.status(500).json({ error: 'Erro ao deletar o produto: ' + error.message });
    }
};