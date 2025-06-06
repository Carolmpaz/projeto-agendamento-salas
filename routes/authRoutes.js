const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Middleware para verificar autenticação
const requireAuth = async (req, res, next) => {
  try {
    const user = await userService.getCurrentUser();
    if (!user) {
      return res.redirect('/auth/login');
    }
    req.user = user;
    next();
  } catch (error) {
    res.redirect('/auth/login');
  }
};

// Rota para página de login
router.get('/login', (req, res) => {
  res.render('login', { message: req.query.message });
});

// Rota para processar o login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const { user, session } = await userService.loginUser(email, senha);
    
    if (user && session) {
      // Armazena o token de sessão em um cookie seguro
      res.cookie('sb-token', session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
      });
      
      res.redirect('/inicio');
    } else {
      res.render('login', { error: 'Email ou senha inválidos' });
    }
  } catch (error) {
    res.render('login', { error: error.message });
  }
});

// Rota para página de cadastro
router.get('/cadastro', (req, res) => {
  res.render('cadastro/cadastro');
});

// Rota para processar o cadastro
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, confirmarSenha } = req.body;
    
    if (senha !== confirmarSenha) {
      return res.render('cadastro/cadastro', { error: 'As senhas não coincidem' });
    }

    const { user } = await userService.createUser(nome, email, senha);
    
    if (user) {
      res.redirect('/auth/login?message=Cadastro realizado com sucesso! Faça login para continuar.');
    } else {
      res.render('cadastro/cadastro', { error: 'Erro ao criar usuário' });
    }
  } catch (error) {
    res.render('cadastro/cadastro', { error: error.message });
  }
});

// Rota para logout
router.get('/logout', async (req, res) => {
  try {
    await userService.logoutUser();
    res.clearCookie('sb-token');
    res.redirect('/auth/login');
  } catch (error) {
    res.redirect('/auth/login');
  }
});

// Rota para página inicial (protegida)
router.get('/inicio', requireAuth, (req, res) => {
  res.render('inicio', { user: req.user });
});

module.exports = router; 