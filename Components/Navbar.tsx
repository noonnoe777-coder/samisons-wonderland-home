import Link from "next/link";

export default function Navbar() {
  const isAdmin =
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/admin");

  return (
    <nav
  className="w-full flex items-center justify-between px-8 py-4 backdrop-blur-md"
  style={{
    backgroundImage: "url('/pastel-cloud-big.png')",
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
  }}
>
      <div className="flex items-center gap-3">
<div className="relative w-14 h-14 overflow-visible">
  <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2">
    <img
      src="/blue-circle.png"
      alt=""
      className="absolute inset-0 w-full h-full object-contain"
    />

    <img
      src="/logo.png"
      alt="SAMISON'S WONDERLAND"
      className="absolute inset-0 w-full h-full object-contain z-10"
    />
  </div>
</div>

        <h1
  className="text-4xl font-bold tracking-tight"
  style={{
    fontFamily: "var(--font-fredoka)",
    color: "#ff5fa8",
  }}
>
  SAMISON'S <span style={{ color: "#5f9dff" }}>WONDERLAND</span>
</h1>
      </div>

      <div className="flex items-center gap-6 text-lg font-bold text-slate-700 font-[var(--font-nunito)]">
        <Link href="/">Startseite</Link>
<Link href="/spielzeuge">Spielzeuge</Link>
<Link href="/schreibwaren">Schreibwaren</Link>
<Link href="/ueber-uns">Über uns</Link>
<Link href="/tracking">Tracking</Link>

        {isAdmin && (
          <Link
            href="/admin"
            className="rounded-full bg-yellow-400 px-5 py-2 text-white shadow-md hover:scale-105 transition"
          >
            Admin bearbeiten
          </Link>
        )}
      </div>
    </nav>
  );
}