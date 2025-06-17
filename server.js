require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./config/db');

const { verificarAutenticacao } = require('./middleware/auth');
const pageController = require('./controllers/pageController');
const classroomController = require('./controllers/classroomController');
const reservationController = require('./controllers/reservationController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));


app.use(session({
  secret: process.env.SESSION_SECRET || 'seusegredosecreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


db.query('SELECT 1')
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

   
    app.use('/users/api', require('./routes/userRoutes'));
    app.use('/classroom/api', require('./routes/classroomRoutes'));
    app.use('/type_classroom/api', require('./routes/type_classroomRoutes'));
    app.use('/reservation/api', require('./routes/reservationRoutes'));
    app.use('/status_reservation/api', require('./routes/status_reservationRoutes'));
    app.use('/auth', require('./routes/authRoutes'));

    
    app.get('/inicio', pageController.inicio);

    app.get('/salas', classroomController.listarSalas);

    app.get('/nova-reserva', reservationController.novaReserva);

    app.use('/', require('./routes/reservarRoutes'));
    app.use('/', require('./routes/frontRoutes'));

 
    app.use((req, res) => {
      res.status(404).send('Página não encontrada');
    });

   
    app.use((err, req, res, next) => {
      console.error('Erro no servidor:', err);
      res.status(500).send('Erro interno no servidor');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    process.exit(1);
  });
