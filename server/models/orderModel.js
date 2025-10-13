import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    items: [{
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: [{ type: String, required: true }],
        discount: { type: Number, required: true, min:0, max:100},
    }],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: { type: String, enum: ['Pedido Feito', 'Pago', 'Cancelado'], default: 'Pedido Feito' },
    paymentMethod: { type: String, enum: ['bank_transfer', 'credit_card', 'ticket'], required: true },
    payment: {type: Boolean, required: true, default: false},
    payment_id: { type: String },
    date: {type: Date, required: true, default: Date.now},
}, { timestamps: true })

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)

export default orderModel