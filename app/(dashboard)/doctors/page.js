"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import DoctorForm from "../../../components/doctors/DoctorForm";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const loadDoctors = async () => {
    try {
      setError("");

      const data = await api.getDoctors();
      setDoctors(data.doctors);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);
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
            Add Doctor
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading doctors...</p>}

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
        {!loading && !error && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
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
                        <button
                          onClick={() => {
                            setEditingDoctor(doctor);
                            setShowForm(true);
                          }}
                          className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(doctor)}
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
