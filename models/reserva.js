const { pool } = require('../db/db');


const criarReserva = async (nome, status) => {
  const result = await pool.query(
    'INSERT INTO reservas (nome, status) VALUES ($1, $2) RETURNING *',
    [nome, status]
  );
  return result.rows[0];
};

const obterReserva = async (id) => {
  const result = await pool.query('SELECT * FROM reservas WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = { criarReserva, obterReserva };
