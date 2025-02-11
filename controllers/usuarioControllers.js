const validator = require('validator');
const bcrypt = require('bcryptjs');
const { criarUsuario, buscarUsuarioEmail } = require('../models/usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


const criarUsuarioController = async (req, res) => { 
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
    }

    if (!validator.isEmail(email)) { 
        return res.status(400).json({ mensagem: 'O e-mail informado é inválido, digite um email válido' });
    }

    if (await buscarUsuarioEmail(email)) { 
        return res.status(400).json({ mensagem: 'O e-mail informado ja existe' });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10); 
        const role = 'cliente';
        const usuario = await criarUsuario(nome, email, senhaHash, role);
        res.status(201).json({ usuario });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao criar o usuário' });
    }
};

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

        const token = jwt.sign({ id: usuario.id, role: usuario.role}, secretKey, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};








module.exports = { criarUsuarioController, loginController};