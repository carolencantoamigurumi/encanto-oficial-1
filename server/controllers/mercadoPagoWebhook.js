import axios from 'axios'
import orderModel from '../models/orderModel.js';


const MPWebhook = async (req, res) => {
    try {
        const body = req.body

        if (body.type === 'payment' && body.data && body.data.id) {
            const paymentId = body.data.id

            // Consultar pagamento Mercado Pago para obter status detalhado
            const mpAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
            const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {headers: {Authorization: `Bearer ${mpAccessToken}`}})

            const payment = paymentResponse.data;

            // Atualize o pedido na sua base usando referência externa, por exemplo:
            await orderModel.findOneAndUpdate(
                { payment_id: payment.id }, 
                { status: payment.status, payment_status_detail: payment.status_detail },
                { new: true }
            );

            return res.status(200).send('OK');
        }
    } catch (error) {
        console.error('Erro no webhook Mercado Pago:', error);
        res.status(500).send('Erro interno');
    }
}

export default MPWebhook