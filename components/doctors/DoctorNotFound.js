"use client";
import Link from "next/link";
import React from "react";

export default function DoctorNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight rounded-lg bg-red-50 p-4 text-red-600">
          Doctor not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-gray-500">
          We couldn't find the doctor you're looking for.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            ← Go Back
          </button>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Doctors
          </Link>
        </div>
      </div>
    </main>
  );
}
