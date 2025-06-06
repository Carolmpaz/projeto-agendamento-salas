// services/userService.js

const supabase = require('../config/supabase');

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
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
    const result = await db.query('SELECT * FROM users WHERE id_users = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

// Atualizar usuário
const updateUser = async (id, nome, email) => {
  try {
    const result = await db.query(
      'UPDATE users SET nome = $1, email = $2 WHERE id_users = $3 RETURNING *',
      [nome, email, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Deletar usuário
const deleteUser = async (id) => {
  try {
    const result = await db.query('DELETE FROM users WHERE id_users = $1 RETURNING *', [id]);
    return result.rows[0];
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
