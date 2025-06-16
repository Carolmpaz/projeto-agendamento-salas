const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotas de autenticação
router.post('/login', authController.login);
router.post('/registro', authController.registro);
router.get('/logout', authController.logout);

module.exports = router;
