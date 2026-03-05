/**
 * Seed customers from Google Sheet CSV
 * 
 * 1. Make your sheet "Anyone with the link can view"
 * 2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local (from Supabase Dashboard > Settings > API)
 * 3. Run: node scripts/seed-from-sheet.mjs
 */

import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

import { createClient } from "@supabase/supabase-js";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1j6Tlq2Z-GEfAln4Y87NpCp2rNo0muipD/export?format=csv&gid=1805254230";

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((h, j) => {
      row[h] = values[j] ?? "";
    });
    rows.push(row);
  }
  return rows;
}

function parseDate(val) {
  if (!val || typeof val !== "string") return null;
  const s = val.trim();
  if (!s) return null;
  // Handle "Apr-24", "Apr-25", "Sep-2024", "Jan-24" etc
  const months = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
  const m = s.match(/(\w{3})[-/](\d{2,4})/i);
  if (m) {
    const month = months[m[1]] || 1;
    let year = parseInt(m[2], 10);
    if (year < 100) year += year < 50 ? 2000 : 1900;
    return `${year}-${String(month).padStart(2, "0")}-01`;
  }
  return null;
}

function parseNum(val) {
  if (val === "" || val == null) return null;
  const n = parseFloat(String(val).replace(/[^\d.-]/g, ""));
  return isNaN(n) ? null : n;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  console.log("Fetching Google Sheet...");
  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) {
    console.error("Failed to fetch sheet. Make sure it's shared as 'Anyone with the link can view'.");
    process.exit(1);
  }
  const text = await res.text();
  const rows = parseCSV(text);

  // Map sheet columns (header names may vary - adjust if needed)
  const mapCol = (r, ...names) => {
    for (const n of names) {
      const v = r[n];
      if (v !== undefined && v !== "" && v !== null) return v.trim();
    }
    return null;
  };

  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    const name = mapCol(row, "Customer Name", "Customer name");
    const email = mapCol(row, "Email", "email");
    if (!name || !email) {
      skipped++;
      continue;
    }

    const customer = {
      name,
      email,
      phone: mapCol(row, "Contact Number", "Contact number") || null,
      whatsapp: mapCol(row, "Contact Number") || null,
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
    if (error) {
      console.warn("Skip:", name, "-", error.message);
      skipped++;
    } else {
      inserted++;
    }
  }

  console.log(`Done. Inserted/updated: ${inserted}, Skipped: ${skipped}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
