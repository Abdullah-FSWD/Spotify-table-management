import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
  debounceInMs?: number;
}

export const SearchBar = ({
  onSearchChange,
  placeholder = "Search tracks, artists, albums...",
  debounceInMs = 300,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, debounceInMs);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute mt-1.5 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-400 text-sm"
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {debouncedSearch && (
        <p className="text-sm text-gray-500 mt-1">
          Searching for:{" "}
          <span className="font-medium text-gray-700">{debouncedSearch}</span>
        </p>
      )}
    </div>
  );
};
