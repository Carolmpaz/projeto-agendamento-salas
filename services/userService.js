// services/userService.js

const supabase = require('../config/supabaseClient');

// Função para obter todos os usuários
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

// Função para criar um novo usuário
const createUser = async (nome, email, senha) => {
  try {
    // Registra o usuário no sistema de autenticação do Supabase
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

// Função para obter um usuário por ID
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

// Atualizar usuário
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

// Deletar usuário
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

// Função para login do usuário
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

// Função para obter dados do usuário atual
const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw new Error(error.message);
    
    return user;
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

// Função para logout do usuário
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
