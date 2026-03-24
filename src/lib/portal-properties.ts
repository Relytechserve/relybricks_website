/** Property row from `customer_properties` for the customer portal */
export type PortalPropertyRow = {
  id: string;
  full_address: string | null;
  city: string | null;
  area: string | null;
  property_type: string | null;
  property_status: string | null;
  property_sqft: number | null;
  plan_type: string | null;
  subscription_date: string | null;
  next_renewal_date: string | null;
  package_revenue: number | null;
};

export function propertyDisplayTitle(
  p: Pick<PortalPropertyRow, "city" | "area" | "full_address">,
): string {
  const bits = [p.area, p.city].filter(Boolean);
  if (bits.length) return bits.join(", ");
  const addr = p.full_address?.trim();
  if (addr) return addr.length > 52 ? `${addr.slice(0, 49)}…` : addr;
  return "Property";
}

export function formatRenewalDate(value: string | null | undefined): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN");
}

export function earliestNextRenewalDate(
  properties: PortalPropertyRow[],
  customerLevelDate: string | null | undefined,
): string | null {
  const dates = properties
    .map((x) => x.next_renewal_date)
    .filter((d): d is string => Boolean(d));
  if (dates.length === 0) return customerLevelDate ?? null;
  dates.sort();
  return dates[0];
}
