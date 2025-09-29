const PedidoProduto = require('../models/entidades/Pedido_produto');
const Produto = require('../models/entidades/Product'); 
const Pedido = require('../models/entidades/Pedido');

exports.addItemAoPedido = async (req, res) => {
    try {
        const { id_pedido, id_produto, quantidade } = req.body;

        if (!id_pedido || !id_produto || !quantidade) {
            return res.status(400).json({ message: "id_pedido, id_produto e quantidade são obrigatórios." });
        }

        const novoItem = await PedidoProduto.create({ id_pedido, id_produto, quantidade });

        return res.status(201).json({
            message: "Item adicionado ao pedido com sucesso!",
            item: novoItem
        });

    } catch (error) {
        console.error('*** Erro ao adicionar item ao pedido:', error);
        return res.status(500).json({ message: "Erro ao adicionar item ao pedido.", error: error.message });
    }
};

exports.getProdutosDoPedido = async (req, res) => {
    try {
        const { id_pedido } = req.params;

        const itens = await PedidoProduto.findAll({
            where: { id_pedido },
            include: [{
                model: Produto,
                attributes: ['nome', 'descricao', 'preco', 'categoria'] 
            }]
        });

        if (!itens || itens.length === 0) {
            return res.status(404).json({ message: 'Nenhum item encontrado para este pedido.' });
        }

        return res.status(200).json(itens);

    } catch (error)
    {
        console.error('*** Erro ao buscar produtos do pedido:', error);
        return res.status(500).json({ message: "Erro ao buscar produtos do pedido.", error: error.message });
    }
};

exports.updateItemDoPedido = async (req, res) => {
    try {
        const { id } = req.params; 
        const { quantidade } = req.body;

        if (quantidade === undefined) {
            return res.status(400).json({ message: "O campo 'quantidade' é obrigatório." });
        }

        const [updatedRows] = await PedidoProduto.update({ quantidade }, {
            where: { id_pedido_produto: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Item do pedido não encontrado.' });
        }

        const itemAtualizado = await PedidoProduto.findByPk(id);
        return res.status(200).json({
            message: "Item do pedido atualizado com sucesso!",
            item: itemAtualizado
        });

    } catch (error) {
        console.error('*** Erro ao atualizar item do pedido:', error);
        return res.status(500).json({ message: "Erro ao atualizar item do pedido.", error: error.message });
    }
};

exports.removerItemDoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedRows = await PedidoProduto.destroy({
            where: { id_pedido_produto: id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Item do pedido não encontrado para exclusão.' });
        }

        return res.status(200).json({ message: 'Item removido do pedido com sucesso.' });

    } catch (error) {
        console.error('*** Erro ao remover item do pedido:', error);
        return res.status(500).json({ message: "Erro ao remover item do pedido.", error: error.message });
    }
};