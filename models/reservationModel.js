const db = require('../config/db');

class Reservation {
  static async getAll() {
    const result = await db.query('SELECT * FROM reservation');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM reservation WHERE id_reservation = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO reservation (id_users, id_classroom, data_reservation, hora_inicio, hora_fim, id_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [data.id_users, data.id_classroom, data.data_reservation, data.hora_inicio, data.hora_fim, data.id_status]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE reservation SET id_users = $1, id_classroom = $2, data_reservation = $3, hora_inicio = $4, hora_fim = $5, id_status = $6 WHERE id_reservation = $7 RETURNING *',
      [data.id_users, data.id_classroom, data.data_reservation, data.hora_inicio, data.hora_fim, data.id_status, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM reservation WHERE id_reservation = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Reservation;
