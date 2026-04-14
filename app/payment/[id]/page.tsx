"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Navbar from "@/Components/Navbar";

export default function PaymentPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
        }),
      });

      const data: { url?: string; error?: string } = await response.json();

      if (!response.ok) {
        console.error("PAYMENT ERROR:", data);
        alert(data.error || "Fehler beim Weiterleiten zur Zahlung");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Keine Zahlungs-URL erhalten.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Fehler beim Weiterleiten zur Zahlung");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto flex max-w-2xl flex-col px-4 py-10">
        <div className="rounded-[32px] bg-white p-8 shadow-xl">
          <h1 className="mb-6 text-center text-4xl font-bold text-pink-500">
            Zahlung abschließen
          </h1>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dein Name"
                className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                E-Mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
              />
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full rounded-2xl bg-pink-500 px-5 py-4 text-lg font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
  ? "Weiterleitung..."
  : "Mit Karte, Klarna oder PayPal bezahlen"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}