import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const supabaseUrl = 'https://djmpotyoljqfqhrgkfjg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqbXBvdHlvbGpxZnFocmdrZmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NzYwMDAsImV4cCI6MjA4NjM1MjAwMH0.__HnqgNuHEzT4szYTS-A7hIGtqCOCiVqhnRzfSSgsZg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Solo usamos AsyncStorage si estamos en una plataforma nativa (iOS/Android)
    // En la web, Supabase usará automáticamente el localStorage del navegador de forma segura
    storage: Platform.OS !== 'web' ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});