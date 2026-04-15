"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function AnmeldenPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Bitte E-Mail und Passwort eingeben.");
      return;
    }

    const { data, error } = await supabase
      .from("kunden")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Falsche E-Mail oder Passwort.");
      return;
    }

    localStorage.setItem(
      "customer",
      JSON.stringify({
        name: data.name,
        email: data.email,
      })
    );

    router.push("/favoriten");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef5ff] p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-pink-500">
          Anmelden
        </h1>

        <p className="mb-8 text-center text-sm text-slate-500">
          Melde dich mit deinem Kundenkonto an
        </p>

        <div className="space-y-4">
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
            onClick={handleLogin}
            className="w-full rounded-2xl bg-pink-500 py-3 font-bold text-white transition hover:bg-pink-600"
          >
            Anmelden
          </button>
        </div>
      </div>
    </main>
  );
}