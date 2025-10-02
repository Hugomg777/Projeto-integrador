const ModeloPagamento = require('../models/entidades/Pagamento');

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

            let statusInicial = (dadosPagamento.status === 'approved') ? 'aprovado' : 'pendente';
            
            const novoPagamento = await ModeloPagamento.create({
                id_transacao_gateway: dadosPagamento.id,
                id_pedido: idPedido,
                forma_pagamento: metodoPagamento,
                valor_pagamento: valorTotal,
                status: statusInicial,
                detalhes_gateway: dadosPagamento,
                data_pagamento: new Date()
            });

            const resposta = { 
                mensagem: "Pagamento criado com sucesso.", 
                pagamento: novoPagamento, 
                detalhes_checkout: dadosPagamento.urlRedirecionamento || dadosPagamento.dadosPix || dadosPagamento.dadosBoleto
            };

            return res.status(201).json(resposta);

        } catch (erro) {
            console.error('Erro ao criar pagamento:', erro);
            return res.status(500).json({ 
                erro: 'Falha ao processar a criação do pagamento.',
                detalhes: erro.message 
            });
        }
    }

    async lidarComWebhook(req, res) {
        const idTransacaoGateway = req.query.id || req.body.data.id; 

        if (!idTransacaoGateway) {
             return res.status(400).send('ID de transação não fornecido.');
        }

        try {
            const dadosDoGateway = await ServicoPagamento.consultarStatus(idTransacaoGateway);
            const statusFinal = dadosDoGateway.status;
            
            const pagamento = await ModeloPagamento.findOne({ 
                where: { id_transacao_gateway: idTransacaoGateway } 
            });

            if (pagamento) {
                if (pagamento.status !== statusFinal) {
                    pagamento.status = statusFinal;
                    await pagamento.save(); 

                    if (statusFinal === 'approved') {
                    } 
                }
            }
            
            return res.status(200).send('Webhook processado.'); 

        } catch (erro) {
            console.error('Erro ao processar webhook:', erro);
            return res.status(200).send('Erro interno ao processar webhook.'); 
        }
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

    // MÉTODO QUE FALTAVA (RESOLVE O ERRO DA ROTA)
    async obterPublicKey(req, res) {
        try {
            const publicKey = process.env.MERCADOPAGO_PUBLIC_KEY;

            if (!publicKey) {
                return res.status(500).json({ mensagem: "MERCADOPAGO_PUBLIC_KEY não configurada no ambiente." });
            }

            return res.status(200).json({ public_key: publicKey });

        } catch (erro) {
            console.error('Erro ao obter Public Key:', erro);
            return res.status(500).json({ erro: 'Falha ao obter a Public Key.' });
        }
    }
}

module.exports = new PagamentoController();