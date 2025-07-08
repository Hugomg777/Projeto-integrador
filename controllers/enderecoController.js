const Endereco = require('../models/Endereco'); 

const createEndereco = async (req, res) => {
    try {
        const { logradouro, complemento, telefone, numero, bairro, cidade, estado, cep } = req.body;

        const novoEndereco = await Endereco.create({
            logradouro,
            complemento,
            telefone,
            numero,
            bairro,
            cidade,
            estado,
            cep
        });
        res.status(201).json(novoEndereco);
    } catch (error) {
        console.error('Erro ao criar endereço:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao criar endereço.' });
    }
};

const getAllEnderecos = async (req, res) => {
    try {
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    } catch (error) {
        console.error('Erro ao buscar endereços:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar endereços.' });
    }
};

const getEnderecoById = async (req, res) => {
    try {
        const endereco = await Endereco.findByPk(req.params.id); 
        if (!endereco) {
            return res.status(404).json({ message: 'Endereço não encontrado.' });
        }
        res.status(200).json(endereco);
    } catch (error) {
        console.error('Erro ao buscar endereço por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar endereço.' });
    }
};

const updateEndereco = async (req, res) => {
    try {
        const [updatedRows] = await Endereco.update(req.body, {
            where: { id_endereco: req.params.id }, 
            returning: true
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Endereço não encontrado para atualização.' });
        }

        const updatedEnd = await Endereco.findByPk(req.params.id);
        res.status(200).json(updatedEnd);
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar endereço.' });
    }
};

const deleteEndereco = async (req, res) => {
    try {
        const deletedRows = await Endereco.destroy({
            where: { id_endereco: req.params.id } 
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Endereço não encontrado para exclusão.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar endereço:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar endereço.' });
    }
};

module.exports = {
    createEndereco,
    getAllEnderecos,
    getEnderecoById,
    updateEndereco,
    deleteEndereco,
};