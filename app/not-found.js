"use client";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <div
          className="text-[10rem] font-black leading-none tracking-tight text-gray-200 sm:text-[12rem]"
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-gray-500">
          The page you're looking for doesn't exist or was moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
