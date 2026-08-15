"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import PatientForm from "../../../components/patients/PatientForm";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("");
  const [doctorId, setDoctorId] = useState("");
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
        search,
        condition,
        doctorId,
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
  }, [page, search, condition, doctorId]);

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

  const clearFilters = () => {
    setSearch("");
    setCondition("");
    setDoctorId("");
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

          <button
            type="button"
            onClick={() => {
              setEditingPatient(null);
              setShowForm(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Patient
          </button>
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

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
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

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading patients...
            </div>
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
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPatient(patient);
                            setShowForm(true);
                          }}
                          className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(patient)}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
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
