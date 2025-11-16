import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useTheme } from "@/hooks/useTheme";

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
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, debounceInMs);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const handleClear = () => {
    setSearchValue("");
  };

  const inputBg = theme === "light" ? "bg-white" : "bg-gray-900";
  const inputBorder = theme === "light" ? "border-gray-200" : "border-gray-800";
  const inputText = theme === "light" ? "text-black" : "text-white";
  const inputPlaceholder =
    theme === "light"
      ? "placeholder:text-gray-400"
      : "placeholder:text-gray-500";
  const iconColor = theme === "light" ? "text-gray-400" : "text-gray-500";
  const hoverBorder =
    theme === "light" ? "hover:border-gray-300" : "hover:border-gray-700";
  const accentColor = "#E91E63";

  return (
    <div className="relative w-5/6">
      <div className="relative">
        <Search
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${iconColor}`}
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-10 py-3 border ${inputBorder} rounded-lg focus:outline-none focus:ring-2 transition-all ${inputPlaceholder} text-sm ${inputBg} ${hoverBorder} ${inputText}`}
          style={
            {
              "--tw-ring-color": accentColor,
            } as React.CSSProperties
          }
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${iconColor} hover:text-pink-500 transition-colors p-1`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
