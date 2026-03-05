/**
 * Seed customers from local CSV (export from Google Sheet)
 * 1. File > Download > CSV, save as scripts/customers.csv
 * 2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local
 * 3. Run: node scripts/seed-from-csv.mjs
 */

import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

import { createClient } from "@supabase/supabase-js";

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((h, j) => { row[h] = values[j] ?? ""; });
    return row;
  });
}

function parseDate(val) {
  if (!val || typeof val !== "string") return null;
  const months = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
  const m = String(val).match(/(\w{3})[-/](\d{2,4})/i);
  if (!m) return null;
  let year = parseInt(m[2], 10);
  if (year < 100) year += year < 50 ? 2000 : 1900;
  return `${year}-${String(months[m[1]] || 1).padStart(2, "0")}-01`;
}

function parseNum(v) {
  if (v === "" || v == null) return null;
  const n = parseFloat(String(v).replace(/[^\d.-]/g, ""));
  return isNaN(n) ? null : n;
}

const mapCol = (r, ...names) => {
  for (const n of names) {
    const v = r[n];
    if (v !== undefined && v !== "" && v !== null) return String(v).trim();
  }
  return null;
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Add SUPABASE_SERVICE_ROLE_KEY to .env.local (Supabase Dashboard > Settings > API)");
    process.exit(1);
  }
  let text;
  try {
    text = readFileSync(join(__dirname, "customers.csv"), "utf8");
  } catch {
    console.error("Create scripts/customers.csv - export your Google Sheet as CSV first.");
    process.exit(1);
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const rows = parseCSV(text);
  let inserted = 0, skipped = 0;
  for (const row of rows) {
    const name = mapCol(row, "Customer Name", "Customer name");
    const email = mapCol(row, "Email", "email");
    if (!name || !email) { skipped++; continue; }
    const customer = {
      name, email,
      phone: mapCol(row, "Contact Number") || null,
      residing_country: mapCol(row, "Billing Address", "Customer Location") || null,
      property_city: mapCol(row, "Property City") || null,
      property_area: mapCol(row, "Property Location") || null,
      property_status: mapCol(row, "Property Status") || null,
      plan_type: mapCol(row, "Package") || null,
      status: mapCol(row, "Customer Status") || "Prospect",
      renewal_status: mapCol(row, "Renewal Status") || null,
      renewal_date: parseDate(mapCol(row, "Renewal Date")),
      next_renewal_date: parseDate(mapCol(row, "Next Renewal Date")),
      subscription_date: parseDate(mapCol(row, "Subscription Date")),
      package_revenue: parseNum(mapCol(row, "Package Revenue")),
      billed_amount: parseNum(mapCol(row, "Billed")),
      working_cost: parseNum(mapCol(row, "Working Cost")),
      notes: mapCol(row, "Comments") || null,
    };
    const { error } = await supabase.from("customers").insert(customer);
    if (error) { console.warn("Skip:", name, error.message); skipped++; }
    else inserted++;
  }
  console.log("Done. Inserted:", inserted, "Skipped:", skipped);
}

main().catch((e) => { console.error(e); process.exit(1); });
