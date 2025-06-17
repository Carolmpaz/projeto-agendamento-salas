
function verificarAutenticacao(req, res, next) {
  if (!req.session.user) {
   
    return res.status(401).json({ error: 'Usuário não autenticado' });
  
  }
  next();
}

module.exports = { verificarAutenticacao };
