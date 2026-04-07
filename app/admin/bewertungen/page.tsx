"use client";

import { useEffect, useState } from "react";

export default function AdminBewertungenPage() {
  const [bewertungen, setBewertungen] = useState<any[]>([]);
  const [bearbeiten, setBearbeiten] = useState<number | null>(null);

  useEffect(() => {
    const gespeichert = localStorage.getItem("bewertungen");
    if (gespeichert) {
      setBewertungen(JSON.parse(gespeichert));
    }
  }, []);

  function speichern() {
    localStorage.setItem("bewertungen", JSON.stringify(bewertungen));
    setBearbeiten(null);
  }

  function loeschen(index: number) {
    const neueListe = bewertungen.filter((_, i) => i !== index);
    setBewertungen(neueListe);
    localStorage.setItem("bewertungen", JSON.stringify(neueListe));
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6">Admin – Bewertungen</h1>

        {bewertungen.length === 0 && (
          <p>Noch keine Bewertungen vorhanden.</p>
        )}

        {bewertungen.map((b, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 mb-4 bg-slate-50"
          >
            {bearbeiten === index ? (
              <>
                <input
                  className="w-full border rounded-xl p-2 mb-2"
                  value={b.name}
                  onChange={(e) => {
                    const neu = [...bewertungen];
                    neu[index].name = e.target.value;
                    setBewertungen(neu);
                  }}
                />

                <textarea
                  className="w-full border rounded-xl p-2 mb-2"
                  value={b.text}
                  onChange={(e) => {
                    const neu = [...bewertungen];
                    neu[index].text = e.target.value;
                    setBewertungen(neu);
                  }}
                />

                <select
                  className="w-full border rounded-xl p-2 mb-3"
                  value={b.sterne}
                  onChange={(e) => {
                    const neu = [...bewertungen];
                    neu[index].sterne = Number(e.target.value);
                    setBewertungen(neu);
                  }}
                >
                  <option value={5}>5 Sterne</option>
                  <option value={4}>4 Sterne</option>
                  <option value={3}>3 Sterne</option>
                  <option value={2}>2 Sterne</option>
                  <option value={1}>1 Stern</option>
                </select>

                <textarea
                  className="w-full border rounded-xl p-2 mb-3"
                  placeholder="Antwort an den Kunden"
                  value={b.antwort || ""}
                  onChange={(e) => {
                    const neu = [...bewertungen];
                    neu[index].antwort = e.target.value;
                    setBewertungen(neu);
                  }}
                />

                <button
                  onClick={speichern}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl mr-2"
                >
                  Speichern
                </button>
              </>
            ) : (
              <>
                <div className="font-bold">{b.name}</div>

                <div className="text-yellow-500 mb-2">
                  {"⭐".repeat(b.sterne)}
                </div>

                <div className="mb-4">{b.text}</div>

                {b.antwort && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                    <div className="font-bold text-blue-700">
                      Deine Antwort:
                    </div>
                    <div>{b.antwort}</div>
                  </div>
                )}

                <button
                  onClick={() => setBearbeiten(index)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl mr-2"
                >
                  Bearbeiten
                </button>
              </>
            )}

            <button
              onClick={() => loeschen(index)}
              className="bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}