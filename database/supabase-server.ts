import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient(){
  const cookieStore = await cookies();

  return createServerClient(
    "https://qjttkpqfhpbukcnjymyh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdHRrcHFmaHBidWtjbmp5bXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyOTgzMTUsImV4cCI6MjA4OTg3NDMxNX0.NJSX4iLKhk4ZQ-mtXHwDfhssY7sNP2btONQ-A9cQrhc",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => 
              cookieStore.set(name, value, options)
            )
          } catch {

          }
        },
      },
    }
  )
}