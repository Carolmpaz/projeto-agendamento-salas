const express = require('express');
const path = require('path');

const router = express.Router();

// Página HTML das salas
router.get('/salas', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/salas.html'));
});

// API que retorna as salas disponíveis (poderia vir do banco depois)
router.get('/api/salas', (req, res) => {
  const salas = [
    { nome: 'Reunião A', capacidade: '10', localizacao: '2º andar', tipo: 'Reunião' },
    { nome: 'Treinamento B', capacidade: '20', localizacao: '1º andar', tipo: 'Aula' },
    { nome: 'Workshop C', capacidade: '15', localizacao: 'Térreo', tipo: 'Workshop' }
  ];

  res.json(salas);
});

module.exports = router;
