import { useState } from "react";
import { supabase } from "../../database/supabase";
import { Button } from "@mui/material";

export const CreatePost = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.from("posts").insert([{ content }]);

    if (error) {
      alert("エラー: " + error.message);
    } else {
      alert("投稿成功！");
      setContent("");
      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="週報を記入してください"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          border: "2px solid #cccccc",
          borderRadius: "4px",
          padding: "8px",
          width: "300px", // 必要に応じてサイズ指定
          height: "100px",
        }}
      />
      <Button variant="contained" type="submit">
        投稿
      </Button>
    </form>
  );
};
