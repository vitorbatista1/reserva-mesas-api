
const { pool } = require('../db/db');

const criarUsuario = async(nome, email, senha, role) => {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, senha, role]
    );
    return result.rows[0];
  };


const buscarUsuarioEmail = async (email) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};



module.exports = { criarUsuario, buscarUsuarioEmail};
