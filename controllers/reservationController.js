// controllers/reservationController.js

const reservationService = require('../services/reservationService');

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
      res.status(404).json({ error: 'Reserva não escontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const { id_users, id_classroom, data_reservation, hora_inicio, hora_fim, id_status} = req.body;
    const newReservation = await reservationService.createReservation(id_users, id_classroom, data_reservation, hora_inicio, hora_fim, id_status);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateReservation = async (req, res) => {
  try {
    const {id_users, id_classroom, data_reservation, hora_inicio, hora_fim, id_status} = req.body;
    const updatedReservation = await reservationService.updateReservation(req.params.id, id_users, id_classroom, data_reservation, hora_inicio, hora_fim, id_status);
    if (updatedReservation) {
      res.status(200).json(updatedReservation);
    } else {
      res.status(404).json({ error: 'Reserva não escontrada' });
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
      res.status(404).json({ error: 'Reserva não escontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReservation,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};
