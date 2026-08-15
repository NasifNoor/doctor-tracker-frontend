"use client";

import { useState } from "react";

const getInitialForm = (patient) => ({
  doctorId:
    typeof patient?.doctorId === "object"
      ? patient.doctorId?._id || ""
      : patient?.doctorId || "",
  name: patient?.name || "",
  age: patient?.age ?? "",
  gender: patient?.gender || "",
  phone: patient?.phone || "",
  email: patient?.email || "",
  condition: patient?.condition || "",
});

export default function PatientForm({
  patient,
  doctors,
  loading,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(getInitialForm(patient));

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...form,
      age: Number(form.age),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Doctor */}
      <div>
        <label
          htmlFor="doctorId"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Doctor
        </label>

        <select
          id="doctorId"
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-blue-500"
        >
          <option value="">Select doctor</option>

          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} — {doctor.specialization}
            </option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Age */}
      <div>
        <label
          htmlFor="age"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Age
        </label>

        <input
          id="age"
          name="age"
          type="number"
          min="0"
          value={form.age}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Gender */}
      <div>
        <label
          htmlFor="gender"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Gender
        </label>

        <select
          id="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-blue-500"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Phone
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Condition */}
      <div>
        <label
          htmlFor="condition"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Condition
        </label>

        <input
          id="condition"
          name="condition"
          type="text"
          value={form.condition}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : patient
              ? "Update Patient"
              : "Create Patient"}
        </button>
      </div>
    </form>
  );
}
