const validator = require('validator');
const bcrypt = require('bcryptjs');
const { criarUsuario, obterUsuario, obterTodosUsuarios, buscarUsuarioEmail } = require('../models/usuario');

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









const buscarTodosUsuarios = async (req, res) => {
    const usuarios = await obterTodosUsuarios();
    res.json({ usuarios });
};

const buscarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await obterUsuario(id);
    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    const { nome, email } = usuario;
    res.json({ nome, email });
  };



module.exports = { criarUsuarioController, buscarTodosUsuarios, buscarUsuario};