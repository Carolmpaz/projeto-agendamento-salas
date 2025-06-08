const pool = require('../config/db');
const reservationService = require('../services/reservationService');

const renderNovaReserva = async (req, res) => {
  try {
    const { rows: salas } = await pool.query(`
      SELECT c.id, c.nome, t.tipo AS tipo_sala
      FROM classroom c
      JOIN type_classroom t ON c.id_type_classroom = t.id
    `);

    const { rows: statusList } = await pool.query(`
      SELECT id, descricao FROM status_reservation
    `);

    res.render('nova_reserva', { salas, statusList });
  } catch (error) {
    console.error('Erro ao carregar formulário de nova reserva:', error);
    res.status(500).send('Erro ao carregar a página de nova reserva');
  }
};

const getAllReservation = async (req, res) => {
  try {
    const Reservation = await reservationService.getAllReservation();
    res.status(200).json(Reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const Reservation = await reservationService.getReservationById(req.params.id);
    if (Reservation) {
      res.status(200).json(Reservation);
    } else {
      res.status(404).json({ error: 'Reserva não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReservation = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("USUÁRIO LOGADO NA SESSÃO:", req.session.user); // Debug para ver a sessão

    const id_users = req.session.user?.id;

    if (!id_users) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { id_classroom, data_reservation, hora_inicio, hora_fim, id_status } = req.body;

    const newReservation = await reservationService.createReservation(
      id_users,
      id_classroom,
      data_reservation,
      hora_inicio,
      hora_fim,
      id_status
    );

res.redirect('/minhas-reservas');  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ error: error.message });
  }
};


const updateReservation = async (req, res) => {
  try {
    const { id_users, id_classroom, data_reservation, hora_inicio, hora_fim, id_status } = req.body;
    const updatedReservation = await reservationService.updateReservation(
      req.params.id,
      id_users,
      id_classroom,
      data_reservation,
      hora_inicio,
      hora_fim,
      id_status
    );
    if (updatedReservation) {
      res.status(200).json(updatedReservation);
    } else {
      res.status(404).json({ error: 'Reserva não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await reservationService.deleteReservation(req.params.id);
    if (deletedReservation) {
      res.status(200).json(deletedReservation);
    } else {
      res.status(404).json({ error: 'Reserva não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  renderNovaReserva,
  getAllReservation,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
