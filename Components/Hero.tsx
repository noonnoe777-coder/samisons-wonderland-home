import Image from "next/image"
import { Fredoka, Nunito } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function Hero() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8f4ff,#dfefff)] text-slate-700">
<nav className="w-full flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-10 py-6 bg-white/60 backdrop-blur-md border-b border-pink-100">
<div className="flex items-center gap-3">
  <div className="w-14 h-14 rounded-full bg-yellow-300 flex items-center justify-center overflow-hidden shadow-md">
    <Image
      src="/teddy-logo.png"
      alt="Teddy Logo"
      width={56}
      height={56}
      className="scale-110 object-contain"
    />
  </div>

    <div>
     <h1
  className={fredoka.className}
  style={{
    fontSize: "3rem",
    fontWeight: 700,
    color: "#ff5fa8",
    lineHeight: 1,
  }}
>
  SamiSon's Wonderland
</h1>
      <p className="text-sm text-sky-500">Spielwelt & Indoor-Paradies</p>
    </div>
  </div>

  <div className="flex flex-wrap justify-center gap-6 text-lg font-fredoka text-slate-700">
    <a href="#" className="hover:text-pink-500">Startseite</a>
    <a href="#" className="hover:text-pink-500">Spielzeuge</a>
    <a href="#" className="hover:text-pink-500">Schreibwaren</a>
    <a href="#" className="hover:text-pink-500">Über uns</a>
  </div>
</nav>

      <section className="relative px-8 md:px-20 pt-12 pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-12 left-10 text-5xl">⭐</div>
          <div className="absolute top-32 right-20 text-4xl">☁️</div>
          <div className="absolute bottom-20 left-1/4 text-4xl">💖</div>
        </div>

        <div className="max-w-5xl mx-auto rounded-[50px] bg-white/50 border border-pink-100 shadow-2xl p-10 md:p-16 backdrop-blur-sm">
<div className="text-6xl md:text-8xl mb-4 flex justify-center">
  <Image
    src="/teddy-logo.png"
    alt="Teddy Logo"
    width={300}
    height={300}
    className="scale-180 -mt-20"
  />
</div>
<section className="text-center">
<h1 className="hero-title-wrapper">
  <span className="hero-title-main">Neueröffnung am</span>
  <span className="hero-title-date">15.11.2025!</span>
</h1>
<p className="hero-text">
  Besucht uns auf der Blumenstraße 7,
  <br />
  69168 Wiesloch Baden-Württemberg.
</p>

<p className="hero-subtext">
  Wir freuen uns darauf, euch in unserer magischen Spielzeugwelt zu begrüßen!
</p>

  <button className="hero-button">
  Jetzt mehr erfahren
</button>
</section>
<div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
  <button className="bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold px-10 py-4 rounded-full shadow-xl transition">
    Kontakt
  </button>
</div>

<div className="h-40" />

<div className="grid md:grid-cols-3 gap-6 mt-40 max-w-6xl mx-auto pb-32">
  </div>
          <div className="bg-white/70 rounded-3xl p-6 shadow-lg border border-blue-100">
            <div className="text-5xl mb-3">🧸</div>
            <h3 className="text-2xl font-bold text-sky-500">Riesige Spielwelt</h3>
            <p className="mt-2 text-lg">Über 1000 Spielsachen und viele Abenteuer.</p>
          </div>

          <div className="bg-white/70 rounded-3xl p-6 shadow-lg border border-pink-100">
            <div className="text-5xl mb-3">☁️</div>
            <h3 className="text-2xl font-bold text-pink-500">Sicher & gemütlich</h3>
            <p className="mt-2 text-lg">Ein Ort, an dem Kinder lachen und Eltern entspannen.</p>
          </div>

          <div className="bg-white/70 rounded-3xl p-6 shadow-lg border border-yellow-100">
            <div className="text-5xl mb-3">🌈</div>
            <h3 className="text-2xl font-bold text-yellow-500">Leicht erreichbar</h3>
            <p className="mt-2 text-lg">Parkplätze direkt vor Ort und gute Anfahrt.</p>
          </div>
        </div>
      </section>
    </main>
  )
}