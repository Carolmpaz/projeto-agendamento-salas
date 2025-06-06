const supabase = require('../config/supabaseClient');

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

module.exports = {
  getInicio
}; 