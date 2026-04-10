"use client";

import { useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import Navbar from "@/Components/Navbar";
import Image from "next/image";
import Link from "next/link";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type StartseiteData = {
  headline?: string;
  headlineFont?: string;
  date?: string;
  dateFont?: string;
  address?: string;
  addressFont?: string;
  description?: string;
  descriptionFont?: string;
  image?: string | null;
};

export default function Page() {
  const [headline, setHeadline] = useState("Neueröffnung am");
  const [headlineFont, setHeadlineFont] = useState(fredoka.className);

  const [date, setDate] = useState("15.11.2025!");
  const [dateFont, setDateFont] = useState(fredoka.className);

  const [address, setAddress] = useState(
    "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg."
  );
  const [addressFont, setAddressFont] = useState("font-sans");

  const [description, setDescription] = useState(
    "SAMISON'S WONDERLAND ist der Ort, an dem Kinder lachen und spielen, während Eltern entspannt einkaufen."
  );
  const [descriptionFont, setDescriptionFont] = useState("font-sans");

  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("startseiteData");

    if (saved) {
      const data: StartseiteData = JSON.parse(saved);

      setHeadline(data.headline ?? "Neueröffnung am");
      setHeadlineFont(data.headlineFont ?? fredoka.className);

      setDate(data.date ?? "15.11.2025!");
      setDateFont(data.dateFont ?? fredoka.className);

      setAddress(
        data.address ??
          "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg."
      );
      setAddressFont(data.addressFont ?? "font-sans");

      setDescription(
        data.description ??
          "SAMISON'S WONDERLAND ist der Ort, an dem Kinder lachen und spielen, während Eltern entspannt einkaufen."
      );
      setDescriptionFont(data.descriptionFont ?? "font-sans");

      setHeroImage(data.image ?? null);
    }
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)),
          url('/Pastel star and heart pattern.png'),
          url('/pastel-cloud-big.png'),
          url('/wallpaper.png')
        `,
        backgroundRepeat: "repeat, repeat, no-repeat, no-repeat",
        backgroundSize: "220px, 220px, cover, cover",
        backgroundPosition: "top left, top left, top center, center",
      }}
    >
      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col items-center px-4 pt-24 text-center md:px-6 md:pt-32">
          {heroImage && (
            <img
              src={heroImage}
              alt="Startseite"
              className="mb-8 h-auto max-h-[320px] w-full max-w-4xl rounded-3xl object-cover shadow-2xl"
            />
          )}

          <h1
            className={`text-3xl sm:text-4xl md:text-6xl font-extrabold text-blue-500 ${headlineFont}`}
          >
            {headline}
          </h1>

          <p
            className={`mt-2 text-2xl sm:text-3xl md:text-5xl font-extrabold text-pink-500 ${dateFont}`}
          >
            {date}
          </p>

          <p
            className={`mt-6 max-w-4xl text-lg sm:text-xl md:text-3xl font-semibold text-slate-700 ${addressFont}`}
          >
            {address}
          </p>

          <Link
            href="/jetzt-mehr-erfahren"
            className="mt-8 rounded-full bg-yellow-400 px-6 py-3 text-lg sm:px-10 sm:py-4 sm:text-2xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-yellow-500"
          >
            Jetzt mehr erfahren
          </Link>
        </div>

        <div className="relative mt-10 flex flex-col items-center gap-10 px-4 pb-12 md:flex-row md:items-start md:justify-between md:px-10">
          <div className="max-w-3xl text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-700">
              Willkommen bei{" "}
              <span className="text-pink-500">SAMISON&apos;s</span>
              <br />
              <span className="text-blue-500">WONDERLAND!</span>
            </h2>

            <p
              className={`mt-6 leading-relaxed text-slate-700 ${descriptionFont} text-base sm:text-lg md:text-2xl`}
            >
              {description}
            </p>
          </div>

          <div className="relative h-[260px] w-full max-w-[340px] sm:h-[340px] sm:max-w-[480px] md:h-[520px] md:w-[720px]">
            <Image
              src="/Pastel med rainbow over fluffy clouds.png"
              alt="Großer Regenbogen"
              width={1400}
              height={700}
              className="absolute left-1/2 top-0 z-0 w-[90%] -translate-x-1/2 md:w-[1200px]"
            />

            <Image
              src="/Pastel small rainbow over dreamy clouds.png"
              alt="Kleiner Regenbogen"
              width={720}
              height={360}
              className="absolute right-0 top-[30px] z-10 w-[180px] sm:w-[260px] md:right-[-140px] md:top-[50px] md:w-[640px]"
            />

            <Image
              src="/Teddy bear with red heart.png"
              alt="Teddy mit Herz"
              width={240}
              height={240}
              className="absolute left-[40px] top-[80px] z-20 w-[90px] sm:left-[80px] sm:w-[130px] md:left-[180px] md:top-[120px] md:w-[220px]"
            />

            <Image
              src="/Cute rubber duck logo in pastel tones.png"
              alt="Ente"
              width={120}
              height={120}
              className="absolute right-[20px] top-[120px] z-30 w-[50px] sm:right-[40px] sm:w-[70px] md:right-[120px] md:top-[230px] md:w-[110px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}