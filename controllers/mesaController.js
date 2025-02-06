const { criarMesa, listarTodasMesas } = require('../models/mesas');


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

const listarTodasMesasController = async (req, res) => {
    try {
        const mesas = await listarTodasMesas();
        const mesasDisponiveis = mesas.filter(mesa => mesa.status !== 'inativo' && mesa.status !== 'reservada')
                                      .map(mesa => ({
                                          numero: mesa.numero,
                                          capacidade: mesa.capacidade,
                                          status: mesa.status
                                      }));

        if (mesasDisponiveis.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhuma mesa disponível encontrada' });
        }

        res.status(200).json({ mesasDisponiveis });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao listar as mesas' });
    }
}


module.exports = { criarMesaController, listarTodasMesasController };