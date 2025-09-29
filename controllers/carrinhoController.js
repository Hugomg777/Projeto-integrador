const Carrinho = require('../models/entidades/Carrinho');

exports.createCarrinho = async (req, res) => {
    try {
        const { id_cliente, status_carrinho } = req.body;

        if (!id_cliente) {
            return res.status(400).json({ message: "O campo 'id_cliente' é obrigatório." });
        }

        const novoCarrinho = await Carrinho.create({ 
            id_cliente,
            status_carrinho: status_carrinho || 'ativo'
        });

        return res.status(201).json({
            message: "Carrinho criado e associado ao cliente com sucesso!",
            carrinho: novoCarrinho
        });

    } catch (error) {
        console.error('*** Erro detalhado ao criar carrinho:', error);
        let errorMessage = "Erro ao criar o carrinho.";
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({
                message: "Erro de validação.",
                errors: validationErrors
            });
        }
        return res.status(500).json({ message: errorMessage, error: error.message });
    }
};

exports.getAllCarrinhos = async (req, res) => {
    try {
        const carrinhos = await Carrinho.findAll();
        if (carrinhos.length === 0) {
            return res.status(200).json({ message: 'Nenhum carrinho cadastrado no sistema.' });
        }
        res.status(200).json(carrinhos);
    } catch (error) {
        console.error('Erro ao buscar todos os carrinhos:', error);
        res.status(500).json({ message: 'Erro ao buscar os carrinhos.', error: error.message });
    }
};

exports.getCarrinhoById = async (req, res) => {
    try {
        const { id } = req.params; 
        const carrinho = await Carrinho.findByPk(id);

        if (!carrinho) {
            return res.status(404).json({ message: 'Carrinho não encontrado.' });
        }
        res.status(200).json(carrinho);
    } catch (error) {
        console.error('Erro ao buscar o carrinho por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar o carrinho.', error: error.message });
    }
};

exports.getCarrinhoByClienteId = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const carrinho = await Carrinho.findOne({ where: { id_cliente: id_cliente, status_carrinho: 'ativo' } });

        if (!carrinho) {
            return res.status(404).json({ message: 'Nenhum carrinho ativo encontrado para este cliente.' });
        }
        res.status(200).json(carrinho);
    } catch (error) {
        console.error('Erro ao buscar o carrinho do cliente por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar o carrinho do cliente.', error: error.message });
    }
};

exports.updateCarrinho = async (req, res) => {
    try {
        const { id } = req.params; 
        const { status_carrinho } = req.body;

        const [updatedRows] = await Carrinho.update({
            status_carrinho
        }, {
            where: { id_carrinho: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Carrinho não encontrado ou nenhum dado para atualizar.' });
        }

        const updatedCarrinho = await Carrinho.findByPk(id);
        return res.status(200).json({
            message: "Carrinho atualizado com sucesso!",
            carrinho: updatedCarrinho
        });

    } catch (error) {
        console.error('Erro ao atualizar o carrinho:', error);
        let errorMessage = "Erro ao atualizar o carrinho.";
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Erro de validação.", errors: validationErrors });
        }
        res.status(500).json({ message: errorMessage, error: error.message });
    }
};

exports.deleteCarrinho = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Carrinho.destroy({
            where: { id_carrinho: id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Carrinho não encontrado para exclusão.' });
        }
        return res.status(200).json({ message: 'Carrinho deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar o carrinho:', error);
        res.status(500).json({ message: 'Erro ao deletar o carrinho.', error: error.message });
    }
};