function verificarAutenticacao(req, res, next) {
  if (!req.session.user) {
    console.warn('Tentativa de acesso não autenticado:', req.originalUrl);
    return res.status(401).json({ error: 'Usuário não autenticado. Por favor, faça login para acessar esta página.' });
  }
  next();
}

module.exports = { verificarAutenticacao };
