const Queue = require('bull');
const reservaQueue = new Queue('reserva', 'redis://192.168.4.169:6379');
const { criarMesa, listarTodasMesas, obterMesaPorNumero, atualizarMesa } = require('../models/mesas');
const { pool } = require('../db/db');
const Joi = require('joi');
const { isPast, addMinutes } = require('date-fns');

// Verifica a conexão do Bull com o Redis
reservaQueue.on('ready', () => {
    console.log('✅ Bull conectado ao Redis com sucesso.');
});

reservaQueue.on('error', (error) => {
    console.error('❌ Erro na conexão do Bull com o Redis:', error);
});

// Controller para criar uma mesa
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
};

// Controller para listar todas as mesas
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
};

// Schema de validação para reserva
const schemaReserva = Joi.object({
    numero: Joi.number().integer().positive().required(),
    data: Joi.string().isoDate().required(),
    tempoReserva: Joi.number().integer().min(1).required()
});

// Processamento das reservas na fila Bull
reservaQueue.process(async (job) => {
    console.log(`🔄 [PROCESSANDO JOB] Job ID: ${job.id}, Mesa: ${job.data.numero}`);
    const { numero, dataReserva, tempoReserva } = job.data;

    try {
        console.log(`⏳ [RESERVA INICIADA] Mesa ${numero} reservada até ${dataReserva}`);

        // Aguarda o tempo de reserva expirar
        await new Promise(resolve => setTimeout(resolve, tempoReserva * 60000));

        // Atualiza o status da mesa para "disponivel" no banco de dados
        const mesa = await obterMesaPorNumero(numero);
        if (mesa && mesa.status === 'reservada') {
            await atualizarMesa({ ...mesa, status: 'disponivel', dataReserva: null, tempoReserva: null });
            console.log(`✅ [RESERVA FINALIZADA] Mesa ${numero} liberada após ${tempoReserva} minutos.`);
        } else {
            console.log(`⚠️ [MESA NÃO ENCONTRADA OU JÁ LIBERADA] Mesa ${numero}`);
        }
    } catch (error) {
        console.error(`❌ [ERRO NA RESERVA] Mesa ${numero}: ${error.message}`);
    }
});

// Controller para reservar uma mesa
const reservarMesaController = async (req, res) => {
    const { error, value } = schemaReserva.validate(req.body, { convert: true });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { numero, data, tempoReserva } = value;
    const dataReserva = new Date(data);

    try {
        // Verifica se a mesa existe e está disponível
        const mesa = await obterMesaPorNumero(numero);

        if (!mesa) {
            return res.status(404).json({ message: 'Mesa não encontrada' });
        }

        if (mesa.status === 'reservada') {
            return res.status(400).json({ message: 'Mesa já está reservada' });
        }

        // Atualiza o status da mesa para "reservada" no banco de dados
        await atualizarMesa({ ...mesa, status: 'reservada', dataReserva: dataReserva.toISOString(), tempoReserva });

        // Adiciona a reserva na fila Bull com atraso proporcional ao tempo de reserva
        const tempoAteLiberacao = tempoReserva * 60000;
        await reservaQueue.add(
            { numero, dataReserva: dataReserva.toISOString(), tempoReserva },
            { delay: tempoAteLiberacao }
        );

        console.log(`📥 [RESERVA ADICIONADA] Mesa ${numero} agendada para reserva.`);

        return res.status(200).json({
            mensagem: 'Mesa agendada para reserva',
            dataExpiracao: addMinutes(dataReserva, tempoReserva).toISOString(),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao agendar reserva' });
    }
};

module.exports = { criarMesaController, listarTodasMesasController, reservarMesaController };