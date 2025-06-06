const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Middleware para verificar autenticação
const requireAuth = async (req, res, next) => {
  try {
    const user = await userService.getCurrentUser();
    if (!user) {
      return res.redirect('/auth/login');
    }
    req.user = user;
    next();
  } catch (error) {
    res.redirect('/auth/login');
  }
};

// Rota para página inicial (protegida)
router.get('/inicio', requireAuth, (req, res) => {
  res.render('inicio', { user: req.user });
});

// Rota para página de reservas (protegida)
router.get('/reserva', requireAuth, (req, res) => {
  res.render('reserva', { user: req.user });
});

// Rota para página de minhas reservas (protegida)
router.get('/minhas-reservas', requireAuth, (req, res) => {
  res.render('minhas-reservas', { user: req.user });
});

// Rota para página de salas (protegida)
router.get('/salas', requireAuth, (req, res) => {
  res.render('salas', { user: req.user });
});

// Rota para página de perfil (protegida)
router.get('/perfil', requireAuth, (req, res) => {
  res.render('perfil', { user: req.user });
});

module.exports = router; 