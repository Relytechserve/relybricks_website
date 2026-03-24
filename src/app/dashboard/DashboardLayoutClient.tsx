"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/property", label: "Properties" },
  { href: "/dashboard/documents", label: "Documents" },
  { href: "/dashboard/updates", label: "Updates" },
  { href: "/dashboard/communication", label: "Communication" },
  { href: "/dashboard/transactions", label: "Transactions" },
  { href: "/dashboard/services", label: "Services" },
];

export default function DashboardLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      router.replace("/login");
      return;
    }

    async function guardDashboardRoute() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }

      const userId = data.session.user.id;

      const [profileRes, customerRes] = await Promise.all([
        supabase.from("profiles").select("role, customer_id").eq("user_id", userId).maybeSingle(),
        supabase.from("customers").select("id").eq("auth_user_id", userId).maybeSingle(),
      ]);

      const isCustomerRole = profileRes.data?.role === "customer";
      const hasCustomerRecord = Boolean(customerRes.data?.id);
      const isLinked =
        !profileRes.data?.customer_id || profileRes.data.customer_id === customerRes.data?.id;

      if (!isCustomerRole || !hasCustomerRecord || !isLinked) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      setCheckingAuth(false);
    }

    void guardDashboardRoute();
  }, [router]);

  if (checkingAuth) {
    return (
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-stone-500">Checking your session...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-stone-900">Customer portal</h1>
          <p className="text-sm text-stone-600">
            Track your properties, documents, updates, and support in one place.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {dashboardLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent-600 text-white"
                    : "bg-white text-stone-700 border border-stone-200 hover:border-accent-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
