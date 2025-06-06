const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Página Inicial',
    message: 'Bem-vindo ao aplicativo com EJS e CSS!'
  });
});

router.get('/classroom', (req, res) => {
  res.render('classroom', { title: 'Salas' });
});

router.get('/status_reservation', (req, res) => {
  res.render('status_reservation', { title: 'Status de Reserva' });
});

router.get('/users', (req, res) => {
  res.render('users', { title: 'Usuários' });
});

router.get('/reservation', (req, res) => {
  res.render('reservation', { title: 'Reservas' });
});

router.get('/type_classroom', (req, res) => {
  res.render('type_classroom', { title: 'Tipos de Salas' });
});

module.exports = router;
