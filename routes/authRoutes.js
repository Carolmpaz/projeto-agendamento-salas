const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabaseClient');

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validação básica
        if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
        }

        // Tentativa de login no Supabase
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error('Erro de autenticação:', error.message);
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }

        // Criar sessão
        req.session.user = {
            id: user.id,
            email: user.email,
            nome: user.user_metadata?.nome || email.split('@')[0], // Tenta pegar o nome dos metadados
            created_at: user.created_at
        };

        // Responder com sucesso
        res.json({ 
            message: 'Login realizado com sucesso',
            redirect: '/inicio'
        });

    } catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota de registro
router.post('/registro', async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        // Validação básica
        if (!nome || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Criar usuário no Supabase
        const { data: { user }, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { 
                    nome: nome // Salvando o nome nos metadados do usuário
                }
            }
        });

        if (error) {
            console.error('Erro no registro:', error.message);
            return res.status(400).json({ error: error.message });
        }

        // Responder com sucesso
        res.json({ 
            message: 'Cadastro realizado com sucesso',
            redirect: '/login?msg=registro-sucesso'
        });

    } catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota de logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir sessão:', err);
            return res.status(500).json({ error: 'Erro ao fazer logout' });
        }
        res.redirect('/login');
    });
});

module.exports = router; 