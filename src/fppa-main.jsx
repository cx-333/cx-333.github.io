import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FppaDetail from "./pages/FppaDetail.jsx";
import "./pages/PaperDetail.css";
import "./pages/FppaDetail.css";

createRoot(document.getElementById("root")).render(
  <StrictMode><FppaDetail /></StrictMode>,
);
