const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabaseClient');

// Listar todas as salas
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('salas')
            .select('*');

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter uma sala específica
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('salas')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Sala não encontrada' });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verificar disponibilidade da sala
router.get('/:id/disponibilidade', async (req, res) => {
    try {
        const { data: reservas, error } = await supabase
            .from('reservas')
            .select('*')
            .eq('sala_id', req.params.id)
            .gte('data_hora_inicio', req.query.inicio)
            .lte('data_hora_fim', req.query.fim);

        if (error) throw error;

        const disponivel = !reservas || reservas.length === 0;
        res.json({ disponivel });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 