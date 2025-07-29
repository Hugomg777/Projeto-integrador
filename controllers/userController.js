const User = require('../models/entidades/User');

const registerUser = async (req, res) => {

    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, senha e nome são obrigatórios.' });
        }
        const newUser = await User.create({ email, password, name });
        const userResponse = { id: newUser.id, name: newUser.name, email: newUser.email };
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: userResponse });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao cadastrar usuário.' });
    }
};

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        res.status(200).json({ message: 'Login bem-sucedido!', user: { id: user.id, name: user.name, email: user.email }});
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao fazer login.' });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({

            attributes: { exclude: ['password'] }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar usuários.' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getAllUsers // <--- A linha mais importante!
};
