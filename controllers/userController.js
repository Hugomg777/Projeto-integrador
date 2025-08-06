const User = require('../models/entidades/User');

// CREATE: Cadastra um novo usuário
const createUser = async (req, res) => {
  try {
    const { email_cliente, senha_cliente, nome_cliente, cpf_cliente, telefone_cliente } = req.body;
    
    if (!email_cliente || !senha_cliente || !nome_cliente || !cpf_cliente || !telefone_cliente) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    
    const newUser = await User.create({
      email_cliente,
      senha_cliente,
      nome_cliente,
      cpf_cliente,
      telefone_cliente
    });
    
    res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};