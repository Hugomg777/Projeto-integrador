const User = require('../models/entidades/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');
const { Sequelize } = require('sequelize');

require('dotenv').config(); 

// CREATE: Cadastra um novo usuário
const createUser = async (req, res) => {
  try {
    const { email_cliente, senha_cliente, nome_cliente, cpf_cliente, telefone_cliente } = req.body;
    
    if (!email_cliente || !senha_cliente || !nome_cliente || !cpf_cliente || !telefone_cliente) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    
    const hashedPassword = await bcrypt.hash(senha_cliente, 10);

    const newUser = await User.create({
      email_cliente,
      senha_cliente: hashedPassword, 
      nome_cliente,
      cpf_cliente,
      telefone_cliente
    });
    
    const userWithoutId = newUser.toJSON();
    delete userWithoutId.id_cliente;
    
    res.status(201).json({ message: 'Usuário criado com sucesso!', user: userWithoutId });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// READ: Busca todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['senha_cliente'] } // Exclui a senha por segurança
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// READ: Busca um usuário por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['senha_cliente'] }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// UPDATE: Atualiza um usuário por ID
const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id_cliente: req.params.id }
    });
    
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
    }
    
    return res.status(404).json({ error: 'Usuário não encontrado para atualização.' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// DELETE: Deleta um usuário por ID
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id_cliente: req.params.id }
    });
    
    if (deleted) {
      return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    }
    
    return res.status(404).json({ error: 'Usuário não encontrado para exclusão.' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Função de Login 
const loginUser = async (req, res) => {
    try {
        const { email_cliente, senha_cliente } = req.body;

        // 1. Encontrar o usuário pelo email
        const user = await User.findOne({ where: { email_cliente } });
        if (!user) {
            return res.status(404).json({ message: 'E-mail ou senha incorretos.' });
        }

        // 2. Comparar a senha fornecida com o hash salvo no banco
        const isMatch = await bcrypt.compare(senha_cliente, user.senha_cliente);
        if (!isMatch) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        // 3. Gerar o token de autenticação (JWT)
        const token = jwt.sign(
            { id_cliente: user.id_cliente },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        // Retorna o token e informações do usuário (sem a senha)
        res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            user: {
                email_cliente: user.email_cliente,
                nome_cliente: user.nome_cliente
            }
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// Rota 1: Solicitar Recuperação de Senha
const forgotPassword = async (req, res) => {
    try {
        const { email_cliente } = req.body;
        const user = await User.findOne({ where: { email_cliente } });

        if (!user) {
            return res.status(404).json({ message: 'E-mail não encontrado.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = Date.now() + 3600000;

        user.resetToken = resetToken;
        user.resetTokenExpires = resetTokenExpires;
        await user.save();

        console.log(`
            Simulação de envio de e-mail:
            -------------------------------------------------
            Para: ${user.email_cliente}
            Assunto: Link para Redefinir Sua Senha
            Conteúdo: Clique neste link para redefinir sua senha:
            URL: http://localhost:3000/api/users/reset-password?token=${resetToken}
            -------------------------------------------------
        `);

        res.status(200).json({ message: 'Link de redefinição enviado com sucesso (apenas para teste).' });

    } catch (error) {
        console.error('Erro em forgotPassword:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// Rota 2: Redefinir a Senha com o Token
const resetPassword = async (req, res) => {
    try {
        const { token, nova_senha } = req.body;

        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpires: { [Sequelize.Op.gt]: Date.now() } 
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Token inválido ou expirado.' });
        }
        
        const hashedPassword = await bcrypt.hash(nova_senha, 10);
        
        user.senha_cliente = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        await user.save();

        res.status(200).json({ message: 'Senha redefinida com sucesso!' });

    } catch (error) {
        console.error('Erro em resetPassword:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  forgotPassword, 
  resetPassword
};