import "./App.css";
import { DataTable } from "./components/DataTable";
import { ToggleTheme } from "./components/ToggleTheme";
import { useSpotifyTracksData } from "./hooks/useSpotifyTracks";
import { useTheme } from "./hooks/useTheme";
import { cn } from "./lib/utils";

function App() {
  const { data } = useSpotifyTracksData();
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        theme === "light"
          ? "min-h-screen bg-white text-slate-900"
          : "min-h-screen bg-black text-white",
      )}
    >
      <div className="absolute top-6 right-6 z-50">
        <ToggleTheme />
      </div>
      <DataTable data={data} />
    </div>
  );
}

export default App;
