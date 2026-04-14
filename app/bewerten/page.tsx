"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type Bewertung = {
  id: number;
  name: string;
  text: string;
  sterne: number;
  antwort?: string;
};

export default function BewertenPage() {
  const [bewertungen, setBewertungen] = useState<Bewertung[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sterne, setSterne] = useState(5);

  useEffect(() => {
    const loadBewertungen = async () => {
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

    loadBewertungen();
  }, []);

  const absenden = async () => {
    if (!name || !text) return;

    const neueBewertung = {
      id: Date.now(),
      name,
      text,
      sterne,
      antwort: "",
    };

    const { error } = await supabase
      .from("bewertungen")
      .insert([neueBewertung]);

    if (error) {
      console.error(error);
      alert("Bewertung konnte nicht gespeichert werden.");
      return;
    }

    setBewertungen([neueBewertung, ...bewertungen]);

    setName("");
    setText("");
    setSterne(5);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="mb-6 text-3xl font-bold">Produkt bewerten</h1>

        <input
          type="text"
          placeholder="Dein Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-xl border p-3"
        />

        <textarea
          placeholder="Deine Bewertung"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mb-4 h-32 w-full rounded-xl border p-3"
        />

        <select
          value={sterne}
          onChange={(e) => setSterne(Number(e.target.value))}
          className="mb-4 w-full rounded-xl border p-3"
        >
          <option value={5}>5 Sterne</option>
          <option value={4}>4 Sterne</option>
          <option value={3}>3 Sterne</option>
          <option value={2}>2 Sterne</option>
          <option value={1}>1 Stern</option>
        </select>

        <button
          onClick={absenden}
          className="rounded-full bg-pink-500 px-6 py-3 font-bold text-white hover:bg-pink-600"
        >
          Bewertung absenden
        </button>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Alle Bewertungen</h2>

          {bewertungen.map((b) => (
            <div
              key={b.id}
              className="mb-4 rounded-2xl border bg-slate-50 p-4"
            >
              <div className="font-bold">{b.name}</div>

              <div className="mb-2 text-yellow-500">
                {"⭐".repeat(b.sterne)}
              </div>

              <div>{b.text}</div>

              {b.antwort && (
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
                  <div className="font-bold text-blue-700">
                    Antwort vom Shop:
                  </div>
                  <div>{b.antwort}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}