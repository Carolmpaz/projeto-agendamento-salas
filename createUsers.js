const { createClient } = require('@supabase/supabase-js');

// 🔑 Substitua pelos seus dados do Supabase
const SUPABASE_URL = 'https://xldjtxbppraknbuqszmx.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZGp0eGJwcHJha25idXFzem14Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzc0ODk2OCwiZXhwIjoyMDYzMzI0OTY4fQ.xfa7-aXcmsOZ2yLFNcgxcTNNcY-6FTGB4Rj4INvvAGQ'; // ⚠️ NÃO use a anon key aqui

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const users = [
  { email: 'caroline@example.com', password: 'senha123' },
  { email: 'lucas@example.com', password: 'senha123' },
  { email: 'ana@example.com', password: 'senha123' }
];

async function createUsers() {
  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true
    });

    if (error) {
      console.error(`❌ Erro ao criar ${user.email}:`, error.message);
    } else {
      console.log(`✅ Usuário ${user.email} criado com UUID: ${data.user.id}`);
    }
  }
}

createUsers();
