const User = require('../../models/entidades/User'); // Ou '../../models/User' dependendo de onde ele está

const registerUser = async (req, res) => {
    console.log('Requisição de CADASTRO de usuário recebida. Dados:', req.body);
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, senha e nome são obrigatórios.' });
        }

        const newUser = await User.create({ email, password, name }); 
        
        const userResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso!',
            user: userResponse 
        });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email já cadastrado.' });
        }
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ errors });
        }
        
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao cadastrar usuário.' });
    }
};

const loginUser = async (req, res) => {
    console.log('Requisição de LOGIN de usuário recebida. Dados:', req.body);
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

        res.status(200).json({ 
            message: 'Login bem-sucedido!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao fazer login.' });
    }
};

module.exports = {
    registerUser,
    loginUser
};