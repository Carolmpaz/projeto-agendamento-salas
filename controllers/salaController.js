const supabase = require('../config/supabaseClient');

const getAllSalas = async (req, res) => {
  try {
    console.log('Buscando todas as salas...');
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

    if (error) {
      console.error('Erro ao buscar salas:', error);
      throw error;
    }

    console.log('Salas encontradas:', salas);
    res.render('salas', { 
      salas,
      error: null 
    });
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).render('salas', { 
      salas: [],
      error: 'Erro ao carregar as salas. Por favor, tente novamente.'
    });
  }
};

const getSalaById = async (req, res) => {
  try {
    const { id_classroom } = req.params;
    const { data: sala, error } = await supabase
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
      .eq('id_classroom', id_classroom)
      .single();

    if (error) throw error;

    if (!sala) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    res.json(sala);
  } catch (error) {
    console.error('Erro ao buscar sala:', error);
    res.status(500).json({ error: 'Erro ao buscar sala' });
  }
};

const createSala = async (req, res) => {
  try {
    const { nome, capacidade, localizacao, id_type_classroom } = req.body;
    
    const { data: sala, error } = await supabase
      .from('classroom')
      .insert([{ 
        nome, 
        capacidade, 
        localizacao, 
        id_type_classroom 
      }])
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
      .single();

    if (error) throw error;

    res.status(201).json(sala);
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    res.status(500).json({ error: 'Erro ao criar sala' });
  }
};

const updateSala = async (req, res) => {
  try {
    const { id_classroom } = req.params;
    const { nome, capacidade, localizacao, id_type_classroom } = req.body;

    const { data: sala, error } = await supabase
      .from('classroom')
      .update({ 
        nome, 
        capacidade, 
        localizacao, 
        id_type_classroom 
      })
      .eq('id_classroom', id_classroom)
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
      .single();

    if (error) throw error;

    if (!sala) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    res.json(sala);
  } catch (error) {
    console.error('Erro ao atualizar sala:', error);
    res.status(500).json({ error: 'Erro ao atualizar sala' });
  }
};

const deleteSala = async (req, res) => {
  try {
    const { id_classroom } = req.params;
    const { error } = await supabase
      .from('classroom')
      .delete()
      .eq('id_classroom', id_classroom);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar sala:', error);
    res.status(500).json({ error: 'Erro ao deletar sala' });
  }
};

module.exports = {
  getAllSalas,
  getSalaById,
  createSala,
  updateSala,
  deleteSala
}; 