import { createClient } from '@supabase/supabase-js';
import { storageAdapter } from '../storage/storge.adapter';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://oanerhrcrlyaoxpajglh.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hbmVyaHJjcmx5YW94cGFqZ2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNzgxMDEsImV4cCI6MjA4Njk1NDEwMX0.BoL1xzCAIVpsqmRQ56hlLdcOmXsRdkGPi3TRCXyNIOI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: storageAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});