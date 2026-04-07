"use client";

import { useState } from "react";

export default function BewertenPage() {
  const [bewertungen, setBewertungen] = useState([
    {
      name: "Max",
      text: "Tolles Produkt!",
      sterne: 5,
    },
  ]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sterne, setSterne] = useState(5);

  function absenden() {
    if (!name || !text) return;

    setBewertungen([
      ...bewertungen,
      {
        name,
        text,
        sterne,
      },
    ]);

    setName("");
    setText("");
    setSterne(5);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold mb-6">Produkt bewerten</h1>

        <input
          type="text"
          placeholder="Dein Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
        />

        <textarea
          placeholder="Deine Bewertung"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4 h-32"
        />

        <select
          value={sterne}
          onChange={(e) => setSterne(Number(e.target.value))}
          className="w-full border rounded-xl p-3 mb-4"
        >
          <option value={5}>5 Sterne</option>
          <option value={4}>4 Sterne</option>
          <option value={3}>3 Sterne</option>
          <option value={2}>2 Sterne</option>
          <option value={1}>1 Stern</option>
        </select>

        <button
          onClick={absenden}
          className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-600"
        >
          Bewertung absenden
        </button>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Alle Bewertungen</h2>

          {bewertungen.map((b, index) => (
            <div
              key={index}
              className="border rounded-2xl p-4 mb-4 bg-slate-50"
            >
              <div className="font-bold">{b.name}</div>
              <div className="text-yellow-500 mb-2">
                {"⭐".repeat(b.sterne)}
              </div>
              <div>{b.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}