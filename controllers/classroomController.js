const db = require('../config/db'); 
const classroomSchema = require('../models/ClassroomModel');



module.exports = {
  async getAllClassroom(req, res) {
    try {
      const classrooms = await db('classroom');
      res.json(classrooms);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar salas' });
    }
  },

  async getClassroomById(req, res) {
    const { id } = req.params;
    try {
      const classroom = await db('classroom').where('id_classroom', id).first();
      if (!classroom) return res.status(404).json({ error: 'Sala não encontrada' });
      res.json(classroom);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar sala' });
    }
  },

  async createClassroom(req, res) {
    const { error, value } = classroomSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const newClassroom = await db('classroom').insert(value).returning('*');
      res.status(201).json(newClassroom);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar sala' });
    }
  },

  async updateClassroom(req, res) {
    const { id } = req.params;
    const { error, value } = classroomSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const updated = await db('classroom').where('id_classroom', id).update(value).returning('*');
      if (!updated.length) return res.status(404).json({ error: 'Sala não encontrada' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar sala' });
    }
  },

  async deleteClassroom(req, res) {
    const { id } = req.params;
    try {
      const deleted = await db('classroom').where('id_classroom', id).del();
      if (!deleted) return res.status(404).json({ error: 'Sala não encontrada' });
      res.json({ message: 'Sala deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao deletar sala' });
    }
  },

 

};
