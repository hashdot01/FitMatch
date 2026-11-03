import { createClient } from '../lib/supabaseClient.js';

const supabaseUrl = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const db = createClient(supabaseUrl, supabaseAnonKey);