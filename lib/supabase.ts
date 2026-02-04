import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://myafxgfvbwbujanaxusl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YWZ4Z2Z2YndidWphbmF4dXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMTUwOTIsImV4cCI6MjA4NTc5MTA5Mn0.x9kheia6pWPnAjBougUQhNg4bM8ks2gW32tbnitfhkE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});