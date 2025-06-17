const db = require('../config/db');
const { reservationSchema, reservationInputSchema } = require('../models/reservationModel');

module.exports = {

  
  async getAllReservation(req, res) {
    try {
      const result = await db.query('SELECT * FROM reservation');
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
      res.status(500).json({ error: 'Erro ao buscar reservas' });
    }
  },


  async getReservationById(req, res) {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT * FROM reservation WHERE id_reservation = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Reserva não encontrada' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar reserva:', error);
      res.status(500).json({ error: 'Erro ao buscar reserva' });
    }
  },


  async renderNovaReserva(req, res) {
    try {
      const classrooms = await db.query('SELECT * FROM classroom');
      const statusList = await db.query('SELECT * FROM status_reservation');
      res.render('novaReserva', { salas: classrooms.rows, statusList: statusList.rows });
    } catch (error) {
      console.error('Erro ao carregar página de nova reserva:', error);
      res.status(500).json({ error: 'Erro ao carregar página de nova reserva' });
    }
  },

 
  async createReservation(req, res) {
    const { data_reservation, hora_inicio, hora_fim, id_classroom, id_status } = req.body;

 
    const horaInicioISO = `${data_reservation}T${hora_inicio.length === 5 ? hora_inicio + ':00' : hora_inicio}`;
    const horaFimISO = `${data_reservation}T${hora_fim.length === 5 ? hora_fim + ':00' : hora_fim}`;

    const reservationData = {
      hora_inicio: horaInicioISO,
      hora_fim: horaFimISO,
      id_classroom: parseInt(id_classroom),
      id_status: parseInt(id_status) || 1,
      data_reservation 
    };

    const { error } = reservationInputSchema.validate(reservationData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const uid = req.session.user?.id;
    if (!uid) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }


    const horaInicioBanco = hora_inicio.length === 5 ? hora_inicio + ':00' : hora_inicio;
    const horaFimBanco = hora_fim.length === 5 ? hora_fim + ':00' : hora_fim;

    try {
      const query = `
        INSERT INTO reservation (id_users, id_classroom, data_reservation, hora_inicio, hora_fim, id_status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const values = [uid, reservationData.id_classroom, reservationData.data_reservation, horaInicioBanco, horaFimBanco, reservationData.id_status];

      await db.query(query, values);
      res.redirect('/minhas-reservas');
    } catch (err) {
      console.error('Erro ao criar reserva:', err);
      res.status(500).json({ error: 'Erro ao criar reserva' });
    }
  },

 
  async updateReservation(req, res) {
    const { id } = req.params;
    const { error, value } = reservationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const query = `
        UPDATE reservation
        SET hora_inicio = $1, hora_fim = $2, id_classroom = $3, id_status = $4, descricao = $5, status = $6
        WHERE id_reservation = $7
        RETURNING *
      `;
      const values = [
        value.hora_inicio,
        value.hora_fim,
        value.id_classroom,
        value.id_status,
        value.descricao,
        value.status,
        id
      ];

      const result = await db.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Reserva não encontrada' });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Erro ao atualizar reserva:', err);
      res.status(500).json({ error: 'Erro ao atualizar reserva' });
    }
  },


  async deleteReservation(req, res) {
    const { id } = req.params;
    try {
      const result = await db.query('DELETE FROM reservation WHERE id_reservation = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Reserva não encontrada' });
      }
      res.json({ message: 'Reserva deletada com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar reserva:', err);
      res.status(500).json({ error: 'Erro ao deletar reserva' });
    }
  }
};
