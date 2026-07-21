const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/User');

dotenv.config();

const addFilipe = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI não encontrada no .env');
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado ao MongoDB...');

        const userData = {
            email: 'filipe.mundoconcreto@gmail.com',
            passwordHash: 'TesteConfig@1404', 
            name: 'Filipe - Mundo Concreto',
            serverIp: 'https://api.tanderatech.com.br:3000'
        };

        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            console.log('ℹ️ Usuário já existe. Atualizando dados...');
            Object.assign(existingUser, userData);
            await existingUser.save();
            console.log('✅ Usuário atualizado!');
        } else {
            const newUser = new User(userData);
            await newUser.save();
            console.log('✅ Novo usuário cadastrado com sucesso!');
        }

        const count = await User.countDocuments();
        console.log(`📊 Total de usuários autorizados no sistema: ${count}`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro:', error);
        process.exit(1);
    }
}

addFilipe();
