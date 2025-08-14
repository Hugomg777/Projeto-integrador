const Pedido = require('../models/entidades/Pedido'); 

exports.criarPedido = async (req, res) => {
  try {
    const { valor_total, status_pedido, data_pagamento, data_envio } = req.body;
    const novoPedido = await Pedido.create({
      valor_total,
      status_pedido,
      data_pagamento,
      data_envio
    });
    res.status(201).json(novoPedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao criar pedido.' });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao listar pedidos.' });
  }
};

exports.buscarPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params; // O ID virá da URL, ex: /pedidos/123
    const pedido = await Pedido.findByPk(id); // findByPk busca pela chave primária

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    console.error('Erro ao buscar pedido por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar pedido.' });
  }
};

exports.atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { valor_total, status_pedido, data_pagamento, data_envio } = req.body;

    const [linhasAfetadas] = await Pedido.update({
      valor_total,
      status_pedido,
      data_pagamento,
      data_envio
    }, {
      where: { id_pedido: id }
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado ou nenhum dado para atualizar.' });
    }

    // Se a atualização foi bem-sucedida, buscamos o registro atualizado
    const pedido = await Pedido.findByPk(id);
    
    // Retornamos o objeto atualizado
    res.status(200).json(pedido);

  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar pedido.' });
  }
};

exports.deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const linhasDeletadas = await Pedido.destroy({
      where: { id_pedido: id } 
    });

    if (linhasDeletadas === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    res.status(200).json({ message: 'Pedido apagado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao deletar pedido.' });
  }
};