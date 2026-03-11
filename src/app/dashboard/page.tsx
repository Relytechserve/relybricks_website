"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type CustomerProfile = {
  id: string;
  name: string;
  email: string;
  plan_type: string | null;
  status: string;
  property_city: string | null;
  property_area: string | null;
  property_type: string | null;
};

type PropertyUpdate = {
  id: string;
  title: string;
  body: string | null;
  created_at: string;
};

type Transaction = {
  id: string;
  type: "renewal" | "payment" | "other";
  amount: number | null;
  date: string;
};

type DashboardData = {
  customer: CustomerProfile | null;
  documentsCount: number;
  updates: PropertyUpdate[];
  transactions: Transaction[];
};

function extractFirstName(fullName: string | null | undefined, fallback: string | undefined) {
  if (!fullName) {
    return fallback ?? "there";
  }
  const cleaned = fullName.trim().replace(/\s+/g, " ");
  if (!cleaned) return fallback ?? "there";
  const parts = cleaned.split(" ");
  const titles = new Set(["mr", "mr.", "mrs", "mrs.", "ms", "ms.", "dr", "dr."]);
  let firstIndex = 0;
  if (parts.length > 1 && titles.has(parts[0].toLowerCase())) {
    firstIndex = 1;
  }
  const first = parts[firstIndex] ?? "";
  return first || fallback || "there";
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [data, setData] = useState<DashboardData>({
    customer: null,
    documentsCount: 0,
    updates: [],
    transactions: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      setError(
        "The owner dashboard is temporarily unavailable while we update our systems. Please try again shortly.",
      );
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const { data } = await supabase.auth.getUser();
        const currentUser = (data as { user: { id: string; email?: string } | null } | null)
          ?.user;
        setUser(currentUser ?? null);

        if (!currentUser) {
          return;
        }

        const { data: customer, error: customerError } = await supabase
          .from("customers")
          .select("id, name, email, plan_type, status, property_city, property_area, property_type")
          .eq("auth_user_id", currentUser.id)
          .single();

        if (customerError || !customer) {
          setData({
            customer: null,
            documentsCount: 0,
            updates: [],
            transactions: [],
          });
          return;
        }

        const [documentsRes, updatesRes, transactionsRes] = await Promise.all([
          supabase
            .from("customer_documents")
            .select("id", { count: "exact", head: true })
            .eq("customer_id", customer.id),
          supabase
            .from("property_updates")
            .select("id, title, body, created_at")
            .eq("customer_id", customer.id)
            .order("created_at", { ascending: false })
            .limit(3),
          supabase
            .from("transactions")
            .select("id, type, amount, date")
            .eq("customer_id", customer.id)
            .order("date", { ascending: false })
            .limit(3),
        ]);

        setData({
          customer,
          documentsCount: documentsRes.count ?? 0,
          updates: updatesRes.data ?? [],
          transactions: transactionsRes.data ?? [],
        });
      } catch {
        setError("We couldn’t load your account details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-stone-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-stone-600 text-center max-w-md">{error}</p>
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
    <div>
      <h2 className="text-xl font-semibold text-stone-900">
        Welcome back,{" "}
        {extractFirstName(data.customer?.name, user.email)}
      </h2>
      <p className="mt-1 text-stone-600">
        This is your single view for property management, documents, and communication.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="p-5 rounded-2xl border border-stone-200 bg-white">
          <p className="text-sm text-stone-500">Plan</p>
          <p className="mt-1 font-semibold text-stone-900">{data.customer?.plan_type ?? "Not set"}</p>
        </article>
        <article className="p-5 rounded-2xl border border-stone-200 bg-white">
          <p className="text-sm text-stone-500">Account status</p>
          <p className="mt-1 font-semibold text-stone-900">{data.customer?.status ?? "Prospect"}</p>
        </article>
        <article className="p-5 rounded-2xl border border-stone-200 bg-white">
          <p className="text-sm text-stone-500">Documents</p>
          <p className="mt-1 font-semibold text-stone-900">{data.documentsCount}</p>
        </article>
        <article className="p-5 rounded-2xl border border-stone-200 bg-white">
          <p className="text-sm text-stone-500">Property</p>
          <p className="mt-1 font-semibold text-stone-900">
            {[data.customer?.property_area, data.customer?.property_city].filter(Boolean).join(", ") ||
              "Pending"}
          </p>
        </article>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Link
          href="/dashboard/property"
          className="block p-6 rounded-2xl border border-stone-200 bg-white hover:border-accent-300 hover:shadow-md transition-all"
        >
          <h3 className="font-semibold text-stone-900">Property details</h3>
          <p className="mt-2 text-sm text-stone-600">
            Address, type, and occupancy details for your managed property.
          </p>
        </Link>
        <Link
          href="/dashboard/documents"
          className="block p-6 rounded-2xl border border-stone-200 bg-white hover:border-accent-300 hover:shadow-md transition-all"
        >
          <h3 className="font-semibold text-stone-900">Contracts and documents</h3>
          <p className="mt-2 text-sm text-stone-600">
            Agreements, signed contracts, and other related files.
          </p>
        </Link>
        <Link
          href="/dashboard/communication"
          className="block p-6 rounded-2xl border border-stone-200 bg-white hover:border-accent-300 hover:shadow-md transition-all"
        >
          <h3 className="font-semibold text-stone-900">Communication</h3>
          <p className="mt-2 text-sm text-stone-600">
            Preferred contact channels and a timeline of property updates.
          </p>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="p-6 rounded-2xl border border-stone-200 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-stone-900">Recent property updates</h3>
            <Link href="/dashboard/updates" className="text-sm text-accent-600 hover:underline">
              View all
            </Link>
          </div>
          {data.updates.length === 0 ? (
            <p className="mt-3 text-sm text-stone-500">No updates yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {data.updates.map((update) => (
                <li key={update.id} className="pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                  <p className="font-medium text-stone-800">{update.title}</p>
                  <p className="mt-1 text-sm text-stone-600 line-clamp-2">
                    {update.body ?? "No details shared for this update."}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="p-6 rounded-2xl border border-stone-200 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-stone-900">Recent transactions</h3>
            <Link href="/dashboard/transactions" className="text-sm text-accent-600 hover:underline">
              View all
            </Link>
          </div>
          {data.transactions.length === 0 ? (
            <p className="mt-3 text-sm text-stone-500">No transactions yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {data.transactions.map((txn) => (
                <li key={txn.id} className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium capitalize text-stone-800">{txn.type}</p>
                    <p className="mt-1 text-sm text-stone-600">{txn.date}</p>
                  </div>
                  <p className="font-semibold text-stone-900">
                    {txn.amount ? `INR ${Number(txn.amount).toLocaleString("en-IN")}` : "-"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="mt-8 p-6 rounded-2xl border border-amber-200 bg-amber-50">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-stone-900">Recommended services for your property</h3>
            <p className="mt-1 text-sm text-stone-700">
              Discover add-on services and partner offers tailored for homeowners.
            </p>
          </div>
          <Link
            href="/dashboard/services"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-accent-600 text-white text-sm font-medium hover:bg-accent-500"
          >
            Explore services
          </Link>
        </div>
      </section>
    </div>
  );
}
