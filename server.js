require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');  // <-- importe o express-session

const app = express();
const db = require('./config/db');
const { supabase } = require('./config/supabaseClient');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do express-session (adicione aqui)
app.use(session({
  secret: process.env.SESSION_SECRET || 'seusegredosecreto', // use variável de ambiente
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // em produção, use true se estiver com HTTPS
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Resto do seu código (conexão ao banco, rotas, etc)
db.query('SELECT 1')
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use('/users/api', require('./routes/userRoutes'));
    app.use('/classroom/api', require('./routes/classroomRoutes'));
    app.use('/type_classroom/api', require('./routes/type_classroomRoutes'));
    app.use('/reservation/api', require('./routes/reservationRoutes'));
    app.use('/status_reservation/api', require('./routes/status_reservationRoutes'));

    const authRoutes = require('./routes/authRoutes');
    app.use('/auth', authRoutes);

    app.use('/', require('./routes/frontRoutes'));

    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    app.use((err, req, res, next) => {
      console.error('Erro no servidor:', err);
      res.status(500).send('Erro interno no servidor');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(` Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Erro ao conectar ao banco de dados:', err.message);
    process.exit(1);
  });
