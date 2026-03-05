import { createClient } from '@supabase/supabase-js';

const headers = { 'Content-Type': 'application/json' };

export default async (req) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('trick_counter')
      .select('count')
      .eq('id', 1)
      .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
    return new Response(JSON.stringify({ count: data.count }), { status: 200, headers });
  }

  if (req.method === 'POST') {
    const { slug, username } = await req.json().catch(() => ({}));

    const { data: globalData, error: globalError } = await supabase.rpc('increment_trick_counter');
    if (globalError) return new Response(JSON.stringify({ error: globalError.message }), { status: 500, headers });

    let userCount = null;
    if (slug && username) {
      const { data: userData, error: userError } = await supabase.rpc('increment_user_tricks', {
        p_slug: slug,
        p_username: username,
      });
      if (!userError) userCount = userData;
    }

    return new Response(JSON.stringify({ count: globalData, userCount }), { status: 200, headers });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
};

export const config = { path: ['/api/counter', '/api/counter/increment'] };
