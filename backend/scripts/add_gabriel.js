const mongoose = require('mongoose');
const User = require('../src/models/User');
const dotenv = require('dotenv');
const path = require('path');

// Carrega variáveis de ambiente do backend
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

async function addUser() {
    try {
        console.log('Conectando ao MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Conectado com sucesso!');

        const userData = {
            email: 'gabriel@distritalpremoldados.com.br',
            passwordHash: 'TanderaDistrital@2026', 
            name: 'Gabriel - Distrital',
            serverIp: 'https://distrital.tanderatech.com.br:3000'
        };

        // Verifica se já existe
        const existingUser = await User.findOne({ email: userData.email });
        
        if (existingUser) {
            console.log('Usuário já existe no banco de dados. Atualizando senha e dados...');
            existingUser.passwordHash = userData.passwordHash;
            existingUser.name = userData.name;
            existingUser.serverIp = userData.serverIp;
            await existingUser.save();
            console.log('Usuário atualizado com sucesso!');
        } else {
            const newUser = new User(userData);
            await newUser.save();
            console.log('Usuário cadastrado com sucesso!');
        }

        // Listar usuários para confirmar
        const allUsers = await User.find({}, 'email name serverIp');
        console.log('\nUsuários atualmente autorizados:');
        console.table(allUsers.map(u => u.toObject()));

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Desconectado do MongoDB.');
    }
}

addUser();
