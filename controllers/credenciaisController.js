const Credencial = require('../models/entidades/Credenciais');

// Criar uma nova credencial (salvando senha como texto puro)
exports.createCredencial = async (req, res) => {
    try {
        const { email_credencial, senha_credencial } = req.body;

        const novaCredencial = await Credencial.create({
            email_credencial,
            senha_credencial 
        });

        novaCredencial.senha_credencial = undefined;

        return res.status(201).json({
            message: "Credencial criada com sucesso!",
            credencial: novaCredencial
        });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "Este e-mail já está em uso." });
        }
        console.error('*** Erro ao criar credencial:', error);
        return res.status(500).json({ message: "Erro ao criar credencial.", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email_credencial, senha_credencial } = req.body;

        const credencial = await Credencial.findOne({ where: { email_credencial } });
        if (!credencial) {
            return res.status(404).json({ message: 'E-mail ou senha inválidos.' });
        }

        if (credencial.senha_credencial !== senha_credencial) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
        }

        return res.status(200).json({ message: 'Login realizado com sucesso!' });

    } catch (error) {
        console.error('*** Erro no login:', error);
        return res.status(500).json({ message: "Erro interno no servidor.", error: error.message });
    }
};

exports.getAllCredenciais = async (req, res) => {
    try {
        const credenciais = await Credencial.findAll({
            attributes: ['id_credencial', 'email_credencial']
        });
        res.status(200).json(credenciais);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar credenciais.', error: error.message });
    }
};

exports.updateCredencial = async (req, res) => {
    try {
        const { id } = req.params;
        const { senha_credencial } = req.body;

        if (!senha_credencial) {
            return res.status(400).json({ message: "A nova senha é obrigatória." });
        }

        const [updatedRows] = await Credencial.update(
            { senha_credencial },
            { where: { id_credencial: id } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Credencial não encontrada.' });
        }

        return res.status(200).json({ message: 'Senha atualizada com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar credencial.", error: error.message });
    }
};

exports.deleteCredencial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Credencial.destroy({ where: { id_credencial: id } });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Credencial não encontrada.' });
        }
        return res.status(200).json({ message: 'Credencial deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar credencial.', error: error.message });
    }
};