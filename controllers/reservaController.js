const supabase = require('../config/supabaseClient');

// Listar todas as reservas
const listarReservas = async (req, res) => {
    try {
        const { data: reservas, error } = await supabase
            .from('reservation')
            .select(`
                *,
                classroom (
                    nome,
                    localizacao
                ),
                status_reservation (
                    descricao
                )
            `)
            .eq('id_users', req.user.id);

        if (error) throw error;

        res.render('minhas-reservas', { reservas });
    } catch (error) {
        console.error('Erro ao listar reservas:', error);
        res.render('minhas-reservas', { 
            reservas: [], 
            error: 'Erro ao carregar reservas' 
        });
    }
};

// Página de nova reserva
const paginaNovaReserva = async (req, res) => {
    try {
        const { data: salas, error } = await supabase
            .from('classroom')
            .select(`
                id_classroom,
                nome,
                capacidade,
                localizacao,
                type_classroom (
                    id_type_classroom,
                    descricao
                )
            `)
            .order('nome');

        if (error) throw error;

        res.render('nova-reserva', { 
            salas,
            error: null 
        });
    } catch (error) {
        console.error('Erro ao carregar salas:', error);
        res.render('nova-reserva', { 
            salas: [],
            error: 'Erro ao carregar salas' 
        });
    }
};

// Verificar disponibilidade da sala
const verificarDisponibilidade = async (req, res) => {
    try {
        const { id_classroom, data_hora_inicio, data_hora_fim } = req.body;
        console.log('Verificando disponibilidade:', { id_classroom, data_hora_inicio, data_hora_fim });

        // Extrair data e hora do ISO string
        const dataInicio = new Date(data_hora_inicio);
        const dataFim = new Date(data_hora_fim);

        const data = dataInicio.toISOString().split('T')[0];
        const horaInicio = dataInicio.toTimeString().split(' ')[0];
        const horaFim = dataFim.toTimeString().split(' ')[0];

        console.log('Data e hora formatadas:', { data, horaInicio, horaFim });

        // Busca o ID do status 'agendada'
        const { data: statusData, error: statusError } = await supabase
            .from('status_reservation')
            .select('id_status')
            .eq('descricao', 'agendada')
            .single();

        if (statusError) {
            console.error('Erro ao buscar status:', statusError);
            return res.status(500).json({ 
                disponivel: false, 
                error: 'Erro ao verificar status da reserva',
                details: statusError 
            });
        }

        console.log('Status encontrado:', statusData);

        // Verifica se há alguma reserva que se sobrepõe ao período solicitado
        const { data: reservasConflitantes, error } = await supabase
            .from('reservation')
            .select(`
                id_reservation,
                id_users,
                id_classroom,
                data_reservation,
                hora_inicio,
                hora_fim,
                id_status,
                classroom:id_classroom (nome)
            `)
            .eq('id_classroom', id_classroom)
            .eq('id_status', statusData.id_status)
            .eq('data_reservation', data)
            .or(`and(hora_inicio.lte.${horaFim},hora_fim.gte.${horaInicio})`);

        if (error) {
            console.error('Erro ao verificar disponibilidade:', error);
            return res.status(500).json({ 
                disponivel: false, 
                error: 'Erro ao verificar disponibilidade da sala',
                details: error 
            });
        }

        console.log('Reservas conflitantes encontradas:', reservasConflitantes);

        res.json({ 
            disponivel: !reservasConflitantes || reservasConflitantes.length === 0,
            reservasConflitantes: reservasConflitantes 
        });
    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        res.status(500).json({ 
            disponivel: false, 
            error: 'Erro ao verificar disponibilidade da sala',
            details: error 
        });
    }
};

// Criar nova reserva
const criarReserva = async (req, res) => {
    try {
        const { id_classroom, data_hora_inicio, data_hora_fim } = req.body;
        
        // Extrair data e hora do ISO string
        const dataInicio = new Date(data_hora_inicio);
        const dataFim = new Date(data_hora_fim);

        const data_reservation = dataInicio.toISOString().split('T')[0];
        const hora_inicio = dataInicio.toTimeString().split(' ')[0];
        const hora_fim = dataFim.toTimeString().split(' ')[0];

        // Busca o ID do status 'agendada'
        const { data: statusData, error: statusError } = await supabase
            .from('status_reservation')
            .select('id_status')
            .eq('descricao', 'agendada')
            .single();

        if (statusError) {
            console.error('Erro ao buscar status:', statusError);
            return res.redirect('/reservas/nova?error=' + encodeURIComponent('Erro ao criar reserva. Por favor, tente novamente.'));
        }

        // Criar a reserva
        const { data: novaReserva, error } = await supabase
            .from('reservation')
            .insert([
                {
                    id_users: req.user.id,
                    id_classroom: id_classroom,
                    data_reservation: data_reservation,
                    hora_inicio: hora_inicio,
                    hora_fim: hora_fim,
                    id_status: statusData.id_status
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Erro ao criar reserva:', error);
            return res.redirect('/reservas/nova?error=' + encodeURIComponent('Erro ao criar reserva. Por favor, tente novamente.'));
        }

        res.redirect('/reservas');
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
        res.redirect('/reservas/nova?error=' + encodeURIComponent('Erro ao criar reserva. Por favor, tente novamente.'));
    }
};

// Cancelar reserva
const cancelarReserva = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca o ID do status 'cancelada'
        const { data: statusData, error: statusError } = await supabase
            .from('status_reservation')
            .select('id_status')
            .eq('descricao', 'cancelada')
            .single();

        if (statusError) throw statusError;

        // Atualiza o status da reserva
        const { error } = await supabase
            .from('reservation')
            .update({ id_status: statusData.id_status })
            .eq('id_reservation', id)
            .eq('id_users', req.user.id);

        if (error) throw error;

        res.redirect('/reservas');
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
        res.redirect('/reservas?error=Erro ao cancelar reserva');
    }
};

// Página de editar reserva
const paginaEditarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Busca a reserva
        const { data: reserva, error: reservaError } = await supabase
            .from('reservation')
            .select(`
                id_reservation,
                data_reservation,
                hora_inicio,
                hora_fim,
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
            .eq('id_reservation', id)
            .eq('id_users', req.user.id)
            .single();

        if (reservaError) throw reservaError;

        // Busca todas as salas
        const { data: salas, error: salasError } = await supabase
            .from('classroom')
            .select(`
                id_classroom,
                nome,
                capacidade,
                localizacao,
                type_classroom (
                    id_type_classroom,
                    descricao
                )
            `)
            .order('nome');

        if (salasError) throw salasError;

        res.render('editar-reserva', { 
            reserva,
            salas,
            error: null 
        });
    } catch (error) {
        console.error('Erro ao carregar página de edição:', error);
        res.redirect('/reservas?error=Erro ao carregar reserva para edição');
    }
};

// Editar reserva
const editarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_classroom, data_hora_inicio, data_hora_fim } = req.body;
        
        // Extrair data e hora do ISO string
        const dataInicio = new Date(data_hora_inicio);
        const dataFim = new Date(data_hora_fim);

        const data_reservation = dataInicio.toISOString().split('T')[0];
        const hora_inicio = dataInicio.toTimeString().split(' ')[0];
        const hora_fim = dataFim.toTimeString().split(' ')[0];

        const { error } = await supabase
            .from('reservation')
            .update({
                id_classroom,
                data_reservation,
                hora_inicio,
                hora_fim
            })
            .eq('id_reservation', id)
            .eq('id_users', req.user.id);

        if (error) throw error;

        res.redirect('/reservas');
    } catch (error) {
        console.error('Erro ao editar reserva:', error);
        res.redirect(`/reservas/editar/${req.params.id}?error=Erro ao editar reserva`);
    }
};

module.exports = {
    listarReservas,
    paginaNovaReserva,
    verificarDisponibilidade,
    criarReserva,
    cancelarReserva,
    paginaEditarReserva,
    editarReserva
}; 