import { createBrowserClient } from "@supabase/ssr";

export type BrowserSupabaseClient = ReturnType<typeof createBrowserClient>;

export function createClient(): BrowserSupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (typeof window !== "undefined") {
      // Surface a clear error in the browser console without breaking the UI.
      // The caller should handle the `null` client case gracefully.
      console.error("Missing Supabase env vars for RelyBricks website.");
    }
    return null;
  }

  return createBrowserClient(url, key);
}

