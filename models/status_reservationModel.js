const Joi = require('joi');

const reservationSchema = Joi.object({
  id_users: Joi.string().uuid().required(),
  id_classroom: Joi.number().integer().required(),
  data_reservation: Joi.date().required(),
  hora_inicio: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(), 
  hora_fim: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),     
  id_status: Joi.number().integer().required(),
});

module.exports = reservationSchema;
