const Endereco = require('../models/entidades/Endereco');

const EnderecoController = {
    async create(req, res) {
        try {
            const novoEndereco = await Endereco.create(req.body);
            return res.status(201).json(novoEndereco);
        } catch (error) {
            console.error('Erro ao criar endereço:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao criar endereço.' });
        }
    },

    async findAll(req, res) {
        try {
            const enderecos = await Endereco.findAll();
            return res.status(200).json(enderecos);
        } catch (error) {
            console.error('Erro ao buscar endereços:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao buscar endereços.' });
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const endereco = await Endereco.findByPk(id);

            if (!endereco) {
                return res.status(404).json({ error: 'Endereço não encontrado.' });
            }
            return res.status(200).json(endereco);
        } catch (error) {
            console.error('Erro ao buscar endereço por ID:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao buscar endereço.' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updatedRows] = await Endereco.update(req.body, {
                where: { id_endereco: id }
            });

            if (updatedRows === 0) {
                return res.status(404).json({ error: 'Endereço não encontrado ou nenhum dado para atualizar.' });
            }

            const enderecoAtualizado = await Endereco.findByPk(id);
            return res.status(200).json(enderecoAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao atualizar endereço.' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await Endereco.destroy({
                where: { id_endereco: id }
            });

            if (deletedRows === 0) {
                return res.status(404).json({ error: 'Endereço não encontrado.' });
            }
            return res.status(200).json({ message: 'Endereço apagado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar endereço:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao deletar endereço.' });
        }
    }
};

module.exports = EnderecoController;