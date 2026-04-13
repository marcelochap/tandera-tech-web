const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const sanitizeMiddleware = require('./middleware/sanitize');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares Globais
app.use(cors()); // TODO: Na versão prod, restrinja o CORS para o domínio do frontend
app.use(express.json()); // Permite ler JSONs do body
app.use(sanitizeMiddleware); // Previne injeção de HTML script no body/params

// Conexão com Banco de Dados
connectDB();

// Rotas de Autenticação
app.use('/api/auth', require('./routes/authRoutes'));

// Inicialização
app.listen(PORT, () => {
    console.log(`🚀 Servidor Auth rodando na porta: ${PORT}`);
});
