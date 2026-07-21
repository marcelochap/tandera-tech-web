const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/tanderaauth';
        await mongoose.connect(uri);
        console.log('✅ MongoDB conectado com sucesso na URI:', uri);
    } catch (error) {
        console.error('❌ Erro de conexão MongoDB:', error.message);
        process.exit(1); // Encerra o app caso não haja db
    }
};

module.exports = connectDB;
