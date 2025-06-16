const db = require('../config/db'); // Ajuste para seu client PG
const statusReservationSchema = require('../models/status_reservationModel');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM status_resrvation');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar salas:', error);
        res.status(500).json({ error: 'Erro ao listar salas' });
    }
});

module.exports = {
  async getAllStatus_reservation(req, res) {
    try {
      const status = await db('status_reservation');
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar status' });
    }
  },

  async getStatus_reservationById(req, res) {
    const { id } = req.params;
    try {
      const status = await db('status_reservation').where('id_status', id).first();
      if (!status) return res.status(404).json({ error: 'Status não encontrado' });
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar status' });
    }
  },

  async createStatus_reservation(req, res) {
    const { error, value } = statusReservationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const newStatus = await db('status_reservation').insert(value).returning('*');
      res.status(201).json(newStatus);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar status' });
    }
  },

  async updateStatus_reservation(req, res) {
    const { id } = req.params;
    const { error, value } = statusReservationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const updated = await db('status_reservation').where('id_status', id).update(value).returning('*');
      if (!updated.length) return res.status(404).json({ error: 'Status não encontrado' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar status' });
    }
  },

  async deleteStatus_reservation(req, res) {
    const { id } = req.params;
    try {
      const deleted = await db('status_reservation').where('id_status', id).del();
      if (!deleted) return res.status(404).json({ error: 'Status não encontrado' });
      res.json({ message: 'Status deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar status' });
    }
  }
};
