// services/reservationService.js

const db = require('../config/db');


// Função para obter todos os usuários
const getAllReservation = async () => {
  try {
    const result = await db.query('SELECT * FROM reservation');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter reserva: ' + error.message);
  }
};

// Função para criar um novo usuário
const createReservation = async (i, id_classroom, data_reservation, hora_inicio, hora_fim, id_status) => {
  try {
    const result = await db.query(
      'INSERT INTO reservation (i, id_classroom, data_reservation, hora_inicio, hora_fim, id_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [i, id_classroom, data_reservation, hora_inicio, hora_fim, id_status]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar reserva: ' + error.message);
  }
};


// Função para obter um usuário por ID
const getReservationById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM reservation WHERE id_reservation = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter reserva: ' + error.message);
  }
};

// Atualizar usuário
const updateReservation = async (id, i, id_classroom, data_reservation, hora_inicio, hora_fim, id_status) => {
  try {
    const result = await db.query(
      'UPDATE reservation SET i = $1, id_classroom = $2, data_reservation = $3, hora_inicio = $4, hora_fim = $5, id_status = $6 WHERE id_reservation = $7 RETURNING *',
      [i, id_classroom, data_reservation, hora_inicio, hora_fim, id_status, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar reserva: ' + error.message);
  }
};

// Deletar usuário
const deleteReservation = async (id) => {
  try {
    const result = await db.query('DELETE FROM reservation WHERE id_reservation = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar reserva: ' + error.message);
  }
};

module.exports = {
  getAllReservation,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};
