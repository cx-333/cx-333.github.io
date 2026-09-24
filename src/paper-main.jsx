import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PaperDetail from "./pages/PaperDetail.jsx";
import "./pages/PaperDetail.css";

createRoot(document.getElementById("root")).render(
  <StrictMode><PaperDetail /></StrictMode>,
);
