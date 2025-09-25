const ServicoPagamento = require('../services/ServicoPagamento'); 
const ModeloPagamento = require('../models/ModeloPagamento');

class PagamentoController {
    
    async criarPagamento(req, res) {
        try {
            const { itens, valorTotal, idPedido, metodoPagamento, infoCliente } = req.body;
            
            const dadosPagamento = await ServicoPagamento.criar(
                itens, 
                valorTotal, 
                infoCliente, 
                metodoPagamento
            );

            const novoPagamento = await ModeloPagamento.create({
                id_transacao_gateway: dadosPagamento.id,
                id_pedido: idPedido,
                forma_pagamento: metodoPagamento,
                valor_pagamento: valorTotal,
                status: 'pendente',
                detalhes_gateway: dadosPagamento,
                data_pagamento: new Date()
            });

            return res.status(201).json({ 
                mensagem: "Pagamento criado com sucesso.", 
                pagamento: novoPagamento, 
                urlRedirecionamento: dadosPagamento.urlRedirecionamento
            });

        } catch (erro) {
            console.error('Erro ao criar pagamento:', erro);
            return res.status(500).json({ 
                erro: 'Falha ao processar a criação do pagamento.',
                detalhes: erro.message 
            });
        }
    }

    async lidarComWebhook(req, res) {
        const { tipoEvento, dados } = req.body;
        
        
        if (tipoEvento === 'pagamento.aprovado') {
            const idTransacaoGateway = dados.id;
            
            try {
                const pagamento = await ModeloPagamento.findOne({ 
                    where: { id_transacao_gateway: idTransacaoGateway } 
                });

                if (pagamento && pagamento.status === 'pendente') {
                    pagamento.status = 'aprovado';
                    await pagamento.save(); 

                    console.log(`Pagamento ${idTransacaoGateway} aprovado! Pedido pronto para processamento.`);
                }
                
            } catch (erro) {
                console.error('Erro ao processar webhook:', erro);
                return res.status(200).send('Webhook processado (com erro interno).'); 
            }
        }
        
        return res.status(200).send('Webhook recebido e processado.');
    }

    async obterStatusPagamento(req, res) {
        try {
            const idPagamento = req.params.id;
            
            const pagamento = await ModeloPagamento.findByPk(idPagamento);
            
            if (!pagamento) {
                return res.status(404).json({ erro: 'Pagamento não encontrado.' });
            }
            
            return res.status(200).json({ status: pagamento.status, detalhes: pagamento });
            
        } catch (erro) {
            console.error('Erro ao buscar status do pagamento:', erro);
            return res.status(500).json({ erro: 'Falha ao buscar status do pagamento.' });
        }
    }
}

module.exports = new PagamentoController();