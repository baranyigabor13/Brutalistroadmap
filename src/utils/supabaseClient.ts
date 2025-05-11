import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Hiányzó Supabase környezeti változók');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

// Ellenőrizzük a kapcsolatot
supabase.from('topics').select('count', { count: 'exact', head: true })
  .then(() => console.log('Supabase kapcsolat sikeres'))
  .catch((error) => console.error('Supabase kapcsolat hiba:', error));