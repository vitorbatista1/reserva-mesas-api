const { criarMesa, listarTodasMesas, obterMesaPorNumero, atualizarMesa } = require('../models/mesas');


const criarMesaController = async (req, res) => {
    const { numero, capacidade, status } = req.body;

    if (!numero || !capacidade || !status) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
    }

    const usuario = req.user;
    
    if (!usuario) { 
        return res.status(401).json({ mensagem: 'Usuário não autenticado' }); 
    } 

    if (usuario.role !== 'administrador') {
        return res.status(403).json({ mensagem: 'Apenas administradores podem criar mesas' });
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

const reservarMesaController = async(req, res) => {
    const { numero, data, tempoReserva } = req.body;

    if (!numero || !data || !tempoReserva) {
        return res.status(400).json({message: 'Todos os campos devem ser preenchidos'});
    }

    try {
        const mesa = await obterMesaPorNumero(numero);

        if (!mesa) {
            return res.status(404).json({message: 'Mesa não encontrada'});
        }

        if (mesa.status === 'reservada') {
            return res.status(400).json({message: 'Mesa ja reservada'});
        }

        mesa.status = 'reservada';
        mesa.dataReserva = data;
        mesa.tempoReserva = tempoReserva;

        await atualizarMesa(mesa);

        setTimeout(async () => {
            mesa.status = 'disponivel'; 
            mesa.dataReserva = null;
            mesa.tempoReserva = null;

            await atualizarMesa(mesa);
            console.log(`Mesa ${mesa.numero} liberada`);
        }, tempoReserva * 60000);
        return res.status(200).json({ mensagem: 'Mesa reservada com sucesso'});
    } catch (error) {   
        console.error(error);
        return res.status(500).json({ message: 'Erro ao reservar a mesa' });
    }
}


module.exports = { criarMesaController, listarTodasMesasController, reservarMesaController};