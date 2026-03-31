"use client";
import { useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  Box,
  Modal,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styles } from "./pageLayaut";
import { Hail } from "@mui/icons-material";

export default function Home() {
  type Post = {
    id: number;
    content: string;
    created_at: Date;
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");

  //Postの編集用
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editContent, setEditContent] = useState("");

  //Postの削除用
  const [deletePostid, setDeletePostid] = useState<number | undefined>();

  // モーダル用
  const [modalOpen, setModalOpen] = useState(false);
  const [comfirmOpen, setComfirmOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  //Postの取得
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false });
      setPosts(data ?? []);
    };
    fetchPosts();
  }, []);

  // Postの投稿
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ブラウザによるデフォルト動作されないためのおまじない（らしい）

    // contentが空の場合はエラーメッセージを表示して処理を中断
    if (!content.trim()) {
      setErrorMessage("テキストフィールドが空です");
      return;
    }

    setErrorMessage(""); // 送信前にエラーをリセット

    const { error } = await supabase.from("posts").insert([{ content }]);

    if (error) {
      alert("エラー: " + error.message);
    } else {
      alert("投稿成功！");
      window.location.href = "http://localhost:3000/";
      setContent("");
    }
  };

  // 編集ボタン押下で編集モーダルを開く＆編集対象を更新
  const onClickEdit = (post: Post) => {
    setModalOpen(true);
    setEditContent(post.content);
    setEditingPost(post);
  };

  //Postの編集
  const handleUpdate = async () => {
    if (!editingPost) return;

    const { error } = await supabase
      .from("posts")
      .update({ content: editContent })
      .eq("id", editingPost.id);

    if (error) {
      alert("エラー: " + error.message);
    } else {
      alert("更新成功！");

      // state更新（リロード不要）
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id ? { ...p, content: editContent } : p,
        ),
      );
      setEditingPost(null);
      setModalOpen(false);
    }
  };

  // 削除ボタン押下で削除確認モーダルを開く＆削除対象を更新
  const onClickDelete = (id: number) => {
    setComfirmOpen(true);
    setDeletePostid(id);
  };
  // Postの削除
  const handleDelete = async () => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", deletePostid);

    if (error) {
      alert("エラー: " + error.message);
    } else {
      alert("削除成功！");

      // state更新（リロード不要）
      setPosts((p) => p.filter((post) => post.id !== deletePostid));
      setDeletePostid(undefined);
      setComfirmOpen(false);
    }
  };

  return (
    <>
      {/* ヘッダー */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" component="a" sx={styles.headersx}>
              簡易Twitter
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 投稿フォーム */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          ツイート一覧
        </Typography>
        <form onSubmit={handleCreate}>
          {/* フォームのテキストフィールド付近に追加 */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <TextField
            placeholder="今何してる？"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            multiline
            rows={4}
            sx={styles.postformArea}
          />
          <p></p>
          <Button variant="contained" type="submit">
            投稿
          </Button>
        </form>

        {/* 投稿一覧 */}
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid size={{ xs: 12 }} key={post.id}>
              <Card sx={{ height: "100%" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  title="ここに名前いれたい"
                  subheader={new Date(post.created_at).toLocaleString("ja-JP")}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {post.content.slice(0, 100)}...
                  </Typography>
                </CardContent>
                {/* メニュー */}
                <Button variant="text" onClick={() => onClickEdit(post)}>
                  編集
                </Button>
                <Button variant="text" onClick={() => onClickDelete(post.id)}>
                  削除
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 編集モーダル */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={styles.Modalsx}>
          <Typography variant="h6">編集</Typography>
          <TextField
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <Button variant="contained" onClick={() => handleUpdate()}>
            更新
          </Button>
          <Button variant="outlined" onClick={() => setModalOpen(false)}>
            キャンセル
          </Button>
        </Box>
      </Modal>

      {/* 削除モーダル */}
      <Modal open={comfirmOpen} onClose={() => setComfirmOpen(false)}>
        <Box sx={styles.Modalsx}>
          <Typography variant="body1">削除しますか？</Typography>
          <Button variant="contained" onClick={() => handleDelete()}>
            はい
          </Button>
          <Button variant="outlined" onClick={() => setComfirmOpen(false)}>
            いいえ
          </Button>
        </Box>
      </Modal>
    </>
  );
}
