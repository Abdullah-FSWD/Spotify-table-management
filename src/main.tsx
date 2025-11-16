import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SpotifyTracksProvider } from "./context/SpotifyTracksProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SpotifyTracksProvider>
        <App />
      </SpotifyTracksProvider>
    </ThemeProvider>
  </StrictMode>,
);
