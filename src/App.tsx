import './App.css';
import { DataTable } from './components/DataTable';
import { useSpotifyTracksData } from './hooks/useSpotifyTracks';
function App() {
  // const data: SpotifyTrack = parseCsvToJson();
  // console.log(data);
  const { data } = useSpotifyTracksData();
  console.log('data123134', data);
  return (
    <div className="text-yellow-300 font-bold text-5xl">
      <DataTable data={data} />
    </div>
  );
}

export default App;
