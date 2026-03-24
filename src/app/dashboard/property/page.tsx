"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

type PortalTransaction = {
  id: string;
  type: "renewal" | "payment" | "other";
  amount: number | null;
  description: string | null;
  date: string;
  customer_property_id: string | null;
};

type VisibleNote = {
  id: string;
  body: string;
  author_email: string | null;
  created_at: string | null;
  customer_property_id: string | null;
};

type PortalPropertyTab = "details" | "activity" | "messages";

export default function PropertyPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contact, setContact] = useState<CustomerContact | null>(null);
  const [properties, setProperties] = useState<PortalPropertyRow[]>([]);
  const [legacy, setLegacy] = useState<CustomerLegacyProperty | null>(null);
  const [transactions, setTransactions] = useState<PortalTransaction[]>([]);
  const [visibleNotes, setVisibleNotes] = useState<VisibleNote[]>([]);
  const [propertyCardOpen, setPropertyCardOpen] = useState<Record<string, boolean>>({});
  const [propertyCardTab, setPropertyCardTab] = useState<Record<string, PortalPropertyTab>>({});

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
          setTransactions([]);
          setVisibleNotes([]);
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

        const [propsRes, txRes, notesRes] = await Promise.all([
          supabase
            .from("customer_properties")
            .select(
              "id, full_address, city, area, property_type, property_status, property_sqft, plan_type, subscription_date, next_renewal_date, package_revenue",
            )
            .eq("customer_id", row.id)
            .order("created_at", { ascending: true }),
          supabase
            .from("transactions")
            .select("id, type, amount, description, date, customer_property_id")
            .eq("customer_id", row.id)
            .order("date", { ascending: false })
            .limit(40),
          supabase
            .from("customer_notes")
            .select("id, body, author_email, created_at, customer_property_id")
            .eq("customer_id", row.id)
            .eq("is_customer_visible", true)
            .order("created_at", { ascending: false })
            .limit(40),
        ]);

        if (propsRes.error) {
          setProperties([]);
        } else {
          setProperties((propsRes.data ?? []) as PortalPropertyRow[]);
        }
        setTransactions((txRes.data ?? []) as PortalTransaction[]);
        setVisibleNotes(
          (notesRes.data ?? []).map((row: Record<string, unknown>) => {
            const n = row as unknown as VisibleNote;
            return {
              ...n,
              customer_property_id: n.customer_property_id ?? null,
            };
          }),
        );
      } catch {
        setError("Unable to load your property profile.");
      } finally {
        setLoading(false);
      }
    }

    void loadProperty();
  }, []);

  useEffect(() => {
    if (properties.length <= 1) return;
    setPropertyCardOpen((prev) => {
      const next = { ...prev };
      let changed = false;
      properties.forEach((p, i) => {
        if (!(p.id in next)) {
          next[p.id] = i === 0;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [properties]);

  const txsByPropertyId = useMemo(() => {
    const map = new Map<string, PortalTransaction[]>();
    for (const t of transactions) {
      if (!t.customer_property_id) continue;
      const list = map.get(t.customer_property_id) ?? [];
      list.push(t);
      map.set(t.customer_property_id, list);
    }
    return map;
  }, [transactions]);

  const legacyTransactions = useMemo(
    () => transactions.filter((t) => !t.customer_property_id),
    [transactions],
  );

  const accountVisibleNotes = useMemo(
    () => visibleNotes.filter((n) => !n.customer_property_id),
    [visibleNotes],
  );

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

  function formatNoteDate(value: string | null) {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Your properties hub</h1>
      <p className="mt-2 text-stone-600">
        Each card is one property with tabs for details, activity, and messages. If you have several
        properties, you can collapse cards from the arrow beside the title. For documents and the full
        transaction list, use the links in the navigation.
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
          <h2 className="font-semibold text-stone-900">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm text-accent-600">
            <li>
              <Link href="/dashboard/transactions" className="hover:underline">
                Full transaction history
              </Link>
            </li>
            <li>
              <Link href="/dashboard/documents" className="hover:underline">
                Contracts & documents
              </Link>
            </li>
            <li>
              <Link href="/dashboard/communication" className="hover:underline">
                Communication center
              </Link>
            </li>
          </ul>
        </section>
      </div>

      {hasRows ? (
        <div className="mt-10 space-y-8">
          {properties.map((p, index) => {
            const multiProp = properties.length > 1;
            const cardOpen =
              !multiProp ||
              (propertyCardOpen[p.id] ?? properties[0]?.id === p.id);
            const tab = propertyCardTab[p.id] ?? "details";
            const propTxs = (txsByPropertyId.get(p.id) ?? []).slice(0, 6);
            const propertyMessages = visibleNotes.filter(
              (n) => n.customer_property_id === p.id,
            );
            return (
              <article
                key={p.id}
                className="rounded-2xl border border-stone-200 border-l-4 border-l-accent-500 bg-gradient-to-br from-stone-50/60 to-white p-6 shadow-sm"
              >
                <header className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-200 pb-3">
                  <div className="flex items-start gap-2 min-w-0">
                    {multiProp ? (
                      <button
                        type="button"
                        aria-expanded={cardOpen}
                        onClick={() =>
                          setPropertyCardOpen((prev) => {
                            const open =
                              prev[p.id] ?? properties[0]?.id === p.id;
                            return { ...prev, [p.id]: !open };
                          })
                        }
                        className="mt-1 shrink-0 rounded p-1 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                      >
                        <span className="sr-only">
                          {cardOpen ? "Collapse property" : "Expand property"}
                        </span>
                        <span aria-hidden>{cardOpen ? "▼" : "▶"}</span>
                      </button>
                    ) : null}
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                        Property {index + 1}
                      </p>
                      <h2 className="text-lg font-semibold text-stone-900">
                        {propertyDisplayTitle(p)}
                      </h2>
                      <p className="text-sm text-stone-600 mt-1">
                        Renews{" "}
                        <span className="font-medium text-stone-900">
                          {formatRenewalDate(p.next_renewal_date)}
                        </span>
                        {" · "}
                        Plan{" "}
                        <span className="font-medium text-stone-900">{p.plan_type ?? "—"}</span>
                      </p>
                    </div>
                  </div>
                </header>

                {cardOpen ? (
                  <>
                    <div
                      role="tablist"
                      className="mt-4 flex flex-wrap gap-1 border-b border-stone-200"
                    >
                      {(
                        [
                          ["details", "Property details"],
                          ["activity", "Activity"],
                          ["messages", "Messages"],
                        ] as const
                      ).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          role="tab"
                          aria-selected={tab === key}
                          onClick={() =>
                            setPropertyCardTab((prev) => ({ ...prev, [p.id]: key }))
                          }
                          className={`px-3 py-2 text-sm font-medium rounded-t-md border-b-2 -mb-px transition-colors ${
                            tab === key
                              ? "border-accent-600 text-accent-800 bg-white"
                              : "border-transparent text-stone-500 hover:text-stone-800"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="pt-4">
                      {tab === "details" ? (
                        <div className="grid gap-6 lg:grid-cols-2">
                          <div>
                            <h3 className="text-sm font-medium text-stone-700">Location & unit</h3>
                            <dl className="mt-2 space-y-2 text-sm">
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
                                <dd className="text-stone-900 font-medium">
                                  {p.property_status ?? "—"}
                                </dd>
                              </div>
                            </dl>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-stone-700">Subscription</h3>
                            <dl className="mt-2 space-y-2 text-sm">
                              <div className="flex justify-between gap-4">
                                <dt className="text-stone-500">Plan</dt>
                                <dd className="text-stone-900 font-medium text-right">
                                  {p.plan_type ?? "—"}
                                </dd>
                              </div>
                              <div className="flex justify-between gap-4">
                                <dt className="text-stone-500">Start</dt>
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
                                    ₹
                                    {Number(p.package_revenue).toLocaleString("en-IN", {
                                      maximumFractionDigits: 0,
                                    })}
                                  </dd>
                                </div>
                              )}
                            </dl>
                          </div>
                        </div>
                      ) : tab === "activity" ? (
                        <div>
                          <h3 className="text-sm font-medium text-stone-700">
                            Recent activity (this property)
                          </h3>
                          {propTxs.length === 0 ? (
                            <p className="mt-2 text-sm text-stone-500">
                              No recent entries linked to this property.
                            </p>
                          ) : (
                            <ul className="mt-2 space-y-2">
                              {propTxs.map((tx) => (
                                <li
                                  key={tx.id}
                                  className="flex flex-wrap items-center justify-between gap-2 text-sm rounded-lg bg-stone-50 px-3 py-2"
                                >
                                  <span className="capitalize text-stone-800 font-medium">
                                    {tx.type}
                                  </span>
                                  <span className="text-stone-500 text-xs">
                                    {new Date(tx.date).toLocaleDateString("en-IN")}
                                  </span>
                                  <span className="text-stone-900 font-medium ml-auto">
                                    {tx.amount != null
                                      ? `₹${Number(tx.amount).toLocaleString("en-IN")}`
                                      : "—"}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <p className="mt-2 text-xs text-stone-500">
                            <Link
                              href="/dashboard/transactions"
                              className="text-accent-600 hover:underline"
                            >
                              View all transactions
                            </Link>
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-sm font-medium text-stone-700">
                            Messages for this property
                          </h3>
                          <p className="mt-1 text-xs text-stone-500">
                            Notes your team shared for this address (visible to you only when marked
                            customer-visible).
                          </p>
                          {propertyMessages.length === 0 ? (
                            <p className="mt-2 text-sm text-stone-500">No messages yet.</p>
                          ) : (
                            <ul className="mt-3 space-y-3">
                              {propertyMessages.map((note) => (
                                <li
                                  key={note.id}
                                  className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm"
                                >
                                  <p className="text-xs text-stone-500">
                                    {formatNoteDate(note.created_at)}
                                    {note.author_email ? ` · ${note.author_email}` : ""}
                                  </p>
                                  <p className="mt-1 text-stone-800 whitespace-pre-wrap">
                                    {note.body}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : legacy ? (
        <section className="mt-10 p-6 rounded-2xl border border-stone-200 bg-white space-y-4">
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

      {legacyTransactions.length > 0 && (
        <section className="mt-8 p-6 rounded-2xl border border-amber-200 bg-amber-50/30">
          <h2 className="font-semibold text-stone-900">Account-wide activity</h2>
          <p className="text-sm text-stone-600 mt-1">
            These entries are not linked to a specific property record.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {legacyTransactions.slice(0, 8).map((tx) => (
              <li
                key={tx.id}
                className="flex flex-wrap justify-between gap-2 rounded-lg bg-white border border-stone-100 px-3 py-2"
              >
                <span className="capitalize font-medium">{tx.type}</span>
                <span className="text-stone-500 text-xs">
                  {new Date(tx.date).toLocaleDateString("en-IN")}
                </span>
                <span className="font-medium">
                  {tx.amount != null ? `₹${Number(tx.amount).toLocaleString("en-IN")}` : "—"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 p-6 rounded-2xl border border-stone-200 bg-white">
        <h2 className="font-semibold text-stone-900">Account-wide messages</h2>
        <p className="mt-1 text-sm text-stone-600">
          Notes visible to you that apply to your whole account (not tied to one property). Property-specific
          messages are under each property card → Messages.
        </p>
        {accountVisibleNotes.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">No account-wide messages yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {accountVisibleNotes.map((note) => (
              <li
                key={note.id}
                className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3 text-sm"
              >
                <p className="text-xs text-stone-500">
                  {formatNoteDate(note.created_at)}
                  {note.author_email ? ` · ${note.author_email}` : ""}
                </p>
                <p className="mt-1 text-stone-800 whitespace-pre-wrap">{note.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
