
const pool = require('../db/connection');


async function createUser(username, password_hash) {
  try {
    const [result] = await pool.query(
      `INSERT INTO users (username, password_hash) VALUES (?, ?)`,
      [username, password_hash]  // ← parâmetros seguros (evita SQL injection)
    );

   
    return result.insertId;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

async function findByUsername(username) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );

  
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar usuário por username:', error);
    throw error;
  }
}


async function findById(id) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    throw error;
  }
}


module.exports = {
  createUser,
  findByUsername,
  findById
};

