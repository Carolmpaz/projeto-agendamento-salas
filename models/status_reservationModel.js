const db = require('../config/db');

class Status_reservation {
  static async getAll() {
    const result = await db.query('SELECT * FROM status_reservation');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM status_reservation WHERE id_status = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO status_reservation (descricao) VALUES ($1) RETURNING *',
      [data.descricao]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE status_reservation SET descricao = $1 WHERE id_status = $2 RETURNING *',
      [data.descricao, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM status_reservation WHERE id_status = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Status_reservation;
