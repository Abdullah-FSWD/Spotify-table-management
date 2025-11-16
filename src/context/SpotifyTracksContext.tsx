import { createContext } from "react";
import type { SpotifyTrack } from "../types/spotify.types";

type SpotifyContextTypes = {
  data: SpotifyTrack[];
  loading: boolean;
  error: string | null;
};

export const SpotifyContext = createContext<SpotifyContextTypes | undefined>(
  undefined,
);
