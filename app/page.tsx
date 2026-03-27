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
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Home() {
  type Post = {
    id: number;
    content: string;
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //Postの編集用
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editContent, setEditContent] = useState("");

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
    e.preventDefault();
    const { data, error } = await supabase.from("posts").insert([{ content }]);

    if (error) {
      alert("エラー: " + error.message);
    } else if (data) {
      alert("投稿成功！");
      setPosts((prev) => [data[0], ...prev]); // リロード不要
      setContent("");
    }
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
    }
  };

  // Menu開閉
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* ヘッダー */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              週報アプリ
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 投稿フォーム */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          週報一覧
        </Typography>
        <form onSubmit={handleCreate}>
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
                  action={
                    // 編集・削除表示
                    <IconButton aria-label="settings" onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="ここに名前いれたい"
                  subheader="ここに投稿日いれたい"
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
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  slotProps={{
                    paper: {
                      sx: {
                        border: "1px solid #ddd", // 細い枠にする
                        boxShadow: "none", // 影を消す（または弱くする）
                      },
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setEditingPost({ ...post });
                      // setEditContent(post.content); // ← ここだけでOK
                      handleMenuClose(); // Menuを閉じる
                    }}
                  >
                    編集
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>削除</MenuItem>
                </Menu>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {editingPost && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2>投稿を編集</h2>

            <textarea
              value={editingPost?.content ?? ""}
              onChange={(e) =>
                setEditingPost((prev) =>
                  prev ? { ...prev, content: e.target.value } : prev,
                )
              }
              style={{
                border: "2px solid #cccccc",
                borderRadius: "4px",
                padding: "8px",
                width: "250px", // 必要に応じてサイズ指定
                height: "100px",
              }}
            />

            <div>
              <Button variant="contained" onClick={handleUpdate}>
                保存
              </Button>
              <Button variant="text" onClick={() => setEditingPost(null)}>
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
};
