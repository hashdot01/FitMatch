import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xddgpbtpjgxwzexdbpaz.supabase.co/';
const supabaseAnonKey = 'sb_publishable_Ud3i9h17aRblQSrzrLZpjA_UznT_DIF';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);