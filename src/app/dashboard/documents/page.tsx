"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type CustomerDocument = {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  created_at: string;
};

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<CustomerDocument[]>([]);

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

        const { data: docs, error: docsError } = await supabase
          .from("customer_documents")
          .select("id, file_name, file_path, file_type, created_at")
          .eq("customer_id", customer.id)
          .order("created_at", { ascending: false });

        if (docsError) {
          setError("Unable to load your documents right now.");
          return;
        }

        setDocuments(docs ?? []);
      } catch {
        setError("Unable to load your documents right now.");
      } finally {
        setLoading(false);
      }
    }

    void loadDocuments();
  }, []);

  const contractDocuments = documents.filter((doc) =>
    /(contract|agreement|lease)/i.test(doc.file_name),
  );
  const otherDocuments = documents.filter(
    (doc) => !/(contract|agreement|lease)/i.test(doc.file_name),
  );

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
              <ul className="mt-4 grid gap-3">
                {contractDocuments.map((doc) => (
                  <li
                    key={doc.id}
                    className="p-4 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-medium text-stone-900">{doc.file_name}</p>
                      <p className="text-xs text-stone-500 mt-1">
                        {doc.file_type ?? "file"} - {new Date(doc.created_at).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <span className="text-xs text-stone-500 break-all text-right">{doc.file_path}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-900">Other documents</h2>
            {otherDocuments.length === 0 ? (
              <p className="mt-3 text-sm text-stone-500">No additional documents uploaded yet.</p>
            ) : (
              <ul className="mt-4 grid gap-3">
                {otherDocuments.map((doc) => (
                  <li
                    key={doc.id}
                    className="p-4 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-medium text-stone-900">{doc.file_name}</p>
                      <p className="text-xs text-stone-500 mt-1">
                        {doc.file_type ?? "file"} - {new Date(doc.created_at).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <span className="text-xs text-stone-500 break-all text-right">{doc.file_path}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
