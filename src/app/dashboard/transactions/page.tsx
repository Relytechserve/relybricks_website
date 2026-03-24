"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase";
import { propertyDisplayTitle, type PortalPropertyRow } from "@/lib/portal-properties";

type Transaction = {
  id: string;
  type: "renewal" | "payment" | "other";
  amount: number | null;
  description: string | null;
  date: string;
  customer_property_id: string | null;
};

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [properties, setProperties] = useState<PortalPropertyRow[]>([]);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setError("Transactions are temporarily unavailable.");
      setLoading(false);
      return;
    }

    async function loadTransactions() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = (userData as { user: { id: string } | null } | null)?.user;
        if (!user) {
          setTransactions([]);
          setProperties([]);
          return;
        }

        const { data: customer } = await supabase
          .from("customers")
          .select("id")
          .eq("auth_user_id", user.id)
          .single();

        if (!customer) {
          setTransactions([]);
          setProperties([]);
          return;
        }

        const customerId = (customer as { id: string }).id;

        const [txRes, propsRes] = await Promise.all([
          supabase
            .from("transactions")
            .select("id, type, amount, description, date, customer_property_id")
            .eq("customer_id", customerId)
            .order("date", { ascending: false }),
          supabase
            .from("customer_properties")
            .select("id, full_address, city, area, property_type, property_status, property_sqft")
            .eq("customer_id", customerId)
            .order("created_at", { ascending: true }),
        ]);

        if (txRes.error) {
          setError("Unable to load transactions.");
          return;
        }

        setTransactions((txRes.data ?? []) as Transaction[]);
        setProperties((propsRes.data ?? []) as PortalPropertyRow[]);
      } catch {
        setError("Unable to load transactions.");
      } finally {
        setLoading(false);
      }
    }

    void loadTransactions();
  }, []);

  const propertyLabel = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of properties) {
      map.set(p.id, propertyDisplayTitle(p));
    }
    return (id: string | null) => {
      if (!id) return "All properties";
      return map.get(id) ?? "Property";
    };
  }, [properties]);

  const totalPaid = useMemo(
    () =>
      transactions.reduce((total, item) => total + (item.amount ? Number(item.amount) : 0), 0),
    [transactions],
  );

  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Transaction history</h1>
      <p className="mt-2 text-stone-600">
        Renewals, payments, and related activity. Entries can be linked to a specific property when
        your administrator records them.
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-stone-500">Loading transactions...</p>
      ) : error ? (
        <p className="mt-6 text-sm text-red-600">{error}</p>
      ) : transactions.length === 0 ? (
        <p className="mt-6 text-sm text-stone-500">No transactions yet.</p>
      ) : (
        <div className="mt-8 space-y-5">
          <div className="p-5 rounded-2xl border border-stone-200 bg-white flex items-center justify-between">
            <p className="text-sm text-stone-600">Total billed amount</p>
            <p className="text-lg font-semibold text-stone-900">
              INR {totalPaid.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-stone-600 uppercase">Date</th>
                  <th className="px-4 py-3 text-xs font-semibold text-stone-600 uppercase">Property</th>
                  <th className="px-4 py-3 text-xs font-semibold text-stone-600 uppercase">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold text-stone-600 uppercase">Description</th>
                  <th className="px-4 py-3 text-xs font-semibold text-stone-600 uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3 text-sm text-stone-700">
                      {new Date(transaction.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-700">
                      {propertyLabel(transaction.customer_property_id)}
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-700 capitalize">{transaction.type}</td>
                    <td className="px-4 py-3 text-sm text-stone-700">
                      {transaction.description ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-900 font-medium text-right">
                      {transaction.amount ? `INR ${Number(transaction.amount).toLocaleString("en-IN")}` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
