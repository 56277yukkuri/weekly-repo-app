import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // supabaseResponseにリクエストを通過させるレスポンスを作る
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    "https://qjttkpqfhpbukcnjymyh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdHRrcHFmaHBidWtjbmp5bXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyOTgzMTUsImV4cCI6MjA4OTg3NDMxNX0.NJSX4iLKhk4ZQ-mtXHwDfhssY7sNP2btONQ-A9cQrhc",
    {
      cookies: {
        getAll(){
          return request.cookies.getAll();
        },
        // Supabaseのセッション情報をcookieに同期する
        setAll(cookiesToSet){
          cookiesToSet.forEach(({ name, value, }) => request.cookies.set( name, value ));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => 
            supabaseResponse.cookies.set( name, value, options)
          );
        },
      },
    }
  )
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ログインしていないユーザーが /login や /auth 以外のページにアクセスしたら、ログインページにリダイレクトする
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return supabaseResponse;
}
