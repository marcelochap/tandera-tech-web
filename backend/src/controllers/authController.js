const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

// Simulação de Throttling em memória para o protótipo
const loginAttempts = new Map();

// Função para checar e adicionar tentativa
function checkThrottling(email) {
    const attempts = loginAttempts.get(email) || 0;
    if (attempts >= 3) {
        return true; // Bloqueado
    }
    return false;
}

function registerAttempt(email) {
    const attempts = loginAttempts.get(email) || 0;
    loginAttempts.set(email, attempts + 1);
}

function resetAttempts(email) {
    loginAttempts.delete(email);
}

// Emite JWT de sessão
function generateSessionToken(user) {
    return jwt.sign(
        { email: user.email, name: user.name, serverIp: user.serverIp },
        JWT_SECRET,
        { expiresIn: '8h' }
    );
}

exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        
        // Verifica assinatura com o Google
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const googleEmail = payload.email.toLowerCase();

        // Busca o email validado do Google no nosso banco Local
        const user = await User.findOne({ email: googleEmail });

        if (!user) {
            return res.status(401).json({ message: 'E-mail não está autorizado no sistema (Usuário não encontrado).' });
        }

        // Sucesso
        resetAttempts(googleEmail);
        const token = generateSessionToken(user);
        res.json({ token, user: { email: user.email, name: user.name, serverIp: user.serverIp } });

    } catch (error) {
        console.error('Erro Auth Google:', error);
        res.status(401).json({ message: 'Falha ao validar credencial do Google.' });
    }
};

exports.defaultLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase();

        if (checkThrottling(normalizedEmail)) {
            return res.status(429).json({ message: 'Muitas tentativas falhas. Conta temporariamente bloqueada por segurança.' });
        }

        // BACKDOOR PARA AGENTES DE TESTE (IGNORA MONGODB)
        if (
            process.env.AGENT_EMAIL && process.env.AGENT_PASSWORD &&
            normalizedEmail === process.env.AGENT_EMAIL.toLowerCase() &&
            password === process.env.AGENT_PASSWORD
        ) {
            resetAttempts(normalizedEmail);
            const token = generateSessionToken({ email: normalizedEmail, name: "IA Test Agent", serverIp: "https://api.tanderatech.com.br:3000" });
            return res.json({ token, user: { email: normalizedEmail, name: "IA Test Agent", serverIp: "https://api.tanderatech.com.br:3000" } });
        }

        const user = await User.findOne({ email: normalizedEmail });

        // No protótipo real seria `bcrypt.compare`, mas como está cru (TODO)
        if (!user || user.passwordHash !== password) {
            registerAttempt(normalizedEmail);
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        resetAttempts(normalizedEmail);
        const token = generateSessionToken(user);
        res.json({ token, user: { email: user.email, name: user.name, serverIp: user.serverIp } });

    } catch (error) {
        console.error('Erro Auth Tradicional:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};
