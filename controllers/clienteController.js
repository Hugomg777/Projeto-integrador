const Cliente = require('../models/Cliente'); 

const createCliente = async (req, res) => {
    try {
        const { nome_cliente, email_cliente, telefone_cliente } = req.body;

        const novoCliente = await Cliente.create({
            nome_cliente,
            email_cliente,
            telefone_cliente
        });

        res.status(201).json(novoCliente);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email de cliente já cadastrado.' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao criar cliente.' });
    }
};


const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar clientes.' });
    }
};


const getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        console.error('Erro ao buscar cliente por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar cliente.' });
    }
};

const updateCliente = async (req, res) => {
    try {
        const [updatedRows] = await Cliente.update(req.body, {
            where: { id_cliente: req.params.id },
            returning: true
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado para atualização.' });
        }

        const updatedCli = await Cliente.findByPk(req.params.id);
        res.status(200).json(updatedCli);
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email de cliente já cadastrado para outro registro.' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar cliente.' });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const deletedRows = await Cliente.destroy({
            where: { id_cliente: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado para exclusão.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar cliente.' });
    }
};

module.exports = {
    createCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    deleteCliente
};