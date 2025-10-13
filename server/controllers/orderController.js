import { MercadoPagoConfig, Payment, PaymentMethod, Preference } from 'mercadopago';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'


const currency = "BRL";

// Adicione credenciais
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });



// --------------------------- PIX pelo Mercado Pago: /api/order/pix --------------------------- 
const placeOrderPix = async (req, res) => {
  try {
    const { transaction_amount, description, payer } = req.body;

    if (!transaction_amount || !description || !payer || !payer.email) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const body = {
      type: 'online',
      total_amount: transaction_amount.toFixed(2),
      external_reference: `pedido-${Date.now()}`,
      processing_mode: 'automatic',
      transactions: {
        payments: [
          {
            amount: transaction_amount.toFixed(2),
            payment_method: {
              id: 'pix',
              type: 'bank_transfer',
            },
            expiration_time: 'P3Y6M4DT12H30M5S',
          },
        ],
      },
      payer: {
        email: payer.email,
      },
    };

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    const response = await axios.post('https://api.mercadopago.com/v1/orders', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Idempotency-Key': uuidv4(),
      },
    });

    return res.status(201).json(response.data);
  } catch (error) {
    console.error('Erro ao criar pedido PIX:', error.response?.data || error.message);

    res.status(error.response?.status || 500).json({
      error: 'Erro ao processar pagamento PIX',
      detalhes: error.response?.data || error.message,
    });
  }
};


// --------------------------- Mercado Pago: /api/order/mercadopago ---------------------------


export { placeOrderPix }




