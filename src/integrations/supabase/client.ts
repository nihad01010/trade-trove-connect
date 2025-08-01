
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rdrnmqkqctosoxsbkilt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcm5tcWtxY3Rvc294c2JraWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzODQ4NjAsImV4cCI6MjA1ODk2MDg2MH0.d_nVT-nDi2w0UrtEkWb9Bv4n3AmZORVfMxmDgCVPhWE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
