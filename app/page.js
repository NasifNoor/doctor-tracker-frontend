"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { api } from "../lib/api";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        await api.getMe();
        router.replace("/dashboard");
      } catch {
        router.replace("/login");
      }
    };

    redirectUser();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </main>
  );
}
