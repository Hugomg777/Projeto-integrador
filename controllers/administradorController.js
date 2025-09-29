const Administrador = require('../models/entidades/Administrador');

exports.createAdministrador = async (req, res) => {
    try {
        const {
            nome_administrador,
            cpf_administrador,
            telefone_administrador,
            email_administrador,
            senha_administrador
        } = req.body;

        const novoAdministrador = await Administrador.create({
            nome_administrador,
            cpf_administrador,
            telefone_administrador,
            email_administrador,
            senha_administrador
        });

        return res.status(201).json({
            message: "Administrador criado com sucesso!",
            administrador: novoAdministrador
        });

    } catch (error) {
        console.error('*** Erro detalhado ao criar administrador:', error);
        let errorMessage = "Erro ao criar o administrador.";
        
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({
                message: "Erro de validação: Campos obrigatórios faltando ou inválidos.",
                errors: validationErrors
            });
        }
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(409).json({
                message: `O campo '${field}' já está em uso.`
            });
        }

        return res.status(500).json({ message: errorMessage, error: error.message });
    }
};

exports.getAllAdministradores = async (req, res) => {
    try {
        const administradores = await Administrador.findAll();
        if (administradores.length === 0) {
            return res.status(200).json({ message: 'Nenhum administrador cadastrado no sistema.' });
        }
        res.status(200).json(administradores);
    } catch (error) {
        console.error('Erro ao buscar todos os administradores:', error);
        res.status(500).json({ message: 'Erro ao buscar os administradores.', error: error.message });
    }
};

exports.getAdministradorById = async (req, res) => {
    try {
        const { id } = req.params;
        const administrador = await Administrador.findByPk(id);

        if (!administrador) {
            return res.status(404).json({ message: 'Administrador não encontrado.' });
        }
        res.status(200).json(administrador);
    } catch (error) {
        console.error('Erro ao buscar o administrador por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar o administrador.', error: error.message });
    }
};

exports.updateAdministrador = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nome_administrador,
            cpf_administrador,
            telefone_administrador,
            email_administrador,
            senha_administrador
        } = req.body;

        const [updatedRows] = await Administrador.update({
            nome_administrador,
            cpf_administrador,
            telefone_administrador,
            email_administrador,
            senha_administrador
        }, {
            where: { id_administrador: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Administrador não encontrado ou nenhum dado para atualizar.' });
        }

        const updatedAdministrador = await Administrador.findByPk(id);
        return res.status(200).json({
            message: "Administrador atualizado com sucesso!",
            administrador: updatedAdministrador
        });

    } catch (error) {
        console.error('Erro ao atualizar o administrador:', error);
        let errorMessage = "Erro ao atualizar o administrador.";
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Erro de validação: Campos inválidos.", errors: validationErrors });
        }
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(409).json({
                message: `O campo '${field}' já está em uso.`
            });
        }
        res.status(500).json({ message: errorMessage, error: error.message });
    }
};

exports.deleteAdministrador = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Administrador.destroy({
            where: { id_administrador: id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Administrador não encontrado para exclusão.' });
        }
        return res.status(200).json({ message: 'Administrador deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar o administrador:', error);
        res.status(500).json({ message: 'Erro ao deletar o administrador.', error: error.message });
    }
};