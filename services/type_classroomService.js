// services/type_classroomService.js

const db = require('../config/db');


// Função para obter todos os usuários
const getAllType_classroom = async () => {
  try {
    const result = await db.query('SELECT * FROM type_classroom');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter tipo de sala: ' + error.message);
  }
};

// Função para criar um novo usuário
const createType_classroom = async (descricao) => {
  try {
    const result = await db.query(
      'INSERT INTO type_classroom (descricao) VALUES ($1) RETURNING *',
      [descricao]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar tipo de sala: ' + error.message);
  }
};


// Função para obter um usuário por ID
const getType_classroomById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM type_classroom WHERE id_type_classroom = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter tipo de sala: ' + error.message);
  }
};

// Atualizar usuário
const updateType_classroom = async (id, descricao) => {
  try {
    const result = await db.query(
      'UPDATE type_classroom SET descricao = $1 WHERE id_type_classroom = $2 RETURNING *',
      [descricao, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar tipo de sala: ' + error.message);
  }
};

// Deletar usuário
const deleteType_classroom = async (id) => {
  try {
    const result = await db.query('DELETE FROM type_classroom WHERE id_type_classroom = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar tipo de sala: ' + error.message);
  }
};

module.exports = {
  getAllType_classroom,
  getType_classroomById,
  createType_classroom,
  updateType_classroom,
  deleteType_classroom
};
