"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type PropertyUpdate = {
  id: string;
  title: string;
  body: string | null;
  created_at: string;
};

export default function UpdatesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updates, setUpdates] = useState<PropertyUpdate[]>([]);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setError("Property updates are temporarily unavailable.");
      setLoading(false);
      return;
    }

    async function loadUpdates() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = (userData as { user: { id: string } | null } | null)?.user;
        if (!user) {
          setUpdates([]);
          return;
        }

        const { data: customer } = await supabase
          .from("customers")
          .select("id")
          .eq("auth_user_id", user.id)
          .single();

        if (!customer) {
          setUpdates([]);
          return;
        }

        const { data: updatesData, error: updatesError } = await supabase
          .from("property_updates")
          .select("id, title, body, created_at")
          .eq("customer_id", customer.id)
          .order("created_at", { ascending: false });

        if (updatesError) {
          setError("Unable to load property updates.");
          return;
        }

        setUpdates(updatesData ?? []);
      } catch {
        setError("Unable to load property updates.");
      } finally {
        setLoading(false);
      }
    }

    void loadUpdates();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Property updates</h1>
      <p className="mt-2 text-stone-600">Timeline of maintenance, visits, and important activity.</p>

      {loading ? (
        <p className="mt-6 text-sm text-stone-500">Loading updates...</p>
      ) : error ? (
        <p className="mt-6 text-sm text-red-600">{error}</p>
      ) : updates.length === 0 ? (
        <p className="mt-6 text-sm text-stone-500">No updates yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {updates.map((update) => (
            <li key={update.id} className="p-5 rounded-2xl border border-stone-200 bg-white">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-semibold text-stone-900">{update.title}</h2>
                <span className="text-xs text-stone-500">
                  {new Date(update.created_at).toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-3 text-sm text-stone-700 whitespace-pre-wrap">
                {update.body ?? "No additional details provided."}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
