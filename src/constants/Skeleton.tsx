import { Music } from "lucide-react";

export const TableSkeleton = () => {
  const skeletonBg = "bg-gray-200";
  const accentColor = "#E91E63";

  return (
    <div className="space-y-5 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg animate-pulse"
            style={{ backgroundColor: accentColor }}
          >
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2">
            <div className={`h-10 w-48 ${skeletonBg} rounded animate-pulse`} />
            <div className={`h-4 w-64 ${skeletonBg} rounded animate-pulse`} />
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-2.5">
        <div
          className={`h-10 flex-1 max-w-md ${skeletonBg} rounded-lg animate-pulse`}
        />
        <div className={`h-10 w-32 ${skeletonBg} rounded animate-pulse`} />
      </div>

      <div className={`h-5 w-48 ${skeletonBg} rounded animate-pulse`} />

      <div className="flex gap-3">
        <div className={`h-10 w-32 ${skeletonBg} rounded-lg animate-pulse`} />
        <div className={`h-10 w-32 ${skeletonBg} rounded-lg animate-pulse`} />
        <div className={`h-10 w-32 ${skeletonBg} rounded-lg animate-pulse`} />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <th key={i} className="px-6 py-4 text-left">
                    <div
                      className={`h-4 w-24 ${skeletonBg} rounded animate-pulse`}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
                <tr key={row} className="border-b border-gray-100">
                  {[1, 2, 3, 4, 5, 6].map((cell) => (
                    <td key={cell} className="px-6 py-4">
                      <div
                        className={`h-4 w-full ${skeletonBg} rounded animate-pulse`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className={`h-10 w-32 ${skeletonBg} rounded animate-pulse`} />
          <div className="flex gap-2">
            <div className={`h-10 w-10 ${skeletonBg} rounded animate-pulse`} />
            <div className={`h-10 w-10 ${skeletonBg} rounded animate-pulse`} />
            <div className={`h-10 w-10 ${skeletonBg} rounded animate-pulse`} />
            <div className={`h-10 w-10 ${skeletonBg} rounded animate-pulse`} />
          </div>
        </div>
      </div>
    </div>
  );
};
