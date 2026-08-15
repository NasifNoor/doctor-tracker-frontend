"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  specialization: "",
  hospital: "",
  phone: "",
  email: "",
};

export default function DoctorForm({ doctor, loading, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    doctor
      ? {
          name: doctor.name || "",
          specialization: doctor.specialization || "",
          hospital: doctor.hospital || "",
          phone: doctor.phone || "",
          email: doctor.email || "",
        }
      : initialForm,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        ["name", "Name"],
        ["specialization", "Specialization"],
        ["hospital", "Hospital"],
        ["phone", "Phone"],
        ["email", "Email"],
      ].map(([name, label]) => (
        <div key={name}>
          <label
            htmlFor={name}
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>

          <input
            id={name}
            name={name}
            type={name === "email" ? "email" : "text"}
            value={form[name]}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 text-gray-900 px-3 py-2.5 outline-none focus:border-blue-500"
          />
        </div>
      ))}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : doctor ? "Update Doctor" : "Create Doctor"}
        </button>
      </div>
    </form>
  );
}
