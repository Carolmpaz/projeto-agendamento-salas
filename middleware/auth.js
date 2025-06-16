// middleware para proteger rotas que precisam de autenticação
function verificarAutenticacao(req, res, next) {
  if (!req.session.user) {
    // pode retornar JSON, renderizar página de login ou redirecionar
    return res.status(401).json({ error: 'Usuário não autenticado' });
    // ou: return res.redirect('/login');
  }
  next();
}

module.exports = { verificarAutenticacao };
