// 1️⃣ Importa a conexão com o banco (a mesma usada no User.js)
const pool = require('../db/connection');

// 2️⃣ Cria uma nova tarefa associada a um usuário
// Recebe o userId (quem criou), e o título da tarefa
async function createTask(userId, title) {
  try {
    const [result] = await pool.query(
      `INSERT INTO tasks (userId, title) VALUES (?, ?)`,
      [userId, title]
    );

    // Retorna o ID da nova tarefa criada
    return result.insertId;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
}

// 3️⃣ Busca todas as tarefas de um usuário específico
async function getTasksByUser(userId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC`,
      [userId]
    );

    return rows; // retorna todas as tarefas desse usuário
  } catch (error) {
    console.error('Erro ao buscar tarefas do usuário:', error);
    throw error;
  }
}

// 4️⃣ Atualiza o status de uma tarefa (marcar como feita/não feita)
async function updateTaskStatus(taskId, done) {
  try {
    await pool.query(
      `UPDATE tasks SET done = ? WHERE id = ?`,
      [done, taskId]
    );

    return true;
  } catch (error) {
    console.error('Erro ao atualizar status da tarefa:', error);
    throw error;
  }
}

// 5️⃣ Deleta uma tarefa específica
async function deleteTask(taskId) {
  try {
    await pool.query(
      `DELETE FROM tasks WHERE id = ?`,
      [taskId]
    );

    return true;
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
}

// 6️⃣ Exporta todas as funções do model
module.exports = {
  createTask,
  getTasksByUser,
  updateTaskStatus,
  deleteTask
};
