import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

export default function Navbar() {
  const isAdmin =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/admin");

  return (
    <nav
      className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8 py-4 backdrop-blur-md overflow-x-hidden"
      style={{
        backgroundImage: "url('/pastel-cloud-big.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center gap-3 text-center md:text-left">
        <div className="relative h-12 w-12 md:h-14 md:w-14 overflow-visible">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 md:h-32 md:w-32 -translate-x-1/2 -translate-y-1/2">
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
          className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-fredoka)",
            color: "#ff5fa8",
          }}
        >
          SAMISON&apos;S{" "}
          <span style={{ color: "#5f9dff" }}>WONDERLAND</span>
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-sm sm:text-base md:text-lg font-bold text-slate-700 font-[var(--font-nunito)]">
        <Link href="/">Startseite</Link>
        <Link href="/spielzeuge">Spielzeuge</Link>
        <Link href="/schreibwaren">Schreibwaren</Link>
        <Link href="/ueber-uns">Über uns</Link>
        <Link href="/tracking">Tracking</Link>

        {isAdmin && (
          <Link
            href="/admin"
            className="rounded-full bg-yellow-400 px-4 py-2 text-sm sm:text-base text-white shadow-md transition hover:scale-105"
          >
            Admin bearbeiten
          </Link>
        )}
      </div>
    </nav>
  );
}