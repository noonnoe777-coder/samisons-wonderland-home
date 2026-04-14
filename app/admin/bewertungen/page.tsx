"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AdminBewertungenPage() {
  const [bewertungen, setBewertungen] = useState<any[]>([]);
  const [bearbeiten, setBearbeiten] = useState<number | null>(null);

  useEffect(() => {
    const laden = async () => {
      const { data, error } = await supabase
        .from("bewertungen")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setBewertungen(data || []);
    };

    laden();
  }, []);

  async function speichern(id: number) {
    const bewertung = bewertungen.find((b) => b.id === id);

    if (!bewertung) return;

    const { error } = await supabase
      .from("bewertungen")
      .update({
        name: bewertung.name,
        text: bewertung.text,
        sterne: bewertung.sterne,
        antwort: bewertung.antwort,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setBearbeiten(null);
  }

  async function loeschen(id: number) {
    const { error } = await supabase
      .from("bewertungen")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setBewertungen((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="mb-6 text-3xl font-bold">Admin – Bewertungen</h1>

        {bewertungen.length === 0 && (
          <p>Noch keine Bewertungen vorhanden.</p>
        )}

        {bewertungen.map((b) => (
          <div
            key={b.id}
            className="mb-4 rounded-2xl border bg-slate-50 p-4"
          >
            {bearbeiten === b.id ? (
              <>
                <input
                  className="mb-2 w-full rounded-xl border p-2"
                  value={b.name}
                  onChange={(e) => {
                    setBewertungen((prev) =>
                      prev.map((item) =>
                        item.id === b.id
                          ? { ...item, name: e.target.value }
                          : item
                      )
                    );
                  }}
                />

                <textarea
                  className="mb-2 w-full rounded-xl border p-2"
                  value={b.text}
                  onChange={(e) => {
                    setBewertungen((prev) =>
                      prev.map((item) =>
                        item.id === b.id
                          ? { ...item, text: e.target.value }
                          : item
                      )
                    );
                  }}
                />

                <select
                  className="mb-3 w-full rounded-xl border p-2"
                  value={b.sterne}
                  onChange={(e) => {
                    setBewertungen((prev) =>
                      prev.map((item) =>
                        item.id === b.id
                          ? { ...item, sterne: Number(e.target.value) }
                          : item
                      )
                    );
                  }}
                >
                  <option value={5}>5 Sterne</option>
                  <option value={4}>4 Sterne</option>
                  <option value={3}>3 Sterne</option>
                  <option value={2}>2 Sterne</option>
                  <option value={1}>1 Stern</option>
                </select>

                <textarea
                  className="mb-3 w-full rounded-xl border p-2"
                  placeholder="Antwort an den Kunden"
                  value={b.antwort || ""}
                  onChange={(e) => {
                    setBewertungen((prev) =>
                      prev.map((item) =>
                        item.id === b.id
                          ? { ...item, antwort: e.target.value }
                          : item
                      )
                    );
                  }}
                />

                <button
                  onClick={() => speichern(b.id)}
                  className="mr-2 rounded-xl bg-green-600 px-4 py-2 text-white"
                >
                  Speichern
                </button>
              </>
            ) : (
              <>
                <div className="font-bold">{b.name}</div>

                <div className="mb-2 text-yellow-500">
                  {"⭐".repeat(b.sterne)}
                </div>

                <div className="mb-4">{b.text}</div>

                {b.antwort && (
                  <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
                    <div className="font-bold text-blue-700">
                      Deine Antwort:
                    </div>
                    <div>{b.antwort}</div>
                  </div>
                )}

                <button
                  onClick={() => setBearbeiten(b.id)}
                  className="mr-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
                >
                  Bearbeiten
                </button>
              </>
            )}

            <button
              onClick={() => loeschen(b.id)}
              className="rounded-xl bg-red-600 px-4 py-2 text-white"
            >
              Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}