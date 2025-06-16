require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./config/db');

const { verificarAutenticacao } = require('./middleware/auth');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));

// Sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'seusegredosecreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // só para dev/local, use true em produção com HTTPS
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Teste de conexão e inicialização do servidor
db.query('SELECT 1')
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // Rotas da API
    app.use('/users/api', require('./routes/userRoutes'));
    app.use('/classroom/api', require('./routes/classroomRoutes'));
    app.use('/type_classroom/api', require('./routes/type_classroomRoutes'));
    app.use('/reservation/api', require('./routes/reservationRoutes'));
    app.use('/status_reservation/api', require('./routes/status_reservationRoutes'));
    app.use('/auth', require('./routes/authRoutes'));

    // Rotas front-end que precisam de autenticação podem usar middleware:
    // Exemplo: rota '/inicio' protegida
    app.get('/inicio', verificarAutenticacao, (req, res) => {
      res.render('inicio', { user: req.session.user });
    });

    // Rotas para páginas front
    app.get('/salas', verificarAutenticacao, async (req, res) => {
      try {
        const result = await db.query(`
          SELECT c.id_classroom, c.nome, c.capacidade, c.localizacao, t.descricao AS type_classroom
          FROM classroom c
          JOIN type_classroom t ON c.id_type_classroom = t.id_type_classroom
        `);
        res.render('classroom', { salas: result.rows });
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
        res.status(500).send('Erro ao buscar salas');
      }
    });

    app.get('/nova-reserva', verificarAutenticacao, async (req, res) => {
      try {
        const salas = await db.query('SELECT id_classroom, nome FROM classroom');
        const statusList = await db.query('SELECT id_status, descricao FROM status_reservation');
        res.render('nova_reserva', {
          salas: salas.rows,
          statusList: statusList.rows
        });
      } catch (error) {
        console.error('Erro ao carregar nova reserva:', error);
        res.status(500).send('Erro interno');
      }
    });

    app.use('/', require('./routes/frontRoutes'));

    // Erro 404
    app.use((req, res) => {
      res.status(404).send('Página não encontrada');
    });

    // Erros gerais
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
