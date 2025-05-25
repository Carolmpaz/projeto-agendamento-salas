// services/status_reservationService.js

const db = require('../config/db');


// Função para obter todos os usuários
const getAllStatus_reservation = async () => {
  try {
    const result = await db.query('SELECT * FROM status_reservation');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter status: ' + error.message);
  }
};

// Função para criar um novo usuário
const createStatus_reservation = async (descricao) => {
  try {
    const result = await db.query(
      'INSERT INTO status_reservation (descricao) VALUES ($1) RETURNING *',
      [descricao]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar status: ' + error.message);
  }
};


// Função para obter um usuário por ID
const getStatus_reservationById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM status_reservation WHERE id_status = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter status: ' + error.message);
  }
};

// Atualizar usuário
const updateStatus_reservation = async (id, descricao) => {
  try {
    const result = await db.query(
      'UPDATE status_reservation SET descricao = $1 WHERE id_status = $2 RETURNING *',
      [descricao, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar status: ' + error.message);
  }
};

// Deletar usuário
const deleteStatus_reservation = async (id) => {
  try {
    const result = await db.query('DELETE FROM status_reservation WHERE id_status = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar status: ' + error.message);
  }
};

module.exports = {
  getAllStatus_reservation,
  getStatus_reservationById,
  createStatus_reservation,
  updateStatus_reservation,
  deleteStatus_reservation
};
