const { pool } = require('../db/db');

const criarMesa = async ( numero, capacidade, status) => {
  const result = await pool.query(
    'INSERT INTO mesas (numero, capacidade, status) VALUES ($1, $2, $3) RETURNING *',
    [numero, capacidade, status]
  );
  return result.rows[0];
};

const obterMesaPorNumero = async (numero) => {
  const result = await pool.query('SELECT * FROM mesas WHERE numero = $1', [numero]);
  return result.rows[0];
};

const atualizarMesa = async (mesa) => {
  await pool.query(
    'UPDATE mesas SET status = $1, data_reserva = $2, tempo_reserva = $3 WHERE numero = $4',
    [mesa.status, mesa.dataReserva, mesa.tempoReserva, mesa.numero] // Corrigindo os nomes das propriedades
  );
};



const listarTodasMesas = async () => {
  const result = await pool.query('SELECT * FROM mesas');
  return result.rows;
};

module.exports = { criarMesa, listarTodasMesas, obterMesaPorNumero, atualizarMesa};