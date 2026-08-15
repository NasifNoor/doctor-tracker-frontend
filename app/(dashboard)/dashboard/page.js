"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data.stats);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <p className="text-gray-500">Loading dashboard...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <p className="mt-1 text-gray-500">
            Overview of your doctor and patient data.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Doctors</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.totalDoctors}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Patients</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.totalPatients}
            </p>
          </div>
        </div>

        {/* Patients per doctor */}
        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Patients per Doctor
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-4 py-3 font-medium">Doctor</th>
                  <th className="px-4 py-3 font-medium">Specialization</th>
                  <th className="px-4 py-3 text-right font-medium">Patients</th>
                </tr>
              </thead>

              <tbody>
                {stats.patientsPerDoctor.map((doctor) => (
                  <tr
                    key={doctor.doctorId}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {doctor.doctorName}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {doctor.specialization}
                    </td>

                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {doctor.patientCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Patients by date */}
        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Patients by Date
          </h2>

          <div className="mt-5 space-y-3">
            {stats.patientsByDate.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
              >
                <span className="text-sm text-gray-600">{item._id}</span>

                <span className="font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
