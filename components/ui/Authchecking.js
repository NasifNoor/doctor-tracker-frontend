import React from "react";

export default function Authchecking() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="h-6 w-36 rounded bg-gray-200" />

          <div className="flex items-center gap-6">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="h-4 w-14 rounded bg-gray-200" />
          </div>
        </div>
      </header>

      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">Checking authentication...</p>
      </main>
    </div>
  );
}
