"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type CustomerProperty = {
  name: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  preferred_contact: string | null;
  property_city: string | null;
  property_area: string | null;
  property_full_address: string | null;
  property_type: string | null;
  property_sqft: number | null;
  property_status: string | null;
  plan_type: string | null;
  renewal_date: string | null;
};

export default function PropertyPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<CustomerProperty | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setError("Property details are temporarily unavailable.");
      setLoading(false);
      return;
    }

    async function loadProperty() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = (userData as { user: { id: string } | null } | null)?.user;
        if (!user) {
          setProfile(null);
          return;
        }

        const { data: customer, error: customerError } = await supabase
          .from("customers")
          .select(
            "name, email, phone, whatsapp, preferred_contact, property_city, property_area, property_full_address, property_type, property_sqft, property_status, plan_type, renewal_date",
          )
          .eq("auth_user_id", user.id)
          .single();

        if (customerError || !customer) {
          setError("Unable to load your property profile.");
          return;
        }

        setProfile(customer);
      } catch {
        setError("Unable to load your property profile.");
      } finally {
        setLoading(false);
      }
    }

    void loadProperty();
  }, []);

  if (loading) {
    return <p className="text-sm text-stone-500">Loading property details...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!profile) {
    return <p className="text-sm text-stone-500">No property profile found for this account.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Property details</h1>
      <p className="mt-2 text-stone-600">Your profile, property information, and plan details.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="p-6 rounded-2xl border border-stone-200 bg-white">
          <h2 className="font-semibold text-stone-900">Customer profile</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Name</dt>
              <dd className="text-stone-900 font-medium">{profile.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Email</dt>
              <dd className="text-stone-900 font-medium">{profile.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Phone</dt>
              <dd className="text-stone-900 font-medium">{profile.phone ?? "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">WhatsApp</dt>
              <dd className="text-stone-900 font-medium">{profile.whatsapp ?? "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Preferred contact</dt>
              <dd className="text-stone-900 font-medium capitalize">
                {profile.preferred_contact ?? "-"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="p-6 rounded-2xl border border-stone-200 bg-white">
          <h2 className="font-semibold text-stone-900">Managed property</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Address</dt>
              <dd className="text-stone-900 font-medium text-right">
                {profile.property_full_address ?? "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Area / city</dt>
              <dd className="text-stone-900 font-medium text-right">
                {[profile.property_area, profile.property_city].filter(Boolean).join(", ") || "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Property type</dt>
              <dd className="text-stone-900 font-medium capitalize">{profile.property_type ?? "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Size</dt>
              <dd className="text-stone-900 font-medium">
                {profile.property_sqft ? `${profile.property_sqft} sqft` : "-"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Occupancy</dt>
              <dd className="text-stone-900 font-medium">{profile.property_status ?? "-"}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="mt-6 p-6 rounded-2xl border border-stone-200 bg-white">
        <h2 className="font-semibold text-stone-900">Plan and renewal</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-stone-200 p-4">
            <p className="text-sm text-stone-500">Active plan</p>
            <p className="mt-1 font-semibold text-stone-900">{profile.plan_type ?? "-"}</p>
          </article>
          <article className="rounded-xl border border-stone-200 p-4">
            <p className="text-sm text-stone-500">Renewal date</p>
            <p className="mt-1 font-semibold text-stone-900">
              {profile.renewal_date
                ? new Date(profile.renewal_date).toLocaleDateString("en-IN")
                : "-"}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
