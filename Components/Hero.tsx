import Image from "next/image";
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
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(to_bottom,#f8f4ff,#dfefff)] text-slate-700">
      <nav className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-10 py-5 bg-white/60 backdrop-blur-md border-b border-pink-100">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center overflow-hidden rounded-full bg-yellow-300 shadow-md">
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
                fontSize: "clamp(1.6rem, 5vw, 3rem)",
                fontWeight: 700,
                color: "#ff5fa8",
                lineHeight: 1,
              }}
            >
              SamiSon&apos;s Wonderland
            </h1>
            <p className="text-xs sm:text-sm text-sky-500">
              Spielwelt & Indoor-Paradies
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base md:text-lg text-slate-700">
          <a href="#" className="hover:text-pink-500">
            Startseite
          </a>
          <a href="#" className="hover:text-pink-500">
            Spielzeuge
          </a>
          <a href="#" className="hover:text-pink-500">
            Schreibwaren
          </a>
          <a href="#" className="hover:text-pink-500">
            Über uns
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 pt-8 pb-16 text-center md:px-20 md:pt-12 md:pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute left-4 top-8 text-3xl md:left-10 md:top-12 md:text-5xl">
            ⭐
          </div>
          <div className="absolute right-6 top-20 text-2xl md:right-20 md:top-32 md:text-4xl">
            ☁️
          </div>
          <div className="absolute bottom-16 left-1/4 text-2xl md:bottom-20 md:text-4xl">
            💖
          </div>
        </div>

        <div className="mx-auto max-w-5xl rounded-[30px] md:rounded-[50px] border border-pink-100 bg-white/50 p-5 shadow-2xl backdrop-blur-sm md:p-16">
          <div className="mb-2 flex justify-center">
            <Image
              src="/teddy-logo.png"
              alt="Teddy Logo"
              width={220}
              height={220}
              className="w-[120px] sm:w-[160px] md:w-[300px]"
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
              Wir freuen uns darauf, euch in unserer magischen Spielzeugwelt zu
              begrüßen!
            </p>

            <button className="mt-8 rounded-full bg-yellow-400 px-6 py-3 text-base font-bold text-white shadow-xl transition hover:scale-105 hover:bg-yellow-500 sm:px-8 sm:py-4 sm:text-xl">
              Jetzt mehr erfahren
            </button>
          </section>

          <div className="mt-10 flex justify-center">
            <button className="rounded-full bg-pink-500 px-8 py-3 text-base font-bold text-white shadow-xl transition hover:bg-pink-600 sm:px-10 sm:py-4 sm:text-xl">
              Kontakt
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:mt-20">
            <div className="rounded-3xl border border-blue-100 bg-white/70 p-6 shadow-lg">
              <div className="mb-3 text-5xl">🧸</div>
              <h3 className="text-xl font-bold text-sky-500 md:text-2xl">
                Riesige Spielwelt
              </h3>
              <p className="mt-2 text-base md:text-lg">
                Über 1000 Spielsachen und viele Abenteuer.
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white/70 p-6 shadow-lg">
              <div className="mb-3 text-5xl">☁️</div>
              <h3 className="text-xl font-bold text-pink-500 md:text-2xl">
                Sicher & gemütlich
              </h3>
              <p className="mt-2 text-base md:text-lg">
                Ein Ort, an dem Kinder lachen und Eltern entspannen.
              </p>
            </div>

            <div className="rounded-3xl border border-yellow-100 bg-white/70 p-6 shadow-lg sm:col-span-2 md:col-span-1">
              <div className="mb-3 text-5xl">🌈</div>
              <h3 className="text-xl font-bold text-yellow-500 md:text-2xl">
                Leicht erreichbar
              </h3>
              <p className="mt-2 text-base md:text-lg">
                Parkplätze direkt vor Ort und gute Anfahrt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}