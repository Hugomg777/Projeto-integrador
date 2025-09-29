const CarrinhoProduto = require('../models/entidades/Carrinho_produto');
const Produto = require('../models/entidades/Product');
const Carrinho = require('../models/entidades/Carrinho');

exports.addItemAoCarrinho = async (req, res) => {
    try {
        const { id_carrinho, id_produto, quantidade } = req.body;

        if (!id_carrinho || !id_produto || !quantidade) {
            return res.status(400).json({ message: "id_carrinho, id_produto e quantidade são obrigatórios." });
        }
        
        const itemExistente = await CarrinhoProduto.findOne({
            where: { id_carrinho, id_produto }
        });

        let itemFinal;

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
            await itemExistente.save();
            itemFinal = itemExistente;
        } else {
            itemFinal = await CarrinhoProduto.create({ id_carrinho, id_produto, quantidade });
        }

        return res.status(201).json({
            message: "Item adicionado/atualizado no carrinho com sucesso!",
            item: itemFinal
        });

    } catch (error) {
        console.error('*** Erro detalhado ao adicionar item ao carrinho:', error);
        return res.status(500).json({ message: "Erro ao adicionar item ao carrinho.", error: error.message });
    }
};

exports.getProdutosDoCarrinho = async (req, res) => {
    try {
        const { id_carrinho } = req.params;

        const itens = await CarrinhoProduto.findAll({
            where: { id_carrinho },
            include: [{
                model: Produto,
                attributes: ['nome', 'descricao', 'preco', 'categoria']
            }]
        });

        if (!itens || itens.length === 0) {
            return res.status(404).json({ message: 'Nenhum item encontrado neste carrinho.' });
        }

        return res.status(200).json(itens);

    } catch (error)
    {
        console.error('*** Erro ao buscar produtos do carrinho:', error);
        return res.status(500).json({ message: "Erro ao buscar produtos do carrinho.", error: error.message });
    }
};

exports.updateQuantidadeItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade } = req.body;

        if (quantidade === undefined) {
            return res.status(400).json({ message: "A 'quantidade' é obrigatória." });
        }

        if (quantidade <= 0) {
            await CarrinhoProduto.destroy({ where: { id_carrinho_produto: id } });
            return res.status(200).json({ message: 'Item removido do carrinho pois a quantidade chegou a zero.' });
        }

        const [updatedRows] = await CarrinhoProduto.update({ quantidade }, {
            where: { id_carrinho_produto: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Item não encontrado no carrinho.' });
        }

        const itemAtualizado = await CarrinhoProduto.findByPk(id);
        return res.status(200).json({
            message: "Quantidade do item atualizada com sucesso!",
            item: itemAtualizado
        });

    } catch (error) {
        console.error('*** Erro ao atualizar quantidade do item:', error);
        return res.status(500).json({ message: "Erro ao atualizar quantidade do item.", error: error.message });
    }
};

exports.removerItemDoCarrinho = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedRows = await CarrinhoProduto.destroy({
            where: { id_carrinho_produto: id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Item não encontrado no carrinho para exclusão.' });
        }

        return res.status(200).json({ message: 'Item removido do carrinho com sucesso.' });

    } catch (error) {
        console.error('*** Erro ao remover item do carrinho:', error);
        return res.status(500).json({ message: "Erro ao remover item do carrinho.", error: error.message });
    }
};