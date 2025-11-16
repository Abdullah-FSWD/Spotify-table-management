import { useState, useMemo } from 'react';
import type { Table } from '@tanstack/react-table';
import type { SpotifyTrack } from '@/types/spotify.types';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { CustomSelect } from '@/components/table/CustomSelect';
import { CustomInput } from '@/components/table/CustomInput';

type TableFiltersProps = {
  table: Table<SpotifyTrack>;
  data: SpotifyTrack[];
};

export const TableFilters = ({ table, data }: TableFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: visit once for more clarification

  const genres = useMemo(() => {
    const uniqueGenres = Array.from(
      new Set(data.map((track) => track.playlist_genre).filter(Boolean))
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
      {} as Record<string, number>
    );

    return Object.entries(artistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(([artist]) => artist);
  }, [data]);

  // Get current filter values
  const trackNameFilter =
    (table.getColumn('track_name')?.getFilterValue() as string) ?? '';
  const genreFilter =
    (table.getColumn('playlist_genre')?.getFilterValue() as string) ?? '';
  const artistFilter =
    (table.getColumn('track_artist')?.getFilterValue() as string) ?? '';
  const popularityMin =
    (
      table.getColumn('track_popularity')?.getFilterValue() as [number, number]
    )?.[0] ?? 0;
  const popularityMax =
    (
      table.getColumn('track_popularity')?.getFilterValue() as [number, number]
    )?.[1] ?? 100;
  const yearFilter =
    (table.getColumn('track_album_release_date')?.getFilterValue() as string) ??
    '';

  const hasActiveFilters =
    trackNameFilter !== '' ||
    genreFilter !== '' ||
    artistFilter !== '' ||
    popularityMin !== 0 ||
    popularityMax !== 100 ||
    yearFilter !== '';

  const clearAllFilters = () => {
    table.getColumn('track_name')?.setFilterValue('');
    table.getColumn('playlist_genre')?.setFilterValue('');
    table.getColumn('track_artist')?.setFilterValue('');
    table.getColumn('track_popularity')?.setFilterValue(undefined);
    table.getColumn('track_album_release_date')?.setFilterValue('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-gray-600"
        >
          <Filter className="w-4 h-4 text-gray-600" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-primary-100 text-gray-800 rounded-full">
              {table.getState().columnFilters.length}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <CustomInput
                label="Track Name"
                placeholder="Filter by track name..."
                value={trackNameFilter}
                onChange={(e) =>
                  table.getColumn('track_name')?.setFilterValue(e.target.value)
                }
              />
            </div>

            <div>
              <CustomSelect
                label="Genre"
                placeholder="All genres"
                value={genreFilter}
                onValueChange={(value) =>
                  table.getColumn('playlist_genre')?.setFilterValue(value)
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
                  table.getColumn('track_artist')?.setFilterValue(value)
                }
                options={artists.map((artist) => ({
                  value: artist,
                  label: artist,
                }))}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
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
                      .getColumn('track_popularity')
                      ?.setFilterValue([value, popularityMax]);
                  }}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-gray-400"
                  placeholder="Min"
                />
                <span className="text-gray-500 text-sm">to</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={popularityMax}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    table
                      .getColumn('track_popularity')
                      ?.setFilterValue([popularityMin, value]);
                  }}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-gray-400"
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
                    .getColumn('track_album_release_date')
                    ?.setFilterValue(
                      e.target.value ? Number(e.target.value) : ''
                    )
                }
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="pt-3 border-t border-gray-200 text-gray-500 text-sm">
              <p className="text-sm text-gray-600 mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {trackNameFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-gray-800 rounded text-xs">
                    Track: {trackNameFilter}
                    <button
                      onClick={() =>
                        table.getColumn('track_name')?.setFilterValue('')
                      }
                      className="hover:text-gray-900"
                    >
                      <X className="w-4 h-4 hover:bg-gray-200" />
                    </button>
                  </span>
                )}
                {genreFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-gray-800 rounded text-xs">
                    Genre: {genreFilter}
                    <button
                      onClick={() =>
                        table.getColumn('playlist_genre')?.setFilterValue('')
                      }
                      className="hover:text-gray-900"
                    >
                      <X className="w-4 h-4 hover:bg-gray-200" />
                    </button>
                  </span>
                )}
                {artistFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-gray-800 rounded text-xs">
                    Artist: {artistFilter}
                    <button
                      onClick={() =>
                        table.getColumn('track_artist')?.setFilterValue('')
                      }
                      className="hover:text-gray-900"
                    >
                      <X className="w-4 h-4 hover:bg-gray-200" />
                    </button>
                  </span>
                )}
                {(popularityMin !== 0 || popularityMax !== 100) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-gray-800 rounded text-xs">
                    Popularity: {popularityMin}-{popularityMax}
                    <button
                      onClick={() =>
                        table
                          .getColumn('track_popularity')
                          ?.setFilterValue(undefined)
                      }
                      className="hover:text-gray-900"
                    >
                      <X className="w-4 h-4 hover:bg-gray-200" />
                    </button>
                  </span>
                )}
                {yearFilter && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-gray-800 rounded text-xs">
                    Year: {yearFilter}
                    <button
                      onClick={() =>
                        table
                          .getColumn('track_album_release_date')
                          ?.setFilterValue('')
                      }
                      className="hover:text-gray-900"
                    >
                      <X className="w-4 h-4 hover:bg-gray-200" />
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
