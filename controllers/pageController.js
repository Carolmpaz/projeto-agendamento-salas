const { supabase } = require('../config/supabaseClient');

const getInicio = async (req, res) => {
  try {
    const { data: proximasReservas, error } = await supabase
      .from('reservation')
      .select(`
        id_reservation,
        hora_inicio,
        hora_fim,
        descricao,
        status,
        classroom (
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
      .eq('id_users', req.session.user.id) // Pega o ID da sessão
      .eq('status', 'agendada')
      .gte('hora_inicio', new Date().toISOString())
      .order('hora_inicio', { ascending: true })
      .limit(5);

    if (error) throw error;

    res.render('inicio', {
      user: req.session.user,
      proximasReservas,
      error: null
    });
  } catch (error) {
    console.error('Erro ao carregar página inicial:', error);
    res.status(500).render('inicio', {
      user: req.session.user,
      proximasReservas: [],
      error: 'Erro ao carregar as próximas reservas. Por favor, tente novamente.'
    });
  }
};

const getSalas = (req, res) => {
  res.render('classroom', { title: 'Salas', user: req.session.user });
};

const getNovaReserva = (req, res) => {
  res.render('nova-reserva', { title: 'Nova Reserva', user: req.session.user });
};

const getMinhasReservas = (req, res) => {
  res.render('minhas-reservas', { title: 'Minhas Reservas', user: req.session.user });
};

module.exports = {
  getInicio,
  getSalas,
  getNovaReserva,
  getMinhasReservas
};
