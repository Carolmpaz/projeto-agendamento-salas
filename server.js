require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.json()); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração para servir arquivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rotas de autenticação
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Rotas das páginas protegidas
const pageRoutes = require('./routes/pageRoutes');
app.use('/', pageRoutes);

// Rota principal redireciona para login
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

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