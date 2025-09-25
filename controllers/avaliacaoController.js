const Avaliacao = require('../models/entidades/Avaliacao');
const Produto = require('../models/entidades/Product'); 

const validarDadosAvaliacao = (req, res, next) => {
    const { nota, id_produto } = req.body;
    
    if (nota === undefined || isNaN(parseFloat(nota)) || parseFloat(nota) < 0 || parseFloat(nota) > 5) {
        return res.status(400).json({ 
            mensagem: 'O campo "nota" é obrigatório e deve ser um número válido entre 0.0 e 5.0.' 
        });
    }

    // A validação de id_produto é necessária apenas para a rota POST (Criação).
    // Para PUT (Atualização), o id_produto pode não estar no body se não for alterado.
    // Deixaremos a validação aqui, mas se quiser flexibilizar o PUT, remova este bloco:
    if (req.method === 'POST' && (!id_produto || isNaN(parseInt(id_produto)))) {
        return res.status(400).json({ 
            mensagem: 'O campo "id_produto" é obrigatório e deve ser um ID válido.' 
        });
    }

    next();
};


const criarAvaliacaoProduto = async (req, res) => {
    try {
        const { nota, comentario, id_produto } = req.body; 
        
        const produto = await Produto.findByPk(id_produto);
        if (!produto) {
            return res.status(404).json({ 
                mensagem: `Produto com ID ${id_produto} não encontrado.` 
            });
        }

        const novaAvaliacao = await Avaliacao.create({ 
            nota, 
            comentario,
            id_produto
        });

        return res.status(201).json(novaAvaliacao);

    } catch (error) {
        console.error('Erro ao criar avaliação para produto:', error);
        return res.status(500).json({ 
            mensagem: 'Erro interno do servidor ao criar a avaliação.', 
            erro: error.message 
        });
    }
};


const listarAvaliacoesPorProduto = async (req, res) => {
    try {
        const { id_produto } = req.params;

        const produto = await Produto.findByPk(id_produto);
        if (!produto) {
            return res.status(404).json({ 
                mensagem: `Produto com ID ${id_produto} não encontrado.` 
            });
        }
        
        const avaliacoes = await Avaliacao.findAll({
            where: { id_produto },
            order: [['data_avaliacao', 'DESC']]
        });

        if (avaliacoes.length === 0) {
            return res.status(200).json({ 
                mensagem: `O produto ID ${id_produto} não possui avaliações.`,
                avaliacoes: []
            });
        }

        return res.status(200).json(avaliacoes);

    } catch (error) {
        console.error('Erro ao listar avaliações por produto:', error);
        return res.status(500).json({ 
            mensagem: 'Erro interno do servidor ao listar as avaliações do produto.', 
            erro: error.message 
        });
    }
};

// --- FUNÇÃO FALTANTE: ATUALIZAR ---
const atualizarAvaliacao = async (req, res) => {
    try {
        const { id_avaliacao } = req.params;
        const { nota, comentario } = req.body;

        const [ linhasAfetadas ] = await Avaliacao.update(
            { nota, comentario }, 
            { where: { id_avaliacao } }
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({ 
                mensagem: `Avaliação com ID ${id_avaliacao} não encontrada para atualização.` 
            });
        }
        
        const avaliacaoAtualizada = await Avaliacao.findByPk(id_avaliacao);

        return res.status(200).json(avaliacaoAtualizada);

    } catch (error) {
        console.error('Erro ao atualizar avaliação:', error);
        return res.status(500).json({ 
            mensagem: 'Erro interno do servidor ao atualizar a avaliação.', 
            erro: error.message 
        });
    }
};

// --- FUNÇÃO FALTANTE: DELETAR ---
const deletarAvaliacao = async (req, res) => {
    try {
        const { id_avaliacao } = req.params;

        const linhasDeletadas = await Avaliacao.destroy({
            where: { id_avaliacao }
        });

        if (linhasDeletadas === 0) {
            return res.status(404).json({ 
                mensagem: `Avaliação com ID ${id_avaliacao} não encontrada para exclusão.` 
            });
        }

        return res.status(204).send(); 

    } catch (error) {
        console.error('Erro ao deletar avaliação:', error);
        return res.status(500).json({ 
            mensagem: 'Erro interno do servidor ao deletar a avaliação.', 
            erro: error.message 
        });
    }
};

module.exports = {
    validarDadosAvaliacao,
    criarAvaliacaoProduto,
    listarAvaliacoesPorProduto,
    atualizarAvaliacao,
    deletarAvaliacao
};