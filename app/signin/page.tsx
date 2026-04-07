"use client";

import { useState } from "react";
import { createClientssr } from "@/database/supabase";
import { useRouter, redirect } from "next/navigation";

export default function SigninPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 新規登録
  const handlesignup = async () => {
    setIsLoading(true);
    const supabase = createClientssr();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    console.log("data:", data);
    console.log("error:", error);

    if (error) {
      setMessage(`新規作成に失敗しました: ${error.message}`);
    } else {
      setMessage(`新規作成に成功しました`);
      router.push("/login");
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <h2>新規作成</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
        className="border p-2 mb-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
        className="border p-2 mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        className="border p-2 mb-2"
      />
      <br />
      <button
        onClick={handlesignup}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isLoading ? "処理中..." : "新規作成"}
      </button>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      <br />
    </div>
  );
}
