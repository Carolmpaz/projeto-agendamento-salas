const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltam as credenciais do Supabase no arquivo .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase; 