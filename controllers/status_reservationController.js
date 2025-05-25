// controllers/status_reservationController.js

const status_reservationService = require('../services/status_reservationService');

const getAllStatus_reservation = async (req, res) => {
  try {
    const Status_reservation = await status_reservationService.getAllStatus_reservation();
    res.status(200).json(Status_reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStatus_reservationById = async (req, res) => {
  try {
    const Status_reservation = await status_reservationService.getStatus_reservationById(req.params.id);
    if (Status_reservation) {
      res.status(200).json(Status_reservation);
    } else {
      res.status(404).json({ error: 'Status não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStatus_reservation = async (req, res) => {
  try {
    const { descricao} = req.body;
    const newStatus_reservation = await status_reservationService.createStatus_reservation(descricao);
    res.status(201).json(newStatus_reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateStatus_reservation = async (req, res) => {
  try {
    const { descricao} = req.body;
    const updatedStatus_reservation = await status_reservationService.updateStatus_reservation(req.params.id, descricao);
    if (updatedStatus_reservation) {
      res.status(200).json(updatedStatus_reservation);
    } else {
      res.status(404).json({ error: 'Status não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStatus_reservation = async (req, res) => {
  try {
    const deletedStatus_reservation = await status_reservationService.deleteStatus_reservation(req.params.id);
    if (deletedStatus_reservation) {
      res.status(200).json(deletedStatus_reservation);
    } else {
      res.status(404).json({ error: 'Status não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStatus_reservation,
  getStatus_reservationById,
  createStatus_reservation,
  updateStatus_reservation,
  deleteStatus_reservation
};
