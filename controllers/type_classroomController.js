// controllers/type_classroomController.js

const type_classroomService = require('../services/type_classroomService');

const getAllType_classroom = async (req, res) => {
  try {
    const Type_classroom = await type_classroomService.getAllType_classroom();
    res.status(200).json(Type_classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getType_classroomById = async (req, res) => {
  try {
    const Type_classroom = await type_classroomService.getType_classroomById(req.params.id);
    if (Type_classroom) {
      res.status(200).json(Type_classroom);
    } else {
      res.status(404).json({ error: 'Tipo de Sala não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createType_classroom = async (req, res) => {
  try {
    const {descricao} = req.body;
    const newType_classroom = await type_classroomService.createType_classroom(descricao);
    res.status(201).json(newType_classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateType_classroom = async (req, res) => {
  try {
    const {descricao} = req.body;
    const updatedType_classroom = await type_classroomService.updateType_classroom(req.params.id, descricao);
    if (updatedType_classroom) {
      res.status(200).json(updatedType_classroom);
    } else {
      res.status(404).json({ error: 'Tipo de Sala não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteType_classroom = async (req, res) => {
  try {
    const deletedType_classroom = await type_classroomService.deleteType_classroom(req.params.id);
    if (deletedType_classroom) {
      res.status(200).json(deletedType_classroom);
    } else {
      res.status(404).json({ error: 'Tipo de Sala não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllType_classroom,
  getType_classroomById,
  createType_classroom,
  updateType_classroom,
  deleteType_classroom
};
