const { supabase } = require('../config/supabaseClient');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data?.user) {
      console.error('Erro de autenticação:', error?.message || 'Usuário não encontrado');
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    const user = data.user;

    req.session.user = {
      id: user.id,                    // corrigido user.uid -> user.id
      email: user.email,
      nome: user.user_metadata?.nome || email.split('@')[0],
      created_at: user.created_at
    };

    res.json({ message: 'Login realizado com sucesso', redirect: '/inicio' });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const registro = async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nome }
      }
    });

    if (error) {
      console.error('Erro no registro:', error.message);
      return res.status(400).json({ error: error.message });
    }

    res.json({ 
      message: 'Cadastro realizado com sucesso', 
      redirect: '/login?msg=registro-sucesso' 
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.redirect('/login');
  });
};

module.exports = {
  login,
  registro,
  logout
};
