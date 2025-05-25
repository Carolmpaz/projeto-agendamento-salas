const db = require('../config/db');

class Type_classroom {
  static async getAll() {
    const result = await db.query('SELECT * FROM type_classroom');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM type_classroom WHERE id_type_classroom = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO type_classroom (descricao) VALUES ($1) RETURNING *',
      [data.descricao]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE type_classroom SET descricao = $1 WHERE id_type_classroom = $2 RETURNING *',
      [data.ndescricao, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM type_classroom WHERE id_type_classroom = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Type_classroom;
