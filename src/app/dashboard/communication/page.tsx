"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase";

type CommunicationProfile = {
  email: string;
  phone: string | null;
  whatsapp: string | null;
  preferred_contact: "email" | "whatsapp" | "both" | null;
};

type PropertyUpdate = {
  id: string;
  title: string;
  body: string | null;
  created_at: string;
};

export default function CommunicationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<CommunicationProfile | null>(null);
  const [updates, setUpdates] = useState<PropertyUpdate[]>([]);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setError("Communication details are temporarily unavailable.");
      setLoading(false);
      return;
    }

    async function loadCommunicationData() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = (userData as { user: { id: string } | null } | null)?.user;
        if (!user) {
          setProfile(null);
          setUpdates([]);
          return;
        }

        const { data: customer } = await supabase
          .from("customers")
          .select("id, email, phone, whatsapp, preferred_contact")
          .eq("auth_user_id", user.id)
          .single();

        if (!customer) {
          setProfile(null);
          setUpdates([]);
          return;
        }

        const { data: updateData } = await supabase
          .from("property_updates")
          .select("id, title, body, created_at")
          .eq("customer_id", customer.id)
          .order("created_at", { ascending: false })
          .limit(6);

        setProfile(customer);
        setUpdates(updateData ?? []);
      } catch {
        setError("Unable to load communication details.");
      } finally {
        setLoading(false);
      }
    }

    void loadCommunicationData();
  }, []);

  const whatsappLink = useMemo(() => {
    if (!profile?.whatsapp) {
      return null;
    }
    const digits = profile.whatsapp.replace(/\D/g, "");
    if (!digits) {
      return null;
    }
    return `https://wa.me/${digits}`;
  }, [profile?.whatsapp]);

  if (loading) {
    return <p className="text-sm text-stone-500">Loading communication center...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Communication</h1>
      <p className="mt-2 text-stone-600">
        Contact preferences and recent communication timeline with the property team.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="p-6 rounded-2xl border border-stone-200 bg-white">
          <h2 className="font-semibold text-stone-900">Preferred channels</h2>
          {profile ? (
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-stone-500">Preferred contact</span>
                <span className="font-medium text-stone-900 capitalize">
                  {profile.preferred_contact ?? "Not set"}
                </span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-stone-500">Email</span>
                <a className="font-medium text-accent-700 hover:underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-stone-500">Phone</span>
                <span className="font-medium text-stone-900">{profile.phone ?? "-"}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-stone-500">WhatsApp</span>
                {whatsappLink ? (
                  <a
                    className="font-medium text-accent-700 hover:underline"
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {profile.whatsapp}
                  </a>
                ) : (
                  <span className="font-medium text-stone-900">{profile.whatsapp ?? "-"}</span>
                )}
              </li>
            </ul>
          ) : (
            <p className="mt-4 text-sm text-stone-500">No communication profile available yet.</p>
          )}
        </section>

        <section className="p-6 rounded-2xl border border-stone-200 bg-white">
          <h2 className="font-semibold text-stone-900">Quick communication actions</h2>
          <div className="mt-4 grid gap-3">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}?subject=RelyBricks Property Support`}
                className="px-4 py-3 rounded-xl border border-stone-200 hover:border-accent-300 hover:bg-stone-50 transition-colors text-sm font-medium text-stone-800"
              >
                Email support team
              </a>
            )}
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl border border-stone-200 hover:border-accent-300 hover:bg-stone-50 transition-colors text-sm font-medium text-stone-800"
              >
                Chat on WhatsApp
              </a>
            )}
            <a
              href="/contact"
              className="px-4 py-3 rounded-xl border border-stone-200 hover:border-accent-300 hover:bg-stone-50 transition-colors text-sm font-medium text-stone-800"
            >
              Raise a service request
            </a>
          </div>
        </section>
      </div>

      <section className="mt-6 p-6 rounded-2xl border border-stone-200 bg-white">
        <h2 className="font-semibold text-stone-900">Recent timeline</h2>
        {updates.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">No communication timeline entries yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {updates.map((update) => (
              <li key={update.id} className="pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-medium text-stone-900">{update.title}</p>
                  <span className="text-xs text-stone-500">
                    {new Date(update.created_at).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-600">
                  {update.body ?? "No additional details shared."}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
