const Joi = require('joi');

const reservationSchema = Joi.object({
  hora_inicio: Joi.date().iso().required().label('Data e hora de início'),
  hora_fim: Joi.date().iso().required().label('Data e hora de fim'),
  data_reservation: Joi.date().iso().required().label('Data da reserva'),
  status: Joi.string().valid('agendada', 'cancelada', 'finalizada').optional(),
  id_classroom: Joi.number().integer().required(),
  id_users: Joi.string().guid({ version: 'uuidv4' }).optional(),
  id_status: Joi.number().integer().required(),  

});


const reservationInputSchema = reservationSchema.fork(['id_users'], (schema) => schema.forbidden());

module.exports = { reservationSchema, reservationInputSchema };
