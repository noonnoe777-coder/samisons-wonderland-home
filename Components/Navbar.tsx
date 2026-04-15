"use client";

import Link from "next/link";

export default function Navbar() {
  const isAdmin =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/admin");

  return (
    <nav
      className="w-full px-4 py-4 md:px-8 backdrop-blur-md"
      style={{
        backgroundImage: "url('/pastel-cloud-big.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        {/* Oberer Bereich */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Logo + Titel */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="relative h-12 w-12 shrink-0 overflow-visible md:h-14 md:w-14">
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 md:h-32 md:w-32">
                <img
                  src="/blue-circle.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                />

                <img
                  src="/logo.png"
                  alt="SAMISON'S WONDERLAND"
                  className="absolute inset-0 z-10 h-full w-full object-contain"
                />
              </div>
            </div>

            <h1
              className="text-lg font-bold leading-tight sm:text-xl md:text-4xl"
              style={{
                fontFamily: "var(--font-fredoka)",
                color: "#ff5fa8",
              }}
            >
              SAMISON&apos;S{" "}
              <span style={{ color: "#5f9dff" }}>WONDERLAND</span>
            </h1>
          </div>

          {/* Favoriten / Anmelden / Registrieren */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <Link
              href="/favoriten"
              className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-bold text-pink-500 transition hover:bg-pink-50"
            >
              ❤️ Favoriten
            </Link>

            <Link
              href="/anmelden"
              className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-bold text-pink-500 transition hover:bg-pink-50"
            >
              Anmelden
            </Link>

            <Link
              href="/registrieren"
              className="rounded-full bg-pink-500 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-pink-600"
            >
              Registrieren
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:scale-105"
              >
                Admin bearbeiten
              </Link>
            )}
          </div>
        </div>

        {/* Navigation unten auf Handy */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-bold text-slate-700 md:text-base">
          <Link href="/" className="transition hover:text-pink-500">
            Startseite
          </Link>

          <Link
            href="/spielzeuge"
            className="transition hover:text-pink-500"
          >
            Spielzeuge
          </Link>

          <Link
            href="/schreibwaren"
            className="transition hover:text-pink-500"
          >
            Schreibwaren
          </Link>

          <Link
            href="/heimware"
            className="transition hover:text-pink-500"
          >
            Heimware
          </Link>

          <Link
            href="/arts-crafts"
            className="transition hover:text-pink-500"
          >
            Arts & Crafts
          </Link>

          <Link
            href="/ueber-uns"
            className="transition hover:text-pink-500"
          >
            Über uns
          </Link>

          <Link
            href="/tracking"
            className="transition hover:text-pink-500"
          >
            Tracking
          </Link>
        </div>
      </div>
    </nav>
  );
}