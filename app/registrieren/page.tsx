"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function RegistrierenPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Bitte alles ausfüllen.");
      return;
    }

    const { error } = await supabase.from("kunden").insert([
      {
        name,
        email,
        password,
      },
    ]);

    if (error) {
      alert("Diese E-Mail existiert bereits.");
      return;
    }

    localStorage.setItem(
      "customer",
      JSON.stringify({
        name,
        email,
      })
    );

    router.push("/favoriten");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef5ff] p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-pink-500">
          Registrieren
        </h1>

        <p className="mb-8 text-center text-sm text-slate-500">
          Erstelle dein Kundenkonto
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-pink-400"
          />

          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-pink-400"
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-pink-400"
          />

          <button
            onClick={handleRegister}
            className="w-full rounded-2xl bg-pink-500 py-3 font-bold text-white transition hover:bg-pink-600"
          >
            Konto erstellen
          </button>
        </div>
      </div>
    </main>
  );
}