

const db = require('../config/db');



const getAllClassroom = async () => {
  try {
    const result = await db.query('SELECT * FROM classroom');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter sala: ' + error.message);
  }
};


const createClassroom = async (nome, capacidade, localizacao) => {
  try {
    const result = await db.query(
      'INSERT INTO classroom (nome, capacidade, localizacao) VALUES ($1, $2, $3) RETURNING *',
      [nome, capacidade, localizacao]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar sala: ' + error.message);
  }
};



const getClassroomById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM classroom WHERE id_classroom = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter sala: ' + error.message);
  }
};

const updateClassroom = async (id, nome, capacidade, localizacao) => {
  try {
    const result = await db.query(
      'UPDATE classroom SET nome = $1, capacidade = $2, localizacao = $3 WHERE id_classroom = $4 RETURNING *',
      [nome, capacidade, localizacao, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar sala: ' + error.message);
  }
};


const deleteClassroom = async (id) => {
  try {
    const result = await db.query('DELETE FROM classroom WHERE id_classroom = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar sala: ' + error.message);
  }
};

module.exports = {
  getAllClassroom,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom
};
