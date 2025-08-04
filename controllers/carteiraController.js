const Carteira = require('../models/entidades/Carteira');

exports.criarCarteira = async (req, res) => {
  try {
    const { nome } = req.body;
    const novaCarteira = await Carteira.create({ nome });
    res.status(201).json(novaCarteira);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar carteira', detalhe: error.message });
  }
};

exports.listarCarteiras = async (_req, res) => {
  try {
    const carteiras = await Carteira.findAll();

    if (carteiras.length === 0) {
      return res.status(200).json({
        mensagem: 'Nenhuma carteira encontrada no sistema.'
      });
    }

    res.status(200).json(carteiras);
    
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao listar carteiras',
      detalhe: error.message
    });
  }
};

exports.buscarCarteiraPorId = async (req, res) => {
  try {
    const carteira = await Carteira.findByPk(req.params.id);
    if (!carteira) return res.status(404).json({ erro: 'Carteira não encontrada' });
    res.json(carteira);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar carteira', detalhe: error.message });
  }
};

exports.atualizarCarteira = async (req, res) => {
  try {
    const { nome, saldo } = req.body;
    const carteira = await Carteira.findByPk(req.params.id);
    if (!carteira) return res.status(404).json({ erro: 'Carteira não encontrada' });

    carteira.nome = nome ?? carteira.nome;
    carteira.saldo = saldo ?? carteira.saldo;

    await carteira.save();
    res.json(carteira);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar carteira', detalhe: error.message });
  }
};

exports.deletarCarteira = async (req, res) => {
  try {
    const carteira = await Carteira.findByPk(req.params.id);
    if (!carteira) return res.status(404).json({ erro: 'Carteira não encontrada' });

    await carteira.destroy();
    res.json({ mensagem: 'Carteira removida com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar carteira', detalhe: error.message });
  }
};