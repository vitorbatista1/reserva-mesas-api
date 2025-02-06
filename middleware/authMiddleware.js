const jwt = require('jsonwebtoken');
const { pool } = require('../db/db'); 

const secretKey = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não encontrado' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const usuario = await pool.query('SELECT * FROM usuarios WHERE id = $1', [decoded.id]);

        if (!usuario.rows.length) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        req.user = usuario.rows[0]; 
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro na autenticação' });
    }
};

module.exports = { authMiddleware };  
