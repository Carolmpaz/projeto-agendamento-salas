require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');

app.use(express.json()); 
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use(express.json());

    const userRoutes = require('./routes/userRoutes');
    app.use('/users', userRoutes);

    const classroomRoutes = require('./routes/classroomRoutes');
    app.use('/classroom', classroomRoutes);

     const type_classroomRoutes = require('./routes/type_classroomRoutes');
    app.use('/type_classroom', type_classroomRoutes);

     const reservationRoutes = require('./routes/reservationRoutes');
    app.use('/reservation', reservationRoutes);

     const status_reservationRoutes = require('./routes/status_reservationRoutes');
    app.use('/status_reservation', status_reservationRoutes);

    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });