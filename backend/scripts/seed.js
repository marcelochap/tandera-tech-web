// Script autônomo para inicializar usuários de teste no MongoDB. 
// Como discutimos, essa função precisa existir para você ligar as portas, sem ter que fazer query manual no banco de dados.

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/User');

dotenv.config(); // Carrega o MongoURI do .env

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tanderaauth');
        console.log('✅ Conectado ao MongoDB para Seeding...');

        // Deletar antigos (Apenas em ambiente de teste DEV!)
        await User.deleteMany({});
        console.log('🚮 Base limpa.');

        const defaultUsers = [
            {
                // Usuário comum - Vai testar o fluxo de e-mail tradicional
                email: 'adm@tanderatech.com',
                passwordHash: 'TODO_HASHED_SENHA_AQUI',   // Substituíremos caso desejar usar o bcrypt depois
                name: 'Administrador Local',
                serverIp: 'https://api.tanderatech.com.br:3000'
            },
            {
                // SEU EMAIL PESSOAL DO GOOGLE CLOUD
                // Altere esse valor! Esse e-mail fará login automático com 1 click.
                email: 'marcelo.leite.engcivil@gmail.com',
                name: 'Marcelo (Google)',
                serverIp: 'https://api.tanderatech.com.br:3000'
            }
        ];

        await User.insertMany(defaultUsers);
        console.log('🌟 Seeding Concluído! Usuários Inseridos na Coleção.');
        process.exit();

    } catch (error) {
        console.error('❌ Falha ao inserir: ', error);
        process.exit(1);
    }
}

seedUsers();
