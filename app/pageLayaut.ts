import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  headersx: {
    mr: 2,
    display: { xs: "flex", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 700,
    color: "inherit",
    textDecoration: "none",
  },
  postformArea: {
    "& .MuiOutlinedInput-root": {
      border: "2px solid #cccccc",
      borderRadius: "4px",
      padding: "8px",
      width: "300px",
      height: "100px",
    },
  },
  overlayStyle: {
    "& .MuiOutlinedInput-root": {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  EditformArea: {
    "& .MuiOutlinedInput-root": {
      order: "2px solid #cccccc",
      borderRadius: "4px",
      padding: "8px",
      width: "250px",
      height: "100px",
    },
  },
  menusx: {
    border: "1px solid #ddd",
    boxShadow: "none",
  },
  Modalsx: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
};
