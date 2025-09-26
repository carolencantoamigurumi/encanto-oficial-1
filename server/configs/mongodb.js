import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Banco de Dados Conectado'))
        await mongoose.connect(`${process.env.MONGODB_URI}/encanto`)
    } catch (error) {
        console.log(error.message);                
    }
}

export default connectDB