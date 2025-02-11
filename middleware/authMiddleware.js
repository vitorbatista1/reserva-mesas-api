const jwt = require('jsonwebtoken');
const { pool } = require('../db/db'); 

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não encontrado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro na autenticação' });
    }
};

module.exports = { authMiddleware };  
