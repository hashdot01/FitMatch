import { createClient } from './supabaseClient.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const db = createClient(supabaseUrl, supabaseAnonKey);