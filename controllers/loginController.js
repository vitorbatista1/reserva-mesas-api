const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/db');
const {buscarUsuarioEmail} = require('../models/usuario');

const secretKey = process.env.SECRET_KEY


const loginController = async (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
    }

    try {
        const usuario = await buscarUsuarioEmail(email);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Email ou senha inválidos' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(404).json({ mensagem: 'Email ou senha inválidos' });
        }

        const token = jwt.sign({ id: usuario.id }, secretKey, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};

module.exports = { loginController };