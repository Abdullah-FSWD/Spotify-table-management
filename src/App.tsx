import './App.css';
import { useSpotifyTracksData } from './hooks/useSpotifyTracks';
function App() {
  // const data: SpotifyTrack = parseCsvToJson();
  // console.log(data);
  const { data } = useSpotifyTracksData();
  console.log('data123134', data);
  return <div className="text-yellow-300 font-bold text-5xl">Hellow world</div>;
}

export default App;
