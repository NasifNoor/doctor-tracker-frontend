export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>

                <th className="px-6 py-4">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </th>

                <th className="px-6 py-4">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>

                <th className="px-6 py-4">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>

                <th className="px-6 py-4">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </th>

                <th className="px-6 py-4">
                  <div className="ml-auto h-4 w-16 rounded bg-gray-200" />
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: rows }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-5">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <div className="h-7 w-16 rounded-md bg-gray-200" />
                      <div className="h-7 w-20 rounded-md bg-gray-200" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <div className="h-4 w-24 rounded bg-gray-200" />

          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-md bg-gray-200" />
            <div className="h-8 w-16 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
