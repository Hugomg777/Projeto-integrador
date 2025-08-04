const Artista = require('../models/entidades/Artista');

exports.createArtista = async (req, res) => {
    console.log('*** Conteúdo de req.body ao entrar no createArtista:', req.body);

    try {
        const {
            cpf_artista,
            cnpj_artista,
            telefone_artista,
            nome_artista,
            nome_empresa
        } = req.body;

        const novoArtista = await Artista.create({
            cpf_artista,
            cnpj_artista,
            telefone_artista,
            nome_artista,
            nome_empresa
        });

        return res.status(201).json({
            message: "Artista criado com sucesso!",
            artista: novoArtista
        });

    } catch (error) {
        console.error('*** Erro detalhado ao criar artista:', error);

        let errorMessage = "Erro ao criar o artista.";
        let validationErrors = [];

        if (error.name === 'SequelizeValidationError') {
            errorMessage = "Erro de validação: Campos obrigatórios faltando ou inválidos.";
            validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({
                message: errorMessage,
                errors: validationErrors
            });
        }

        return res.status(500).json({
            message: errorMessage,
            error: error.message || "Erro interno do servidor."
        });
    }
};

exports.getAllArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll();

        if (artistas.length === 0) {
            return res.status(200).json({ message: 'Nenhum artista cadastrado no sistema.' });
        }

        res.status(200).json(artistas);
    } catch (error) {
        console.error('Erro ao buscar todos os artistas:', error);
        res.status(500).json({ message: 'Erro ao buscar os artistas.', error: error.message });
    }
};

exports.getArtistaById = async (req, res) => {
    try {
        const { id } = req.params;
        const artista = await Artista.findByPk(id);

        if (!artista) {
            return res.status(404).json({ message: 'Artista não encontrado.' });
        }

        res.status(200).json(artista);
    } catch (error) {
        console.error('Erro ao buscar o artista por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar o artista.', error: error.message });
    }
};

exports.updateArtista = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            cpf_artista,
            cnpj_artista,
            telefone_artista,
            nome_artista,
            nome_empresa
        } = req.body;

        const [updatedRows] = await Artista.update({
            cpf_artista,
            cnpj_artista,
            telefone_artista,
            nome_artista,
            nome_empresa
        }, {
            where: { id_artista: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Artista não encontrado ou nenhum dado para atualizar.' });
        }

        const updatedArtista = await Artista.findByPk(id);
        return res.status(200).json({
            message: "Artista atualizado com sucesso!",
            artista: updatedArtista
        });

    } catch (error) {
        console.error('Erro ao atualizar o artista:', error);
        let errorMessage = "Erro ao atualizar o artista.";
        let validationErrors = [];

        if (error.name === 'SequelizeValidationError') {
            errorMessage = "Erro de validação: Campos inválidos.";
            validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: errorMessage, errors: validationErrors });
        }
        res.status(500).json({ message: errorMessage, error: error.message || "Erro interno do servidor." });
    }
};

exports.deleteArtista = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Artista.destroy({
            where: { id_artista: id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Artista não encontrado para exclusão.' });
        }

        return res.status(200).json({ message: 'Artista deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar o artista:', error);
        res.status(500).json({ message: 'Erro ao deletar o artista.', error: error.message });
    }
};






