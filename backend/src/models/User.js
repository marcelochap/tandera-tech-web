const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: false, // Opcional, pois usuários que logarem via Google não terão senha armazenada
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    serverIp: {
        type: String,
        required: true, // "Mapeamento": cada usuário é associado ao servidor do dashboard especifico, ex: "https://api.tanderatech.com.br:3000"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
