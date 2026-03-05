"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-stone-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <p className="text-stone-600">Please sign in to access your dashboard.</p>
        <Link
          href="/login"
          className="px-4 py-2 bg-accent-600 text-white rounded-xl font-medium hover:bg-accent-500"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-stone-900">Your dashboard</h1>
        <p className="mt-1 text-stone-600">Welcome back, {user.email}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Link
            href="/dashboard/documents"
            className="block p-6 rounded-2xl border border-stone-200 bg-white hover:border-accent-300 hover:shadow-md transition-all"
          >
            <h2 className="font-semibold text-stone-900">Documents</h2>
            <p className="mt-2 text-sm text-stone-600">Agreements, contracts, and files</p>
          </Link>
          <Link
            href="/dashboard/updates"
            className="block p-6 rounded-2xl border border-stone-200 bg-white hover:border-accent-300 hover:shadow-md transition-all"
          >
            <h2 className="font-semibold text-stone-900">Property updates</h2>
            <p className="mt-2 text-sm text-stone-600">Latest updates on your property</p>
          </Link>
          <Link
            href="/dashboard/transactions"
            className="block p-6 rounded-2xl border border-stone-200 bg-white hover:border-accent-300 hover:shadow-md transition-all"
          >
            <h2 className="font-semibold text-stone-900">Transaction history</h2>
            <p className="mt-2 text-sm text-stone-600">Renewals and payments</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
