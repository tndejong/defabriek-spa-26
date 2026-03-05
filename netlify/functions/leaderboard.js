import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const headers = { 'Content-Type': 'application/json' };

export default async (req) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  const { data, error } = await supabase
    .from('trick_leaderboard')
    .select('slug, username, count')
    .order('count', { ascending: false })
    .limit(10);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  return new Response(JSON.stringify({ leaderboard: data }), { status: 200, headers });
};

export const config = { path: '/api/leaderboard' };
