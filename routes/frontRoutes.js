const express = require('express');
const router = express.Router();
const path = require('path');


const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};


router.get('/', (req, res) => {
    res.redirect('/login');
});


router.get('/login', (req, res) => {
    res.render('login', { error: null });
});


router.get('/cadastro', (req, res) => {
    res.render('cadastro', { error: null });
});


router.get('/inicio', (req, res) => {
    res.render('inicio', { user: req.session.user });
});


router.get('/', (req, res) => {
    res.render('salas');
});


router.get('/', (req, res) => {
    res.render('minhas-reservas');
  });


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
