export default function DashboardSkeleton() {
  return (
    <main className="min-h-screen animate-pulse bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="h-9 w-40 rounded bg-gray-200" />

          <div className="mt-2 h-4 w-72 rounded bg-gray-200" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {[1, 2].map((item) => (
            <div key={item} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="h-4 w-28 rounded bg-gray-200" />

              <div className="mt-3 h-9 w-16 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="h-6 w-44 rounded bg-gray-200" />

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </th>

                  <th className="px-4 py-3">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                  </th>

                  <th className="px-4 py-3">
                    <div className="ml-auto h-4 w-16 rounded bg-gray-200" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-4">
                      <div className="h-4 w-32 rounded bg-gray-200" />
                    </td>

                    <td className="px-4 py-4">
                      <div className="h-4 w-28 rounded bg-gray-200" />
                    </td>

                    <td className="px-4 py-4">
                      <div className="ml-auto h-4 w-8 rounded bg-gray-200" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="h-6 w-36 rounded bg-gray-200" />

          <div className="mt-5 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
              >
                <div className="h-4 w-28 rounded bg-gray-200" />

                <div className="h-4 w-8 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
