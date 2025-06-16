const Joi = require('joi');

const classroomSchema = Joi.object({
  nome: Joi.string().max(100).required(),
  capacidade: Joi.number().integer().min(1).required(),
  localizacao: Joi.string().max(100).optional().allow(null, ''),
  id_type_classroom: Joi.number().integer().required(),
});

module.exports = classroomSchema;
