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

type CustomerNote = {
  id: string;
  body: string;
  is_customer_visible: boolean;
  author_email: string | null;
  created_at: string | null;
};

type TimelineItem = {
  id: string;
  kind: "update" | "note";
  title: string;
  body: string;
  created_at: string;
  meta?: string | null;
};

export default function CommunicationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<CommunicationProfile | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

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
          setTimeline([]);
          return;
        }

        const { data: customer } = await supabase
          .from("customers")
          .select("id, email, phone, whatsapp, preferred_contact")
          .eq("auth_user_id", user.id)
          .single();

        if (!customer) {
          setProfile(null);
          setTimeline([]);
          return;
        }

        const [{ data: updateData }, { data: notesData }] = await Promise.all([
          supabase
            .from("property_updates")
            .select("id, title, body, created_at")
            .eq("customer_id", customer.id)
            .order("created_at", { ascending: false })
            .limit(10),
          supabase
            .from("customer_notes")
            .select("id, body, is_customer_visible, author_email, created_at")
            .eq("customer_id", customer.id)
            .eq("is_customer_visible", true)
            .order("created_at", { ascending: false })
            .limit(10),
        ]);

        const updatesItems: TimelineItem[] =
          (updateData as PropertyUpdate[] | null)?.map((update) => ({
            id: update.id,
            kind: "update",
            title: update.title,
            body: update.body ?? "No additional details shared.",
            created_at: update.created_at,
          })) ?? [];

        const noteItems: TimelineItem[] =
          (notesData as CustomerNote[] | null)?.map((note) => ({
            id: note.id,
            kind: "note",
            title: "Note from RelyBricks team",
            body: note.body,
            created_at: note.created_at ?? new Date().toISOString(),
            meta: note.author_email,
          })) ?? [];

        const merged = [...updatesItems, ...noteItems].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        setProfile(customer);
        setTimeline(merged);
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
        {timeline.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">No communication timeline entries yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {timeline.map((item) => (
              <li key={item.id} className="pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        item.kind === "note"
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : "bg-stone-100 text-stone-700 border border-stone-200"
                      }`}
                    >
                      {item.kind === "note" ? "Note" : "Update"}
                    </span>
                    <p className="font-medium text-stone-900">{item.title}</p>
                  </div>
                  <span className="text-xs text-stone-500">
                    {new Date(item.created_at).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-600">{item.body}</p>
                {item.kind === "note" && item.meta && (
                  <p className="mt-1 text-xs text-stone-500">From: {item.meta}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
