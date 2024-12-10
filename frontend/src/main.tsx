// For Strict Dev mode
// *** Will execute useEffect on mount twice!
// import { StrictMode } from "react";  // For Strict Dev mode

import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <App />,
  // For Strict Dev Mode
  // *** Will execute useEffect on mount twice!
  // <StrictMode>
  //   <App />
  // </StrictMode>,
);
