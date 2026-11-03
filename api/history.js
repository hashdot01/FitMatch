import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid authorization header' });
    }
    const token = authHeader.split(' ')[1];

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ message: 'Unauthorized user token' });
    }

    if (req.method === 'POST') {
      const { productUrl, brandName, recommendedSize } = req.body;
      const { data, error } = await supabaseClient
        .from('size_check_history')
        .insert([{ user_id: user.id, product_url: productUrl, brand_name: brandName, recommended_size: recommendedSize }]);

      if (error) throw error;
      return res.status(200).json({ message: 'History saved successfully', data });
    } else {
      const { data, error } = await supabaseClient
        .from('size_check_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json({ history: data });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}