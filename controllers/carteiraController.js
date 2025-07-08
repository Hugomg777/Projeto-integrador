const Carteira = require('../models/Carteira'); 

const createCarteira = async (req, res) => {
    try {
        const { saldo, usuario_id } = req.body; 

        const novaCarteira = await Carteira.create({ saldo, usuario_id }); 
        res.status(201).json(novaCarteira);
    } catch (error) {
        console.error('Erro ao criar carteira:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao criar carteira.' });
    }
};

const getCarteiraByUsuarioId = async (req, res) => {
    try {
        const carteira = await Carteira.findOne({ where: { usuario_id: req.params.usuarioId } });
        if (!carteira) {
            return res.status(404).json({ message: 'Carteira não encontrada para este usuário.' });
        }
        res.status(200).json(carteira);
    } catch (error) {
        console.error('Erro ao buscar carteira por ID de usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar carteira.' });
    }
};

// --- 3. Atualizar Saldo da Carteira (UPDATE) ---
// ex: para adicionar ou remover valor.
const updateSaldoCarteira = async (req, res) => {
    try {
        const { id_carteira } = req.params;
        const { valor } = req.body; 

        const carteira = await Carteira.findByPk(id_carteira);
        if (!carteira) {
            return res.status(404).json({ message: 'Carteira não encontrada.' });
        }

        // logica para adicionar ou remover saldo
        carteira.saldo = parseFloat(carteira.saldo) + parseFloat(valor); 
        await carteira.save();

        res.status(200).json(carteira);
    } catch (error) {
        console.error('Erro ao atualizar saldo da carteira:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar saldo da carteira.' });
    }
};


module.exports = {
    createCarteira,
    getCarteiraByUsuarioId,
    updateSaldoCarteira,
};