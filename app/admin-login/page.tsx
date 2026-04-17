"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (email.toLowerCase() !== "noonnoe777@gmail.com") {
      await supabase.auth.signOut();
      setError("Du hast keinen Admin-Zugang.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef5ff] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-pink-500">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-pink-500"
            required
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-pink-500"
            required
          />

          {error && (
            <p className="rounded-2xl bg-red-100 px-4 py-3 text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-pink-500 py-3 text-lg font-bold text-white transition hover:bg-pink-600 disabled:opacity-50"
          >
            {loading ? "Lädt..." : "Einloggen"}
          </button>
        </form>
      </div>
    </main>
  );
}