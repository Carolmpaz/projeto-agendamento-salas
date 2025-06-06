require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function setupDatabase() {
  try {
    console.log('Iniciando configuração do banco de dados...');

    // Lê e executa o arquivo fisico.sql
    console.log('Criando tabelas...');
    const schemaSQL = await fs.readFile(path.join(__dirname, 'migrations', 'fisico.sql'), 'utf8');
    const { error: schemaError } = await supabase.sql(schemaSQL);
    if (schemaError) {
      throw schemaError;
    }
    console.log('Tabelas criadas com sucesso!');

    // Lê e executa o arquivo insert_test_data.sql
    console.log('Inserindo dados de teste...');
    const testDataSQL = await fs.readFile(path.join(__dirname, 'migrations', 'insert_test_data.sql'), 'utf8');
    const { error: testDataError } = await supabase.sql(testDataSQL);
    if (testDataError) {
      throw testDataError;
    }
    console.log('Dados de teste inseridos com sucesso!');

    console.log('Configuração do banco de dados concluída!');
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error);
  }
}

setupDatabase(); 