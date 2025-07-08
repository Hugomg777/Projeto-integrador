// loja-artesanato/controllers/artistaController.js
const Artista = require('../models/Artista'); // Importa o modelo Artista

// --- 1. Criar um novo Artista (CREATE) ---
const createArtista = async (req, res) => {
    try {
        const { cpf_artista, cnpj_artista, telefone_artista, nome_artista, nome_empresa } = req.body;

        const novoArtista = await Artista.create({
            cpf_artista,
            cnpj_artista,
            telefone_artista,
            nome_artista,
            nome_empresa
        });

        res.status(201).json(novoArtista);
    } catch (error) {
        console.error('Erro ao criar artista:', error);
        // Tratamento de erros específicos do Sequelize, como validação ou unicidade
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'CPF ou CNPJ de artista já cadastrado.' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao criar artista.' });
    }
};

// --- 2. Listar todos os Artistas (READ - All) ---
const getAllArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll();
        res.status(200).json(artistas);
    } catch (error) {
        console.error('Erro ao buscar artistas:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar artistas.' });
    }
};


const getArtistaById = async (req, res) => {
    try {
        const artista = await Artista.findByPk(req.params.id);
        if (!artista) {
            return res.status(404).json({ message: 'Artista não encontrado.' });
        }
        res.status(200).json(artista);
    } catch (error) {
        console.error('Erro ao buscar artista por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar artista.' });
    }
};

const updateArtista = async (req, res) => {
    try {
        const [updatedRows] = await Artista.update(req.body, {
            where: { id_artista: req.params.id },
            returning: true 
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Artista não encontrado para atualização.' });
        }

        const updatedArtista = await Artista.findByPk(req.params.id);
        res.status(200).json(updatedArtista);
    } catch (error) {
        console.error('Erro ao atualizar artista:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'CPF ou CNPJ já cadastrado para outro artista.' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar artista.' });
    }
};


const deleteArtista = async (req, res) => {
    try {
        const deletedRows = await Artista.destroy({
            where: { id_artista: req.params.id } 
        });

        if (deletedRows === 0) { 
            return res.status(404).json({ message: 'Artista não encontrado para exclusão.' });
        }

        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar artista:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar artista.' });
    }
};

module.exports = {
    createArtista,
    getAllArtistas,
    getArtistaById,
    updateArtista,
    deleteArtista
};