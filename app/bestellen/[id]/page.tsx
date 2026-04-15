"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BestellungPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = Number(params.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleWeiter = async () => {
    if (!name || !email) {
      alert("Bitte Name und E-Mail eingeben.");
      return;
    }

    const menge = searchParams.get("menge") || "1";
    const notiz = searchParams.get("notiz") || "";
    const geschenk = searchParams.get("geschenk") || "false";
    const gravur = searchParams.get("gravur") || "false";

    router.push(
      `/payment/${id}?menge=${menge}&notiz=${encodeURIComponent(
        notiz
      )}&geschenk=${geschenk}&gravur=${gravur}&name=${encodeURIComponent(
        name
      )}&email=${encodeURIComponent(email)}`
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eef5ff] p-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-pink-500">
          Bestellung abschließen
        </h1>

        <p className="mb-6 text-sm text-slate-500">
          Bitte Name und E-Mail eingeben.
        </p>

        <input
          type="text"
          placeholder="Dein Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-2xl border border-slate-300 p-3 outline-none focus:border-pink-400"
        />

        <input
          type="email"
          placeholder="Deine E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-6 w-full rounded-2xl border border-slate-300 p-3 outline-none focus:border-pink-400"
        />

        <button
          onClick={handleWeiter}
          className="w-full rounded-2xl bg-pink-500 py-3 font-bold text-white transition hover:bg-pink-600"
        >
          Weiter zur Zahlung
        </button>
      </div>
    </div>
  );
}