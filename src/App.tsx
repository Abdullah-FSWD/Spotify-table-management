import './App.css';
import { DataTable } from './components/DataTable';
import { useSpotifyTracksData } from './hooks/useSpotifyTracks';
function App() {
  const { data } = useSpotifyTracksData();
  return (
    <div className="text-yellow-300 font-bold text-5xl">
      <DataTable data={data} />
    </div>
  );
}

export default App;
