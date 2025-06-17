

const supabase = require('../config/supabaseClient');


const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};


const createUser = async (nome, email, senha) => {
  try {
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome: nome
        }
      }
    });

    if (authError) throw new Error(authError.message);

    return authData;
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};


const getUserById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id_users', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};


const updateUser = async (id, nome, email) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ nome, email })
      .eq('id_users', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};


const deleteUser = async (id) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id_users', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};


const loginUser = async (email, senha) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (authError) throw new Error(authError.message);

    return authData;
  } catch (error) {
    throw new Error('Erro ao fazer login: ' + error.message);
  }
};


const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw new Error(error.message);
    
    return user;
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};


const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw new Error(error.message);
    
    return true;
  } catch (error) {
    throw new Error('Erro ao fazer logout: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getCurrentUser,
  logoutUser
};
