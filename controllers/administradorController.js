const Administrador = require('../models/Administrador'); // Importa o modelo Administrador
const bcrypt = require('bcryptjs'); // Para hash de senha
const jwt = require('jsonwebtoken'); // Para JWT

// --- 1. registar um novo admin (CREATE) ---
const createAdministrador = async (req, res) => {
    try {
        const { nome_administrador, email_administrador, senha_administrador } = req.body;


        const novoAdministrador = await Administrador.create({
            nome_administrador,
            email_administrador,
            senha_administrador
        });

        res.status(201).json({
            message: 'Administrador cadastrado com sucesso!',
            administrador: {
                id_administrador: novoAdministrador.id_administrador,
                nome_administrador: novoAdministrador.nome_administrador,
                email_administrador: novoAdministrador.email_administrador
            }
        });
    } catch (error) {
        console.error('Erro ao criar administrador:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email de administrador já cadastrado.' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao criar administrador.' });
    }
};

// --- 2. Login de Adm ---
const loginAdministrador = async (req, res) => {
    try {
        const { email_administrador, senha_administrador } = req.body;

        if (!email_administrador || !senha_administrador) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const administrador = await Administrador.findOne({ where: { email_administrador } });
        if (!administrador) {
            return res.status(401).json({ message: 'Credenciais de administrador inválidas.' });
        }

        const isMatch = await bcrypt.compare(senha_administrador, administrador.senha_administrador);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais de administrador inválidas.' });
        }

        const token = jwt.sign(
            { id: administrador.id_administrador, role: 'admin' },
            process.env.JWT_ADMIN_SECRET || process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login de administrador realizado com sucesso!',
            administrador: {
                id_administrador: administrador.id_administrador,
                nome_administrador: administrador.nome_administrador,
                email_administrador: administrador.email_administrador
            },
            token
        });
    } catch (error) {
        console.error('Erro ao fazer login de administrador:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao fazer login de administrador.' });
    }
};

const getAllAdministradores = async (req, res) => {
    try {
        const administradores = await Administrador.findAll();
        res.status(200).json(administradores);
    } catch (error) {
        console.error('Erro ao buscar administradores:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar administradores.' });
    }
};

// --- 4. Buscar admin por ID ---
const getAdministradorById = async (req, res) => {
    try {
        const administrador = await Administrador.findByPk(req.params.id);
        if (!administrador) {
            return res.status(404).json({ message: 'Administrador não encontrado.' });
        }
        res.status(200).json(administrador);
    } catch (error) {
        console.error('Erro ao buscar administrador por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar administrador.' });
    }
};

// --- 5. Atualizar um admin por ID (UPDATE) ---
const updateAdministrador = async (req, res) => {
    try {
        const [updatedRows] = await Administrador.update(req.body, {
            where: { id_administrador: req.params.id },
            returning: true
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Administrador não encontrado para atualização.' });
        }

        const updatedAdmin = await Administrador.findByPk(req.params.id);
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Erro ao atualizar administrador:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email de administrador já cadastrado para outro registro.' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar administrador.' });
    }
};

// --- 6. Deletar um admin por ID (DELETE) ---
const deleteAdministrador = async (req, res) => {
    try {
        const deletedRows = await Administrador.destroy({
            where: { id_administrador: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Administrador não encontrado para exclusão.' });
        }

        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar administrador:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao deletar administrador.' });
    }
};

module.exports = {
    createAdministrador,
    loginAdministrador,
    getAllAdministradores,
    getAdministradorById,
    updateAdministrador,
    deleteAdministrador
};