// controllers/classroomController.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Ajuste para seu client PG
const classroomService = require('../services/classroomService');

// routes/classroomRoutes.js


router.get('/salas', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT 
                c.id, 
                c.nome, 
                c.capacidade, 
                c.localizacao, 
                t.tipo AS tipo_sala 
            FROM classroom c
            JOIN type_classroom t ON c.id_type_classroom = t.id
        `);

        res.render('classroom', { salas: rows });

    } catch (error) {
        console.error('Erro ao buscar salas:', error);
        res.status(500).send('Erro ao buscar salas');
    }
});



const getAllClassroom = async (req, res) => {
  try {
    const Classroom = await classroomService.getAllClassroom();
    res.status(200).json(Classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClassroomById = async (req, res) => {
  try {
    const Classroom = await classroomService.getClassroomById(req.params.id);
    if (Classroom) {
      res.status(200).json(Classroom);
    } else {
      res.status(404).json({ error: 'Sala não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClassroom = async (req, res) => {
  try {
    const { nome, capacidade, localizacao} = req.body;
    const newClassroom = await classroomService.createClassroom(nome, capacidade, localizacao);
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateClassroom = async (req, res) => {
  try {
    const {nome, capacidade, localizacao} = req.body;
    const updatedClassroom = await classroomService.updateClassroom(req.params.id, nome, capacidade, localizacao);
    if (updatedClassroom) {
      res.status(200).json(updatedClassroom);
    } else {
      res.status(404).json({ error: 'Sala não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const deletedClassroom = await classroomService.deleteClassroom(req.params.id);
    if (deletedClassroom) {
      res.status(200).json(deletedClassroom);
    } else {
      res.status(404).json({ error: 'Sala não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClassroom,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom
};
