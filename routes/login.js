// routes/login.js
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  // Autenticar usuário aqui
  // Se válido, redirecionar ou setar sessão
  res.send(`Email: ${email} | Senha: ${senha}`); // Trocar por lógica real
});

module.exports = router;
