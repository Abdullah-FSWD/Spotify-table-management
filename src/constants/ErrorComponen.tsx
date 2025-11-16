import { AlertCircle, Music, RefreshCw } from "lucide-react";

type ErrorComponentProps = {
  error?: Error | string;
  onRetry?: () => void;
};

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "Something went wrong";

  return (
    <div className="space-y-5 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-black">Music Library</h1>
            <p className="text-sm text-gray-500">
              Browse and filter your track collection
            </p>
          </div>
        </div>
      </div>

      <div className="border border-red-200 bg-red-50 rounded-lg p-12">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-3 rounded-full bg-red-100">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-black">
              Failed to Load Data
            </h3>
            <p className="text-sm text-gray-500 max-w-md">{errorMessage}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
