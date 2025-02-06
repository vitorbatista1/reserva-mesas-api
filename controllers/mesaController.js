const { criarMesa } = require('../models/mesas');


const criarMesaController = async (req, res) => {
    const { numero, capacidade, status } = req.body;

    if (!numero || !capacidade || !status) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
    }

    const usuario = req.user;
    
    if (!usuario) { 
        return res.status(401).json({ mensagem: 'Usuário não autenticado' }); 
    } else if (usuario.role !== 'administrador') { 
        return res.status(403).json({ mensagem: 'Usuário não autorizado' });
    }

    try {
        const mesa = await criarMesa(numero, capacidade, status);
        res.status(201).json({ mesa });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao criar a mesa' });
    }
}





module.exports = { criarMesaController };