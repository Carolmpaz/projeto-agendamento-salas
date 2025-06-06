const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db'); // conexão com o PostgreSQL
const Joi = require('joi');

const schema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  confirmarSenha: Joi.any().valid(Joi.ref('senha')).required().messages({
    'any.only': 'As senhas não coincidem'
  })
});

router.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

router.post('/cadastro', async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  const { error } = schema.validate({ nome, email, senha, confirmarSenha });
  if (error) return res.status(400).send(error.message);

  try {
    const existe = await pool.query('SELECT * FROM agente WHERE email = $1', [email]);
    if (existe.rows.length > 0) {
      return res.status(400).send('Email já cadastrado');
    }

    const hash = await bcrypt.hash(senha, 10);
    await pool.query(
      'INSERT INTO agente (nome, email, senha) VALUES ($1, $2, $3)',
      [nome, email, hash]
    );

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
