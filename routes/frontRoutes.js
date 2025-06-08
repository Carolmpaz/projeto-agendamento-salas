const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware de autenticação
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// Página inicial (login)
router.get('/', (req, res) => {
    res.redirect('/login');
});

// Página de login
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Página de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro', { error: null });
});

// Página inicial após login
router.get('/inicio', (req, res) => {
    res.render('inicio', { user: req.session.user });
});

// Página de listagem de salas
router.get('/', (req, res) => {
    res.render('salas');
});

// Página de minhas reservas
router.get('/', (req, res) => {
    res.render('minhas-reservas');
  });

// Página de nova reserva
router.get('/', (req, res) => {
    res.render('nova-reserva');
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
