import './App.css';
import { DataTable } from './components/DataTable';
import { ToggleTheme } from './components/ToggleTheme';
import { ErrorComponent } from './constants/ErrorComponen';
import { TableSkeleton } from './constants/Skeleton';
import { useSpotifyTracksData } from './hooks/useSpotifyTracks';
import { useTheme } from './hooks/useTheme';
import { cn } from './lib/utils';

function App() {
  const { data, loading, error } = useSpotifyTracksData();
  const { theme } = useTheme();

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <ErrorComponent error="Failed to fetch tracks from the server. Please check your connection." />
    );
  }
  return (
    <div
      className={cn(
        theme === 'light'
          ? 'min-h-screen bg-white text-slate-900'
          : 'min-h-screen bg-black text-white'
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
