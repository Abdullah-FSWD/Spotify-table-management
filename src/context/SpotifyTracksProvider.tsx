import { useEffect, useState, type ReactNode } from "react";
import Papa from "papaparse";
import type { SpotifyTrack } from "../types/spotify.types";
import { SpotifyContext } from "./SpotifyTracksContext";

export function SpotifyTracksProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndParseCSV = async () => {
      try {
        setLoading(true);
        const response = await fetch("/src/data/spotify_songs.csv");
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          complete: (results: { data: SpotifyTrack[] }) => {
            console.log(results.data);
            setData(results.data);
            setLoading(false);
          },
          error: (err: Error) => {
            console.log("err", err);
            setError(err.message);
            setLoading(false);
          },
        });
      } catch (err: unknown) {
        console.log("error", err);
        setError("failed to load CSV file");
        setLoading(false);
      }
    };
    fetchAndParseCSV();
  }, []);

  return (
    <SpotifyContext.Provider value={{ data, loading, error }}>
      {children}
    </SpotifyContext.Provider>
  );
}
