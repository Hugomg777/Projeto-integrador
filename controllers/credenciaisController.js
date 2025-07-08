const Credenciais = require('../models/Credenciais'); 
// Esse controlador é mais para gerenciar tokens ou chaves de API, não senhas de usuário diretamente.

// -- 1. Criar uma nova credencial  ---
// Ex: para guardar um token de sessão, ou uma chave de API para um usuário/serviço.
const createCredencial = async (req, res) => {
    try {
        const { usuario_id, token, data_expiracao } = req.body;

        const novaCredencial = await Credenciais.create({
            usuario_id,
            token,
            data_expiracao
        });
        res.status(201).json(novaCredencial);
    } catch (error) {
        console.error('Erro ao criar credencial:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao criar credencial.' });
    }
};

// Lista todas as credenciais de um usuário específico.
const getCredenciaisByUsuarioId = async (req, res) => {
    try {
        const credenciais = await Credenciais.findAll({
            where: { usuario_id: req.params.usuarioId }
        });
        res.status(200).json(credenciais);
    } catch (error) {
        console.error('Erro ao buscar credenciais por ID de usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar credenciais.' });
    }
};

// Ex: Invalidar um token de sessão ou uma chave de API.
const deleteCredencial = async (req, res) => {
    try {
        const deletedRows = await Credenciais.destroy({
            where: { id_credenciais: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Credencial não encontrada para exclusão.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar credencial:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar credencial.' });
    }
};

module.exports = {
    createCredencial,
    getCredenciaisByUsuarioId,
    deleteCredencial,
};