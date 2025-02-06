const { pool } = require('../db/db');

const criarMesa = async ( numero, capacidade, status) => {
  const result = await pool.query(
    'INSERT INTO mesas (numero, capacidade, status) VALUES ($1, $2, $3) RETURNING *',
    [numero, capacidade, status]
  );
  return result.rows[0];
};

const listarTodasMesas = async () => {
  const result = await pool.query('SELECT * FROM mesas');
  return result.rows;
};

module.exports = { criarMesa, listarTodasMesas };