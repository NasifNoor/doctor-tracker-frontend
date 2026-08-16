"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import PatientForm from "../../../components/patients/PatientForm";
import { Pencil, Trash2 } from "lucide-react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [condition, setCondition] = useState("");
  const debouncedcondition = useDebounce(condition, 400);
  const [doctorId, setDoctorId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDoctors = async () => {
    try {
      const data = await api.getDoctors();
      setDoctors(data.doctors);
    } catch (error) {
      setError(error.message);
    }
  };

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getPatients({
        page,
        limit,
        search: debouncedSearch,
        condition: debouncedcondition,
        doctorId,
        from,
        to,
      });

      setPatients(data.patients);
      setPagination(data.pagination);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    loadPatients();
  }, [page, debouncedSearch, debouncedcondition, doctorId, from, to]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
    setPage(1);
  };

  const handleDoctorChange = (event) => {
    setDoctorId(event.target.value);
    setPage(1);
  };
  const handleFromChange = (event) => {
    setFrom(event.target.value);
    setPage(1);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCondition("");
    setDoctorId("");
    setFrom("");
    setTo("");
    setPage(1);
  };
  const handleCreate = async (form) => {
    try {
      setFormLoading(true);
      setError("");

      await api.createPatient(form);

      setShowForm(false);
      await loadPatients();
    } catch (error) {
      setError(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (form) => {
    try {
      setFormLoading(true);
      setError("");

      await api.updatePatient(editingPatient._id, form);

      setShowForm(false);
      setEditingPatient(null);

      await loadPatients();
    } catch (error) {
      setError(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (patient) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.name}?`,
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.deletePatient(patient._id);

      if (patients.length === 1 && pagination?.page > 1) {
        setPage((current) => current - 1);
      } else {
        await loadPatients();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>

            <p className="mt-1 text-gray-500">Manage and search patients.</p>
          </div>
        </div>
        {showForm && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPatient ? "Edit Patient" : "Add Patient"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingPatient
                  ? "Update the patient's information."
                  : "Add a new patient to the system."}
              </p>
            </div>

            <PatientForm
              patient={editingPatient}
              doctors={doctors}
              loading={formLoading}
              onSubmit={editingPatient ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingPatient(null);
              }}
            />
          </div>
        )}

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Search
              </label>

              <input
                id="search"
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Name, email or phone"
                className="w-full rounded-lg border border-gray-300 text-gray-900 px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="condition"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Condition
              </label>

              <input
                id="condition"
                type="text"
                value={condition}
                onChange={handleConditionChange}
                placeholder="e.g. Hypertension"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="doctor"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Doctor
              </label>

              <select
                id="doctor"
                value={doctorId}
                onChange={handleDoctorChange}
                className="w-full rounded-lg border border-gray-300 text-gray-900 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
              >
                <option value="">All doctors</option>

                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="from"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                From
              </label>

              <input
                id="from"
                type="date"
                value={from}
                onChange={handleFromChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="to"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                To
              </label>

              <input
                id="to"
                type="date"
                value={to}
                onChange={handleToChange}
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

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <TableSkeleton />
          ) : patients.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No patients found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Patient
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Age
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Gender
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Doctor
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Condition
                    </th>

                    <th className="px-6 py-4 text-right font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {patients.map((patient) => (
                    <tr
                      key={patient._id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {patient.name}
                        </div>

                        <div className="text-gray-500">
                          {patient.email || patient.phone}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">{patient.age}</td>

                      <td className="px-6 py-4 capitalize text-gray-600">
                        {patient.gender}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {patient.doctorId?.name || "—"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {patient.condition}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPatient(patient);
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
                            onClick={() => handleDelete(patient)}
                            title="Delete doctor"
                            aria-label={`Delete ${patient.name}`}
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
          )}

          {!loading && pagination && pagination.totalPages > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
              <p className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={!pagination.hasNextPage}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
