import type { SpotifyTrack } from '@/types/spotify.types';
import { formatDuration } from '@/utils/formatDuration';
import { formatYear } from '@/utils/formateYears';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export const createColumns = (): ColumnDef<SpotifyTrack>[] => [
  {
    accessorKey: 'track_name',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Track Name
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => (
      <div
        className="font-medium max-w-xs truncate"
        title={info.getValue() as string}
      >
        {info.getValue() as string}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'track_artist',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Artist
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => (
      <div className=" max-w-xs truncate" title={info.getValue() as string}>
        {info.getValue() as string}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'track_album_name',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Album
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => (
      <div
        className=" text-sm max-w-xs truncate"
        title={info.getValue() as string}
      >
        {info.getValue() as string}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'playlist_genre',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Genre
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => {
      const genre = info.getValue() as string;
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100">
          {genre}
        </span>
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'track_popularity',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Popularity
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => {
      const popularity = info.getValue() as number;
      return (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
            <div
              className={` h-2 rounded-full transition-all bg-[#E91E63]`}
              style={{ width: `${popularity}%` }}
            />
          </div>
          <span className="text-sm  min-w-[3ch] text-right">{popularity}</span>
        </div>
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'duration_ms',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Duration
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => (
      <div className=" text-sm font-mono">
        {formatDuration(info.getValue() as number) as string}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'track_album_release_date',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Year
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => {
      const year = formatYear(info.getValue() as string) as number;
      return <div className=" text-sm">{year || 'N/A'}</div>;
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'energy',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Energy
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => {
      const energy = (info.getValue() as number) * 100;
      return <div className=" text-sm">{energy.toFixed(0)}%</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'danceability',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 font-semibold  transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Danceability
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="w-4 h-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      );
    },
    cell: (info) => {
      const danceability = (info.getValue() as number) * 100;
      return <div className=" text-sm">{danceability.toFixed(0)}%</div>;
    },
    enableSorting: true,
  },
];
