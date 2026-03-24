"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import {
  formatRenewalDate,
  propertyDisplayTitle,
  type PortalPropertyRow,
} from "@/lib/portal-properties";

type CustomerContact = {
  name: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  preferred_contact: string | null;
};

/** Legacy single-property fields still stored on `customers` */
type CustomerLegacyProperty = {
  property_city: string | null;
  property_area: string | null;
  property_full_address: string | null;
  property_type: string | null;
  property_sqft: number | null;
  property_status: string | null;
  plan_type: string | null;
  next_renewal_date: string | null;
  renewal_date: string | null;
};

export default function PropertyPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contact, setContact] = useState<CustomerContact | null>(null);
  const [properties, setProperties] = useState<PortalPropertyRow[]>([]);
  const [legacy, setLegacy] = useState<CustomerLegacyProperty | null>(null);

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
          setContact(null);
          setProperties([]);
          setLegacy(null);
          return;
        }

        const { data: customer, error: customerError } = await supabase
          .from("customers")
          .select(
            "id, name, email, phone, whatsapp, preferred_contact, property_city, property_area, property_full_address, property_type, property_sqft, property_status, plan_type, next_renewal_date, renewal_date",
          )
          .eq("auth_user_id", user.id)
          .single();

        if (customerError || !customer) {
          setError("Unable to load your property profile.");
          return;
        }

        const row = customer as CustomerContact & CustomerLegacyProperty & { id: string };

        setContact({
          name: row.name,
          email: row.email,
          phone: row.phone,
          whatsapp: row.whatsapp,
          preferred_contact: row.preferred_contact,
        });

        setLegacy({
          property_city: row.property_city,
          property_area: row.property_area,
          property_full_address: row.property_full_address,
          property_type: row.property_type,
          property_sqft: row.property_sqft,
          property_status: row.property_status,
          plan_type: row.plan_type,
          next_renewal_date: row.next_renewal_date,
          renewal_date: row.renewal_date,
        });

        const { data: propsData, error: propsError } = await supabase
          .from("customer_properties")
          .select(
            "id, full_address, city, area, property_type, property_status, property_sqft, plan_type, subscription_date, next_renewal_date, package_revenue",
          )
          .eq("customer_id", row.id)
          .order("created_at", { ascending: true });

        if (propsError) {
          setProperties([]);
        } else {
          setProperties((propsData ?? []) as PortalPropertyRow[]);
        }
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

  if (!contact) {
    return <p className="text-sm text-stone-500">No property profile found for this account.</p>;
  }

  const hasRows = properties.length > 0;

  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Properties & subscriptions</h1>
      <p className="mt-2 text-stone-600">
        Your contact details and each managed property with its own plan and renewal schedule.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="p-6 rounded-2xl border border-stone-200 bg-white">
          <h2 className="font-semibold text-stone-900">Your profile</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Name</dt>
              <dd className="text-stone-900 font-medium">{contact.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Email</dt>
              <dd className="text-stone-900 font-medium">{contact.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Phone</dt>
              <dd className="text-stone-900 font-medium">{contact.phone ?? "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">WhatsApp</dt>
              <dd className="text-stone-900 font-medium">{contact.whatsapp ?? "-"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Preferred contact</dt>
              <dd className="text-stone-900 font-medium capitalize">
                {contact.preferred_contact ?? "-"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="p-6 rounded-2xl border border-stone-200 bg-white flex flex-col justify-center">
          <h2 className="font-semibold text-stone-900">How subscriptions work</h2>
          <p className="mt-3 text-sm text-stone-600">
            If you have more than one property with RelyBricks, each one can be on its own annual plan
            with its own renewal date. Renewals and payments shown in{" "}
            <span className="font-medium text-stone-800">Transactions</span> may be tagged to a
            specific property when your administrator records them.
          </p>
        </section>
      </div>

      {hasRows ? (
        <div className="mt-8 space-y-6">
          {properties.map((p, index) => (
            <section
              key={p.id}
              className="p-6 rounded-2xl border border-stone-200 bg-white space-y-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold text-stone-900">
                  Property {index + 1}
                  <span className="font-normal text-stone-500 text-sm ml-2">
                    {propertyDisplayTitle(p)}
                  </span>
                </h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-stone-700">Location & unit</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500">Address</dt>
                      <dd className="text-stone-900 font-medium text-right">
                        {p.full_address?.trim() || "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500">Area / city</dt>
                      <dd className="text-stone-900 font-medium text-right">
                        {[p.area, p.city].filter(Boolean).join(", ") || "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500">Type</dt>
                      <dd className="text-stone-900 font-medium capitalize">
                        {p.property_type ?? "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500">Size</dt>
                      <dd className="text-stone-900 font-medium">
                        {p.property_sqft ? `${p.property_sqft} sqft` : "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500">Occupancy</dt>
                      <dd className="text-stone-900 font-medium">{p.property_status ?? "—"}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-stone-700">Subscription</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500">Plan</dt>
                      <dd className="text-stone-900 font-medium text-right">
                        {p.plan_type ?? "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500">Subscription start</dt>
                      <dd className="text-stone-900 font-medium text-right">
                        {formatRenewalDate(p.subscription_date)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500">Next renewal</dt>
                      <dd className="text-stone-900 font-medium text-right">
                        {formatRenewalDate(p.next_renewal_date)}
                      </dd>
                    </div>
                    {p.package_revenue != null && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-stone-500">Annual package</dt>
                        <dd className="text-stone-900 font-medium text-right">
                          ₹{Number(p.package_revenue).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : legacy ? (
        <section className="mt-8 p-6 rounded-2xl border border-stone-200 bg-white space-y-4">
          <h2 className="font-semibold text-stone-900">Property on file</h2>
          <p className="text-sm text-stone-600">
            We don’t have separate property records yet; the details below come from your main
            account profile.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-stone-700">Location & unit</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Address</dt>
                  <dd className="text-stone-900 font-medium text-right">
                    {legacy.property_full_address?.trim() || "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Area / city</dt>
                  <dd className="text-stone-900 font-medium text-right">
                    {[legacy.property_area, legacy.property_city].filter(Boolean).join(", ") || "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Type</dt>
                  <dd className="text-stone-900 font-medium capitalize">
                    {legacy.property_type ?? "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Size</dt>
                  <dd className="text-stone-900 font-medium">
                    {legacy.property_sqft ? `${legacy.property_sqft} sqft` : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Occupancy</dt>
                  <dd className="text-stone-900 font-medium">{legacy.property_status ?? "—"}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-sm font-medium text-stone-700">Plan and renewal</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Plan</dt>
                  <dd className="text-stone-900 font-medium text-right">
                    {legacy.plan_type ?? "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Renewal date</dt>
                  <dd className="text-stone-900 font-medium text-right">
                    {formatRenewalDate(legacy.next_renewal_date ?? legacy.renewal_date)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
