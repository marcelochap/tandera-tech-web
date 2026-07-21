const mongoose = require('mongoose');
const User = require('../src/models/User');
const dotenv = require('dotenv');
const path = require('path');

// Carrega variáveis de ambiente do backend
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI_ENV = process.env.MONGO_URI;
const MONGO_URI_FALLBACK = 'mongodb://Vercel-Admin-tandera-web-db:0zqOacTH1rToS2Af@ac-gsm1pqc-shard-00-00.9tneuya.mongodb.net:27017,ac-gsm1pqc-shard-00-01.9tneuya.mongodb.net:27017,ac-gsm1pqc-shard-00-02.9tneuya.mongodb.net:27017/test?ssl=true&replicaSet=atlas-yv2rrz-shard-0&authSource=admin&retryWrites=true&w=majority';

async function addUser() {
    try {
        console.log('Conectando ao MongoDB...');
        try {
            await mongoose.connect(MONGO_URI_ENV);
            console.log('Conectado com sucesso via URI padrão!');
        } catch (connError) {
            if (connError.message.includes('querySrv') || connError.code === 'ECONNREFUSED' || connError.syscall === 'querySrv') {
                console.warn('⚠️ Falha de DNS com a URI SRV padrão. Tentando URI de fallback sem SRV...');
                await mongoose.connect(MONGO_URI_FALLBACK);
                console.log('Conectado com sucesso via URI de fallback!');
            } else {
                throw connError;
            }
        }

        const userData = {
            email: 'comblocoprefabricados@gmail.com',
            passwordHash: 'TanderaCombloco@2026',
            name: 'Jefferson - Combloco',
            serverIp: 'https://combloco.tanderatech.com.br:3000'
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
