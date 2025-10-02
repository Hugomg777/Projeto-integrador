const { MercadoPagoConfig, Payment } = require('mercadopago');

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

let mpClientInstance = null;

if (ACCESS_TOKEN) {
    try {
        mpClientInstance = new MercadoPagoConfig({ 
            accessToken: ACCESS_TOKEN,
            options: { timeout: 5000 }
        });
        console.log("Integração Mercado Pago configurada com sucesso (SDK v2.x).");
    } catch (e) {
        console.error("ERRO ao configurar Mercado Pago:", e.message);
    }
} else {
    console.warn("AVISO: MERCADOPAGO_ACCESS_TOKEN não está definido. Pagamentos não funcionarão.");
}

class ServicoPagamento {
    
    _getPaymentClient() {
        if (!mpClientInstance) {
             throw new Error('Serviço de pagamento indisponível: Token não configurado.');
        }
        return new Payment(mpClientInstance);
    }

    async criar(itens, valorTotal, infoCliente, metodoPagamento) {
        
        switch (metodoPagamento) {
            case 'cartao':
                return this.criarPagamentoCartao(itens, valorTotal, infoCliente);
            case 'pix':
                return this.criarPagamentoPix(itens, valorTotal, infoCliente);
            case 'boleto':
                return this.criarPagamentoBoleto(itens, valorTotal, infoCliente);
            default:
                throw new Error('Método de pagamento inválido.');
        }
    }

    async criarPagamentoCartao(itens, valorTotal, infoCliente) {
        const paymentClient = this._getPaymentClient();

        const paymentData = {
            transaction_amount: valorTotal,
            token: infoCliente.paymentToken,
            description: itens.map(i => i.descricao).join(', '),
            installments: infoCliente.parcelas || 1,
            payment_method_id: infoCliente.metodoCartao,
            payer: {
                email: infoCliente.email,
                identification: {
                    type: infoCliente.tipoDocumento, 
                    number: infoCliente.numeroDocumento
                }
            },
            notification_url: WEBHOOK_URL
        };

        const response = await paymentClient.create({ body: paymentData });
        
        return {
            id: response.id,
            status: response.status,
            urlRedirecionamento: null
        };
    }

    async criarPagamentoPix(itens, valorTotal, infoCliente) {
        const paymentClient = this._getPaymentClient();

        const paymentData = {
            transaction_amount: valorTotal,
            description: itens.map(i => i.descricao).join(', '),
            payment_method_id: 'pix',
            payer: {
                email: infoCliente.email,
                first_name: infoCliente.nome,
                identification: {
                    type: infoCliente.tipoDocumento,
                    number: infoCliente.numeroDocumento
                }
            },
            notification_url: WEBHOOK_URL
        };

        const response = await paymentClient.create({ body: paymentData });
        
        return {
            id: response.id,
            status: response.status,
            urlRedirecionamento: null,
            dadosPix: response.point_of_interaction.transaction_data 
        };
    }
    
    async criarPagamentoBoleto(itens, valorTotal, infoCliente) {

        return {
            id: 'simulado_boleto',
            status: 'pendente',
            urlRedirecionamento: null,
            dadosBoleto: { linha_digitavel: '00000.00000 00000.000000 00000.000000 0 00000000000000' }
        };
    }

    async consultarStatus(idTransacaoGateway) {
        const paymentClient = this._getPaymentClient();
        
        const response = await paymentClient.get({ id: idTransacaoGateway });
        return response;
    }
}

module.exports = new ServicoPagamento();