// Middleware para verificar se o usuário está autenticado
function requireAuth(req, res, next) {
    if (!req.session.user) {
        // Se a requisição for AJAX, retorna 401
        if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
            return res.status(401).json({ error: 'Não autorizado' });
        }
        // Se for uma requisição normal, redireciona para o login
        return res.redirect('/login');
    }
    next();
}

// Middleware para verificar se o usuário NÃO está autenticado
function requireNoAuth(req, res, next) {
    if (req.session.user) {
        return res.redirect('/inicio');
    }
    next();
}

module.exports = {
    requireAuth,
    requireNoAuth
}; 