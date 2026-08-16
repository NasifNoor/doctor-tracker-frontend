"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { api } from "../../lib/api";
import Authchecking from "@/components/ui/Authchecking";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await api.getMe();
        setCheckingAuth(false);
      } catch {
        router.replace("/login");
      }
    };

    checkAuthentication();
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.logout();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (checkingAuth) {
    return <Authchecking />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="text-xl font-bold text-gray-900">
            Doctor Tracker
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>

            <Link
              href="/doctors"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Doctors
            </Link>

            <Link
              href="/patients"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Patients
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}
