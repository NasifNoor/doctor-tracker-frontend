"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { api } from "../../../../lib/api";
import PatientForm from "@/components/patients/PatientForm";
import DoctorDetailsSkeleton from "@/components/ui/DoctorDetailsSkeleton";
import DoctorNotFound from "@/components/doctors/DoctorNotFound";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const loadDoctor = async () => {
    try {
      const data = await api.getDoctor(id);
      setDoctor(data.doctor);
    } catch (error) {
      setError(error.message);
    }
  };

  const loadPatients = async () => {
    try {
      const data = await api.getDoctorPatients(id);
      setPatients(data.patients);
    } catch (error) {
      setError(error.message);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([loadDoctor(), loadPatients()]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);
  const handleAddPatient = async (form) => {
    try {
      setFormLoading(true);
      setError("");

      await api.createPatient({ ...form, doctorId: id });

      setShowPatientForm(false);

      await loadPatients();
    } catch (error) {
      setError(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePatient = async (patient) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${patient.name} from this doctor's patient list?`,
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.deletePatient(patient._id);

      await loadPatients();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <DoctorDetailsSkeleton />;
  }

  if (error && !doctor) {
    return <DoctorNotFound />;
  }

  return (
    <main className="p-6">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => router.push("/doctors")}
          className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Doctors
        </button>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-500">Doctor</p>

              <h1 className="text-3xl font-bold text-gray-900">
                {doctor.name}
              </h1>

              <p className="mt-2 text-lg text-blue-600">
                {doctor.specialization}
              </p>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2 md:min-w-[420px]">
              <div>
                <p className="text-gray-500">Hospital</p>
                <p className="font-medium text-gray-900">
                  {doctor.hospital || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {doctor.phone || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  {doctor.email || "—"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Patients</p>
                <p className="font-medium text-gray-900">{patients.length}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Patients</h2>

              <p className="mt-1 text-sm text-gray-500">
                Patients currently assigned to {doctor.name}.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPatientForm(true)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add Patient
            </button>
          </div>
          {showPatientForm && (
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add Patient
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add a new patient to {doctor.name}.
                </p>
              </div>

              <PatientForm
                showDoctor={false}
                loading={formLoading}
                onSubmit={handleAddPatient}
                onCancel={() => setShowPatientForm(false)}
              />
            </div>
          )}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {patients.length === 0 ? (
              <div className="p-10 text-center">
                <p className="font-medium text-gray-900">No patients found</p>

                <p className="mt-1 text-sm text-gray-500">
                  Add a patient to this doctor to get started.
                </p>
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
                        Phone
                      </th>

                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Condition
                      </th>

                      <th className="px-6 py-4 text-right font-semibold text-gray-700">
                        Action
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
                          <p className="font-medium text-gray-900">
                            {patient.name}
                          </p>

                          {patient.email && (
                            <p className="text-gray-500">{patient.email}</p>
                          )}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {patient.age}
                        </td>

                        <td className="px-6 py-4 capitalize text-gray-600">
                          {patient.gender}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {patient.phone}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {patient.condition}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeletePatient(patient)}
                            title="Delete Patient"
                            aria-label={`Delete ${doctor.name}`}
                            className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
