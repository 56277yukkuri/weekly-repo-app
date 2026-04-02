import { createServerSupabaseClient } from "@/database/supabase-server";
import { redirect } from "next/navigation"

export async function requireAuth(){
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if ( error || !user ){
    console.log('認証失敗、ログインページにリダイレクト');
    redirect('/login');
  }

  return user;
}