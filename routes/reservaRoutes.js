const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabaseClient');

// Listar todas as reservas do usuário
router.get('/minhas', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reservas')
            .select(`
                *,
                salas (
                    nome,
                    capacidade,
                    localizacao
                )
            `)
            .eq('usuario_id', req.session.user.id)
            .order('data_hora_inicio', { ascending: true });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Criar uma nova reserva
router.post('/', async (req, res) => {
    try {
        const { sala_id, data_hora_inicio, data_hora_fim, descricao } = req.body;

        // Verificar disponibilidade
        const { data: reservas, error: checkError } = await supabase
            .from('reservas')
            .select('*')
            .eq('sala_id', sala_id)
            .overlaps('data_hora_inicio', data_hora_inicio)
            .overlaps('data_hora_fim', data_hora_fim);

        if (checkError) throw checkError;
        if (reservas && reservas.length > 0) {
            return res.status(400).json({ error: 'Sala já reservada para este horário' });
        }

        // Criar reserva
        const { data, error } = await supabase
            .from('reservas')
            .insert([{
                sala_id,
                usuario_id: req.session.user.id,
                data_hora_inicio,
                data_hora_fim,
                descricao,
                status: 'confirmada'
            }])
            .select()
            .single();

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cancelar uma reserva
router.delete('/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('reservas')
            .delete()
            .eq('id', req.params.id)
            .eq('usuario_id', req.session.user.id);

        if (error) throw error;

        res.json({ message: 'Reserva cancelada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 