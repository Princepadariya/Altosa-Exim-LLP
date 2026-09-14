import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles/global.css";
import { dismissBootLoader } from "./utils/bootLoader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/* The page is rendered underneath first; the loader then waits for it to be
   ready before lifting. */
dismissBootLoader();
