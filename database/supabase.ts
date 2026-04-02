import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from '@supabase/ssr';

// クライアントサイド用
export const createClientssr = () => {
  return createBrowserClient(
    "https://qjttkpqfhpbukcnjymyh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdHRrcHFmaHBidWtjbmp5bXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyOTgzMTUsImV4cCI6MjA4OTg3NDMxNX0.NJSX4iLKhk4ZQ-mtXHwDfhssY7sNP2btONQ-A9cQrhc",
  );
}

export const supabase = createClient(
  "https://qjttkpqfhpbukcnjymyh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdHRrcHFmaHBidWtjbmp5bXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyOTgzMTUsImV4cCI6MjA4OTg3NDMxNX0.NJSX4iLKhk4ZQ-mtXHwDfhssY7sNP2btONQ-A9cQrhc",
);
