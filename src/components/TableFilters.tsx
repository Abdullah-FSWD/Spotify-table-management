import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import type { SpotifyTrack } from "@/types/spotify.types";
import { Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { CustomSelect } from "@/components/table/CustomSelect";
import { CustomInput } from "@/components/table/CustomInput";
import { useTheme } from "@/hooks/useTheme";

type TableFiltersProps = {
  table: Table<SpotifyTrack>;
  data: SpotifyTrack[];
};

export const TableFilters = ({ table, data }: TableFiltersProps) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const genres = useMemo(() => {
    const uniqueGenres = Array.from(
      new Set(data.map((track) => track.playlist_genre).filter(Boolean)),
    ).sort();
    return uniqueGenres;
  }, [data]);

  const artists = useMemo(() => {
    const artistCounts = data.reduce(
      (acc, track) => {
        const artist = track.track_artist;
        if (artist) {
          acc[artist] = (acc[artist] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(artistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(([artist]) => artist);
  }, [data]);

  const trackNameFilter =
    (table.getColumn("track_name")?.getFilterValue() as string) ?? "";
  const genreFilter =
    (table.getColumn("playlist_genre")?.getFilterValue() as string) ?? "";
  const artistFilter =
    (table.getColumn("track_artist")?.getFilterValue() as string) ?? "";
  const popularityMin =
    (
      table.getColumn("track_popularity")?.getFilterValue() as [number, number]
    )?.[0] ?? 0;
  const popularityMax =
    (
      table.getColumn("track_popularity")?.getFilterValue() as [number, number]
    )?.[1] ?? 100;
  const yearFilter =
    (table.getColumn("track_album_release_date")?.getFilterValue() as string) ??
    "";

  const hasActiveFilters =
    trackNameFilter !== "" ||
    genreFilter !== "" ||
    artistFilter !== "" ||
    popularityMin !== 0 ||
    popularityMax !== 100 ||
    yearFilter !== "";

  const clearAllFilters = () => {
    table.getColumn("track_name")?.setFilterValue("");
    table.getColumn("playlist_genre")?.setFilterValue("");
    table.getColumn("track_artist")?.setFilterValue("");
    table.getColumn("track_popularity")?.setFilterValue(undefined);
    table.getColumn("track_album_release_date")?.setFilterValue("");
  };

  const filtersText = theme === "light" ? "text-gray-700" : "text-gray-300";
  const filtersLabel = theme === "light" ? "text-gray-600" : "text-gray-400";
  const accentColor = "#E91E63";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 ${filtersText} ${
            theme === "light"
              ? "border-gray-200 hover:border-gray-300 hover:text-black text-gray-800"
              : "border-gray-800 hover:border-pink-500 hover:text-pink-500 text-pink-800"
          } transition-colors`}
          style={
            theme === "dark"
              ? ({ "--tw-text-opacity": "1" } as React.CSSProperties)
              : {}
          }
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span
              className={`ml-1 px-2.5 py-0.5 text-xs font-semibold rounded-full`}
              style={{ backgroundColor: accentColor, color: "white" }}
            >
              {table.getState().columnFilters.length}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className={`flex items-center gap-2 transition-colors`}
            style={{
              color: accentColor,
              backgroundColor:
                theme === "light"
                  ? "rgba(233, 30, 99, 0.05)"
                  : "rgba(233, 30, 99, 0.1)",
            }}
          >
            <X className="w-4 h-4" />
            Clear all
          </Button>
        )}
      </div>

      {isOpen && (
        <div
          className={`${theme === "light" ? "bg-white" : "bg-gray-900"} border ${theme === "light" ? "border-gray-200" : "border-gray-800"} rounded-lg p-4 space-y-4`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <CustomInput
                label="Track Name"
                placeholder="Filter by track name..."
                value={trackNameFilter}
                onChange={(e) =>
                  table.getColumn("track_name")?.setFilterValue(e.target.value)
                }
              />
            </div>

            <div>
              <CustomSelect
                label="Genre"
                placeholder="All genres"
                value={genreFilter}
                onValueChange={(value) =>
                  table.getColumn("playlist_genre")?.setFilterValue(value)
                }
                options={genres.map((genre) => ({
                  value: genre,
                  label: genre,
                }))}
              />
            </div>

            <div>
              <CustomSelect
                label="Artist (Top 100)"
                placeholder="All artists"
                value={artistFilter}
                onValueChange={(value) =>
                  table.getColumn("track_artist")?.setFilterValue(value)
                }
                options={artists.map((artist) => ({
                  value: artist,
                  label: artist,
                }))}
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-semibold ${filtersText}`}>
                Popularity Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={popularityMin}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    table
                      .getColumn("track_popularity")
                      ?.setFilterValue([value, popularityMax]);
                  }}
                  className={`w-20 px-2.5 py-1.5 border ${theme === "light" ? "border-gray-200" : "border-gray-800"} rounded text-sm ${filtersText} focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${theme === "light" ? "bg-white" : "bg-gray-700"}`}
                  placeholder="Min"
                />
                <span className={`text-sm ${filtersLabel}`}>to</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={popularityMax}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    table
                      .getColumn("track_popularity")
                      ?.setFilterValue([popularityMin, value]);
                  }}
                  className={`w-20 px-2.5 py-1.5 border ${theme === "light" ? "border-gray-200" : "border-gray-800"} rounded text-sm ${filtersText} focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${theme === "light" ? "bg-white" : "bg-gray-700"}`}
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <CustomInput
                label="Release Year"
                type="number"
                placeholder="e.g 2000 etc."
                value={yearFilter}
                onChange={(e) =>
                  table
                    .getColumn("track_album_release_date")
                    ?.setFilterValue(
                      e.target.value ? Number(e.target.value) : "",
                    )
                }
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div
              className={`pt-3 border-t ${theme === "light" ? "border-gray-200" : "border-gray-800"} space-y-2`}
            >
              <p
                className={`text-xs font-semibold ${filtersLabel} uppercase tracking-wide`}
              >
                Active filters:
              </p>
              <div className="flex flex-wrap gap-2">
                {trackNameFilter && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium`}
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    Track: {trackNameFilter}
                    <button
                      onClick={() =>
                        table.getColumn("track_name")?.setFilterValue("")
                      }
                      className={`transition-colors ${
                        theme === "light"
                          ? "hover:text-black"
                          : "hover:text-white"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {genreFilter && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium`}
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    Genre: {genreFilter}
                    <button
                      onClick={() =>
                        table.getColumn("playlist_genre")?.setFilterValue("")
                      }
                      className={`transition-colors ${
                        theme === "light"
                          ? "hover:text-black"
                          : "hover:text-white"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {artistFilter && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium`}
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    Artist: {artistFilter}
                    <button
                      onClick={() =>
                        table.getColumn("track_artist")?.setFilterValue("")
                      }
                      className={`transition-colors ${
                        theme === "light"
                          ? "hover:text-black"
                          : "hover:text-white"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {(popularityMin !== 0 || popularityMax !== 100) && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium`}
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    Popularity: {popularityMin}-{popularityMax}
                    <button
                      onClick={() =>
                        table
                          .getColumn("track_popularity")
                          ?.setFilterValue(undefined)
                      }
                      className={`transition-colors ${
                        theme === "light"
                          ? "hover:text-black"
                          : "hover:text-white"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {yearFilter && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium`}
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    Year: {yearFilter}
                    <button
                      onClick={() =>
                        table
                          .getColumn("track_album_release_date")
                          ?.setFilterValue("")
                      }
                      className={`transition-colors ${
                        theme === "light"
                          ? "hover:text-black"
                          : "hover:text-white"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
