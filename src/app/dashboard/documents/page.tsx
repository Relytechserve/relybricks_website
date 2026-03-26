"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { propertyDisplayTitle } from "@/lib/portal-properties";

type PortalDocument = {
  id: string;
  file_name: string;
  file_type: string | null;
  created_at: string;
  property_label: string;
  storage_path: string;
};

type PropertyAddressRow = {
  id: string;
  full_address: string | null;
  city: string | null;
  area: string | null;
};

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setError("Documents are temporarily unavailable. Please try again shortly.");
      setLoading(false);
      return;
    }

    async function loadDocuments() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = (userData as { user: { id: string } | null } | null)?.user;
        if (!user) {
          setDocuments([]);
          return;
        }

        const { data: customer } = await supabase
          .from("customers")
          .select("id")
          .eq("auth_user_id", user.id)
          .single();

        if (!customer) {
          setDocuments([]);
          return;
        }

        const { data: propsData, error: propsError } = await supabase
          .from("customer_properties")
          .select("id, full_address, city, area")
          .eq("customer_id", customer.id)
          .order("created_at", { ascending: true });

        if (propsError) {
          setError("Unable to load your documents right now.");
          return;
        }

        const propsList = (propsData ?? []) as PropertyAddressRow[];
        const propIds = propsList.map((p) => p.id);
        const propMap = new Map(
          propsList.map((p) => [
            p.id,
            propertyDisplayTitle({
              city: p.city,
              area: p.area,
              full_address: p.full_address,
            }),
          ]),
        );

        if (propIds.length === 0) {
          setDocuments([]);
          return;
        }

        const { data: docs, error: docsError } = await supabase
          .from("property_documents")
          .select("id, customer_property_id, file_name, storage_path, content_type, created_at")
          .in("customer_property_id", propIds)
          .order("created_at", { ascending: false });

        if (docsError) {
          setError("Unable to load your documents right now.");
          return;
        }

        type DocRow = {
          id: string;
          customer_property_id: string;
          file_name: string;
          storage_path: string;
          content_type: string | null;
          created_at: string;
        };

        const mapped: PortalDocument[] = (docs ?? []).map((row: DocRow) => ({
          id: row.id,
          file_name: row.file_name,
          file_type: row.content_type,
          created_at: row.created_at,
          storage_path: row.storage_path,
          property_label: propMap.get(row.customer_property_id) ?? "Property",
        }));

        setDocuments(mapped);
      } catch {
        setError("Unable to load your documents right now.");
      } finally {
        setLoading(false);
      }
    }

    void loadDocuments();
  }, []);

  const handleDownload = useCallback(async (doc: PortalDocument) => {
    const supabase = createClient();
    if (!supabase) return;
    setError(null);
    setDownloadingId(doc.id);
    try {
      const { data, error: signError } = await supabase.storage
        .from("property-documents")
        .createSignedUrl(doc.storage_path, 3600);
      if (signError || !data?.signedUrl) {
        setError("Could not open the file. Please try again.");
        return;
      }
      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } finally {
      setDownloadingId(null);
    }
  }, []);

  const contractDocuments = documents.filter((doc) =>
    /(contract|agreement|lease)/i.test(doc.file_name),
  );
  const otherDocuments = documents.filter(
    (doc) => !/(contract|agreement|lease)/i.test(doc.file_name),
  );

  function renderDocList(items: PortalDocument[]) {
    return (
      <ul className="mt-4 grid gap-3">
        {items.map((doc) => (
          <li
            key={doc.id}
            className="p-4 rounded-xl border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="font-medium text-stone-900">{doc.file_name}</p>
              <p className="text-xs text-stone-500 mt-1">
                {doc.file_type ?? "file"} · {doc.property_label} ·{" "}
                {new Date(doc.created_at).toLocaleDateString("en-IN")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void handleDownload(doc)}
              disabled={downloadingId === doc.id}
              className="shrink-0 rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-sm font-medium text-stone-900 hover:bg-stone-100 disabled:opacity-50"
            >
              {downloadingId === doc.id ? "Opening…" : "Download"}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-900">Documents</h1>
      <p className="mt-2 text-stone-600">Access contracts, legal files, and property documents.</p>

      {loading ? (
        <p className="mt-6 text-sm text-stone-500">Loading documents...</p>
      ) : error ? (
        <p className="mt-6 text-sm text-red-600">{error}</p>
      ) : documents.length === 0 ? (
        <p className="mt-6 text-sm text-stone-500">No documents available yet.</p>
      ) : (
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-stone-900">Contracts and agreements</h2>
            {contractDocuments.length === 0 ? (
              <p className="mt-3 text-sm text-stone-500">No contracts uploaded yet.</p>
            ) : (
              renderDocList(contractDocuments)
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-900">Other documents</h2>
            {otherDocuments.length === 0 ? (
              <p className="mt-3 text-sm text-stone-500">No additional documents uploaded yet.</p>
            ) : (
              renderDocList(otherDocuments)
            )}
          </section>
        </div>
      )}
    </div>
  );
}
