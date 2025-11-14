import { useContext } from 'react';
import { SpotifyContext } from '../context/SpotifyTracksContext';

export const useSpotifyTracksData = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error('useSpotifyData must be used within a SpotifyDataProvider');
  }
  return context;
};
