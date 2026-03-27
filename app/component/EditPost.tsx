import { useState } from "react";
type Post = {
  id: number;
  content: string;
};

type Props = {
  isOpen: boolean;
  post: Post | null;
  onClose: () => void;
  onUpdate: (id: number, content: string) => Promise<void>;
};

export const EditPost = ({ isOpen, post, onClose, onUpdate }: Props) => {
  const [content, setContent] = useState(post?.content ?? "");

  if (!isOpen || !post) return null;

  const handleSubmit = async () => {
    await onUpdate(post.id, content);
    onClose();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2>編集</h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div>
          <button onClick={handleSubmit}>更新</button>
        </div>
      </div>
    </div>
  );
};

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
