const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/minhas-reservas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.id_reservation, c.nome AS classroom_name, r.data_reservation, s.descricao
      FROM reservation r
      JOIN classroom c ON r.id_classroom = c.id_classroom
      JOIN status_reservation s ON r.id_status = s.id_status
      ORDER BY r.data_reservation DESC
    `);

    res.render('minhas_reservas', {
      reservas: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    res.status(500).send('Erro ao carregar reservas');
  }
});

module.exports = router;
