"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("User:", user);
      console.log("Email:", user?.email);

      if (!user) {
        router.push("/");
        return;
      }

      if (user.email?.toLowerCase() !== "noonnoe777@gmail.com") {
        router.push("/");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eef5ff]">
        <p className="text-2xl font-bold text-pink-500">Lädt...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <h1 className="mb-8 text-5xl font-bold text-blue-500">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/produkte"
            className="block rounded-3xl bg-white p-8 shadow-lg transition hover:scale-105"
          >
            <h2 className="mb-3 text-3xl font-bold text-pink-500">
              Produkte verwalten
            </h2>
            <p className="text-slate-600">
              Produkte hinzufügen, bearbeiten und löschen.
            </p>
          </Link>

          <Link
            href="/admin/bestellungen"
            className="block rounded-3xl bg-white p-8 shadow-lg transition hover:scale-105"
          >
            <h2 className="mb-3 text-3xl font-bold text-blue-500">
              Bestellungen
            </h2>
            <p className="text-slate-600">
              Bestellungen und Status verwalten.
            </p>
          </Link>

          <Link
            href="/admin/bewertungen"
            className="block rounded-3xl bg-white p-8 shadow-lg transition hover:scale-105"
          >
            <h2 className="mb-3 text-3xl font-bold text-purple-500">
              Bewertungen
            </h2>
            <p className="text-slate-600">
              Kundenbewertungen ansehen, beantworten und bearbeiten.
            </p>
          </Link>

          <Link
            href="/admin/tracking"
            className="block rounded-3xl bg-white p-8 shadow-lg transition hover:scale-105"
          >
            <h2 className="mb-3 text-3xl font-bold text-yellow-500">
              Tracking
            </h2>
            <p className="text-slate-600">
              Lieferstatus und Versand bearbeiten.
            </p>
          </Link>

          <Link
            href="/admin/startseite"
            className="block rounded-3xl bg-white p-8 shadow-lg transition hover:scale-105"
          >
            <h2 className="mb-3 text-3xl font-bold text-green-500">
              Startseite bearbeiten
            </h2>
            <p className="text-slate-600">
              Bilder und Texte der Startseite ändern.
            </p>
          </Link>

          <Link
            href="/admin/ueber-uns"
            className="block rounded-3xl bg-white p-8 shadow-lg transition hover:scale-105"
          >
            <h2 className="mb-3 text-3xl font-bold text-pink-500">
              Über uns bearbeiten
            </h2>
            <p className="text-slate-600">
              Bilder, Video und Beschreibung ändern.
            </p>
          </Link>

          <Link
            href="/admin/jetzt-mehr-erfahren"
            className="block rounded-3xl bg-white p-8 shadow-lg transition hover:scale-105"
          >
            <h2 className="mb-3 text-3xl font-bold text-orange-500">
              Jetzt mehr erfahren bearbeiten
            </h2>
            <p className="text-slate-600">
              Texte, Schriftarten, Größen und bis zu 5 Bilder bearbeiten.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}