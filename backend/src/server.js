const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const sanitizeMiddleware = require('./middleware/sanitize');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares Globais
app.use(cors({
    origin: [
        'https://www.tanderatech.com.br',
        'https://tandera-tech-web.vercel.app',
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Permite ler JSONs do body
app.use(sanitizeMiddleware); // Previne injeção de HTML script no body/params

// Conexão com Banco de Dados
connectDB();

// Rotas de Autenticação
app.use('/api/auth', require('./routes/authRoutes'));

// Rota raiz para health check
app.get('/api', (req, res) => res.json({ status: 'Tandera Auth API online.' }));

// Exporta o app para o runtime Serverless da Vercel
// Em desenvolvimento local, sobe o servidor normalmente
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Auth rodando na porta: ${PORT}`);
    });
}

module.exports = app;
