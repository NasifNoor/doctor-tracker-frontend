export default function DoctorDetailsSkeleton() {
  return (
    <main className="animate-pulse p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 h-4 w-32 rounded bg-gray-200" />

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <div className="mb-3 h-4 w-16 rounded bg-gray-200" />

              <div className="h-9 w-56 rounded bg-gray-200" />

              <div className="mt-3 h-6 w-32 rounded bg-gray-200" />
            </div>

            <div className="grid gap-4 text-sm sm:grid-cols-2 md:min-w-[420px]">
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <div className="mb-2 h-3 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="h-6 w-24 rounded bg-gray-200" />

              <div className="mt-2 h-4 w-72 rounded bg-gray-200" />
            </div>

            <div className="h-10 w-32 rounded-lg bg-gray-200" />
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    {[
                      "Patient",
                      "Age",
                      "Gender",
                      "Phone",
                      "Condition",
                      "Action",
                    ].map((heading) => (
                      <th key={heading} className="px-6 py-4">
                        <div
                          className={`h-4 rounded bg-gray-200 ${
                            heading === "Patient"
                              ? "w-20"
                              : heading === "Condition"
                                ? "w-24"
                                : heading === "Action"
                                  ? "ml-auto w-16"
                                  : "w-16"
                          }`}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-5">
                        <div className="h-4 w-32 rounded bg-gray-200" />
                        <div className="mt-2 h-3 w-40 rounded bg-gray-200" />
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-4 w-8 rounded bg-gray-200" />
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-4 w-16 rounded bg-gray-200" />
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-4 w-24 rounded bg-gray-200" />
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-4 w-28 rounded bg-gray-200" />
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end">
                          <div className="h-7 w-20 rounded-md bg-gray-200" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
