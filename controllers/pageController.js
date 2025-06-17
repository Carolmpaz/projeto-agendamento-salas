const db = require('../config/db');
const { verificarAutenticacao } = require('../middleware/auth');

// Rota para a página inicial
exports.inicio = [
  verificarAutenticacao,
  (req, res) => {
    res.render('inicio', { user: req.session.user });
  }
];
