const db = require('../config/db'); // Ajuste para seu client PG
const typeClassroomSchema = require('../models/type_classroomModel');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM type_classroom');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar salas:', error);
        res.status(500).json({ error: 'Erro ao listar salas' });
    }
});

module.exports = {
  async getAllType_classroom(req, res) {
    try {
      const types = await db('type_classroom');
      res.json(types);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tipos de sala' });
    }
  },

  async getType_classroomById(req, res) {
    const { id } = req.params;
    try {
      const type = await db('type_classroom').where('id_type_classroom', id).first();
      if (!type) return res.status(404).json({ error: 'Tipo de sala não encontrado' });
      res.json(type);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tipo de sala' });
    }
  },

  async createType_classroom(req, res) {
    const { error, value } = typeClassroomSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const newType = await db('type_classroom').insert(value).returning('*');
      res.status(201).json(newType);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar tipo de sala' });
    }
  },

  async updateType_classroom(req, res) {
    const { id } = req.params;
    const { error, value } = typeClassroomSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const updated = await db('type_classroom').where('id_type_classroom', id).update(value).returning('*');
      if (!updated.length) return res.status(404).json({ error: 'Tipo de sala não encontrado' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar tipo de sala' });
    }
  },

  async deleteType_classroom(req, res) {
    const { id } = req.params;
    try {
      const deleted = await db('type_classroom').where('id_type_classroom', id).del();
      if (!deleted) return res.status(404).json({ error: 'Tipo de sala não encontrado' });
      res.json({ message: 'Tipo de sala deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar tipo de sala' });
    }
  }
};
