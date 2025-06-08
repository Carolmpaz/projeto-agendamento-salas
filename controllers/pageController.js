const supabase = require('../config/supabase');

const getInicio = async (req, res) => {
  try {
    // Busca as próximas 5 reservas do usuário
    const { data: proximasReservas, error } = await supabase
      .from('reserva')
      .select(`
        id_reserva,
        data_hora_inicio,
        data_hora_fim,
        descricao,
        status,
        sala:classroom (
          id_classroom,
          nome,
          capacidade,
          localizacao,
          type_classroom (
            id_type_classroom,
            descricao
          )
        )
      `)
      .eq('id_usuario', req.user.id)
      .eq('status', 'agendada')
      .gte('data_hora_inicio', new Date().toISOString())
      .order('data_hora_inicio', { ascending: true })
      .limit(5);

    if (error) throw error;

    res.render('inicio', { 
      proximasReservas,
      error: null 
    });
  } catch (error) {
    console.error('Erro ao carregar página inicial:', error);
    res.status(500).render('inicio', { 
      proximasReservas: [],
      error: 'Erro ao carregar as próximas reservas. Por favor, tente novamente.'
    });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await userService.validarUsuario(email, senha);
  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // GUARDA O USUÁRIO NA SESSÃO
  req.session.user = {
    id: user.id,
    nome: user.nome,
    email: user.email
  };

  res.redirect('/dashboard'); // ou qualquer rota pós-login
};

module.exports = {
  getInicio
}; 