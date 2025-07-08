const Pagamento = require('../models/Pagamento');

const processarPagamento = async (req, res) => {
    try {
        const { valor, data_pagamento, metodo_pagamento, pedido_id } = req.body;

        const novoPagamento = await Pagamento.create({
            valor,
            data_pagamento,
            metodo_pagamento,
            pedido_id
        });
        res.status(201).json({ message: 'Pagamento processado com sucesso!', pagamento: novoPagamento });
    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao processar pagamento.' });
    }
};

const getAllPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll();
        res.status(200).json(pagamentos);
    } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar pagamentos.' });
    }
};

const getPagamentoById = async (req, res) => {
    try {
        const pagamento = await Pagamento.findByPk(req.params.id);
        if (!pagamento) {
            return res.status(404).json({ message: 'Pagamento não encontrado.' });
        }
        res.status(200).json(pagamento);
    } catch (error) {
        console.error('Erro ao buscar pagamento por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar pagamento.' });
    }
};

const updatePagamentoStatus = async (req, res) => {
    try {
        const { id_pagamento } = req.params;
        const { novo_status } = req.body; // Ex: 'aprovado', 'recusado'

        const [updatedRows] = await Pagamento.update(
            { status_pagamento: novo_status }, 
            { where: { id_pagamento } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Pagamento não encontrado para atualização.' });
        }

        const updatedPagamento = await Pagamento.findByPk(id_pagamento);
        res.status(200).json(updatedPagamento);
    } catch (error) {
        console.error('Erro ao atualizar status do pagamento:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar status do pagamento.' });
    }
};

// Raramente se deleta pagamentos em sistemas reais, mas é possível para fins de teste.
const deletePagamento = async (req, res) => {
    try {
        const deletedRows = await Pagamento.destroy({
            where: { id_pagamento: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Pagamento não encontrado para exclusão.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar pagamento.' });
    }
};

module.exports = {
    processarPagamento,
    getAllPagamentos,
    getPagamentoById,
    updatePagamentoStatus,
    deletePagamento
};