const db = require('../config/db');

class Classroom {
  static async getAll() {
    const result = await db.query('SELECT * FROM classroom');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM classroom WHERE id_classroom = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO classroom (nome, capacidade, localizacao) VALUES ($1, $2, $3) RETURNING *',
      [data.nome, data.capacidade, data.localizacao]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE classroom SET nome = $1, capacidade = $2, localizacao = $3 WHERE id_classroom = $4 RETURNING *',
      [data.nome, data.capacidade, data.localizacao, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM classroom WHERE id_classroom = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Classroom;
