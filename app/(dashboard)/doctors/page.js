"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import DoctorForm from "../../../components/doctors/DoctorForm";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";

export default function DoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    specialization: "",
    from: "",
    to: "",
  });
  const debouncedSearch = useDebounce(filters.search, 400);
  const debouncedSpecialization = useDebounce(filters.specialization, 400);

  const [pagination, setPagination] = useState(null);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getDoctors({
        ...filters,
        search: debouncedSearch,
        specialization: debouncedSpecialization,
      });

      setDoctors(data.doctors);
      setPagination(data.pagination);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateFilter = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  };
  useEffect(() => {
    loadDoctors();
  }, [
    filters.page,
    filters.limit,
    debouncedSearch,
    debouncedSpecialization,
    filters.from,
    filters.to,
  ]);

  const handleCreate = async (form) => {
    try {
      setFormLoading(true);

      await api.createDoctor(form);

      setShowForm(false);
      await loadDoctors();
    } catch (error) {
      setError(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (form) => {
    try {
      setFormLoading(true);

      await api.updateDoctor(editingDoctor._id, form);

      setEditingDoctor(null);
      setShowForm(false);
      await loadDoctors();
    } catch (error) {
      setError(error.message);
    } finally {
      setFormLoading(false);
    }
  };
  const handleDelete = async (doctor) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${doctor.name}?`,
    );

    if (!confirmed) return;

    try {
      await api.deleteDoctor(doctor._id);
      await loadDoctors();
    } catch (error) {
      setError(error.message);
    }
  };
  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      search: "",
      specialization: "",
      from: "",
      to: "",
    });
  };
  return (
    <main className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
            <p className="mt-1 text-gray-500">Manage doctors in the system.</p>
          </div>

          <button
            onClick={() => {
              setEditingDoctor(null);
              setShowForm(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Doctor
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}
        {showForm && (
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
              {editingDoctor ? "Edit Doctor" : "Add Doctor"}
            </h2>

            <DoctorForm
              doctor={editingDoctor}
              loading={formLoading}
              onSubmit={editingDoctor ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingDoctor(null);
              }}
            />
          </div>
        )}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <label
                htmlFor="doctor-search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Search
              </label>

              <input
                id="doctor-search"
                type="text"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Name, email or phone"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="specialization"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Specialization
              </label>

              <input
                id="specialization"
                type="text"
                value={filters.specialization}
                onChange={(event) =>
                  updateFilter("specialization", event.target.value)
                }
                placeholder="e.g. Cardiology"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="doctor-from"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                From
              </label>

              <input
                id="doctor-from"
                type="date"
                value={filters.from}
                onChange={(event) => updateFilter("from", event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="doctor-to"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                To
              </label>

              <input
                id="doctor-to"
                type="date"
                value={filters.to}
                onChange={(event) => updateFilter("to", event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={clearFilters}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="shadow-sm rounded-xl">
            <TableSkeleton />
          </div>
        ) : doctors.length === 0 ? (
          <div className="p-10 text-center rounded-xl border shadow-sm border-gray-200 bg-white text-gray-500">
            No doctors found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Specialization
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Hospital
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Phone
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {doctors.map((doctor) => (
                    <tr
                      key={doctor._id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {doctor.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {doctor.specialization}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {doctor.hospital}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {doctor.phone}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {doctor.email}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              router.push(`/doctors/${doctor._id}`)
                            }
                            title="View patients"
                            aria-label={`View patients of ${doctor.name}`}
                            className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Details
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingDoctor(doctor);
                              setShowForm(true);
                            }}
                            title="Edit doctor"
                            aria-label={`Edit ${doctor.name}`}
                            className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(doctor)}
                            title="Delete doctor"
                            aria-label={`Delete ${doctor.name}`}
                            className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
              <p className="text-sm text-gray-500">
                Page {pagination?.page || 1} of {pagination?.totalPages || 1}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={!pagination?.hasPreviousPage}
                  onClick={() => updateFilter("page", filters.page - 1)}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={!pagination?.hasNextPage}
                  onClick={() => updateFilter("page", filters.page + 1)}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {doctors.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No doctors found.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
