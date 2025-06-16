const Joi = require('joi');

const typeClassroomSchema = Joi.object({
  descricao: Joi.string().max(50).required(),
});

module.exports = typeClassroomSchema;
