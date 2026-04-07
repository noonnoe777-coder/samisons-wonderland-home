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
  headlineSize?: string;

  date?: string;
  dateFont?: string;
  dateSize?: string;

  address?: string;
  addressFont?: string;
  addressSize?: string;

  description?: string;
  descriptionFont?: string;
  descriptionSize?: string;

  image?: string | null;
};

export default function Page() {
  const [headline, setHeadline] = useState("Neueröffnung am");
  const [headlineFont, setHeadlineFont] = useState(fredoka.className);
  const [headlineSize, setHeadlineSize] = useState("text-6xl");

  const [date, setDate] = useState("15.11.2025!");
  const [dateFont, setDateFont] = useState(fredoka.className);
  const [dateSize, setDateSize] = useState("text-5xl");

  const [address, setAddress] = useState(
    "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg."
  );
  const [addressFont, setAddressFont] = useState("font-sans");
  const [addressSize, setAddressSize] = useState("text-3xl");

  const [description, setDescription] = useState(
    "SAMISON'S WONDERLAND ist der Ort, an dem Kinder lachen und spielen, während Eltern entspannt einkaufen."
  );
  const [descriptionFont, setDescriptionFont] = useState("font-sans");
  const [descriptionSize, setDescriptionSize] = useState("text-2xl");

  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("startseiteData");

    if (saved) {
      const data: StartseiteData = JSON.parse(saved);

      setHeadline(data.headline ?? "Neueröffnung am");
      setHeadlineFont(data.headlineFont ?? fredoka.className);
      setHeadlineSize(data.headlineSize ?? "text-6xl");

      setDate(data.date ?? "15.11.2025!");
      setDateFont(data.dateFont ?? fredoka.className);
      setDateSize(data.dateSize ?? "text-5xl");

      setAddress(
        data.address ??
          "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg."
      );
      setAddressFont(data.addressFont ?? "font-sans");
      setAddressSize(data.addressSize ?? "text-3xl");

      setDescription(
        data.description ??
          "SAMISON'S WONDERLAND ist der Ort, an dem Kinder lachen und spielen, während Eltern entspannt einkaufen."
      );
      setDescriptionFont(data.descriptionFont ?? "font-sans");
      setDescriptionSize(data.descriptionSize ?? "text-2xl");

      setHeroImage(data.image ?? null);
    }
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)),
          url('/Pastel star and heart pattern.png'),
          url('/pastel-cloud-big.png'),
          url('/wallpaper.png')
        `,
        backgroundRepeat: "repeat, repeat, no-repeat, no-repeat",
        backgroundSize: "350px, 350px, cover, cover",
        backgroundPosition: "top left, top left, top center, center",
        backgroundBlendMode: "lighten, normal, normal, normal",
      }}
    >
      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col items-center px-6 pt-32 text-center">
          {heroImage && (
            <img
              src={heroImage}
              alt="Startseite"
              className="mb-10 h-[320px] w-full max-w-4xl rounded-3xl object-cover shadow-2xl"
            />
          )}

          <h1
            className={`${headlineSize} font-extrabold text-blue-500 ${headlineFont}`}
          >
            {headline}
          </h1>

          <p
            className={`mt-2 ${dateSize} font-extrabold text-pink-500 ${dateFont}`}
          >
            {date}
          </p>

          <p
            className={`mt-8 max-w-4xl ${addressSize} font-semibold text-slate-700 ${addressFont}`}
          >
            {address}
          </p>

          <Link
            href="/jetzt-mehr-erfahren"
            className="mt-10 rounded-full bg-yellow-400 px-10 py-4 text-2xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-yellow-500"
          >
            Jetzt mehr erfahren
          </Link>
        </div>

        <div className="relative mt-6 flex min-h-[420px] items-start justify-between px-10 pb-12">
          <div className="mt-2 max-w-3xl">
            <h2 className="text-5xl font-extrabold leading-tight text-slate-700">
              Willkommen bei{" "}
              <span className="text-pink-500">SAMISON&apos;s</span>
              <br />
              <span className="text-blue-500">WONDERLAND!</span>
            </h2>

            <p
              className={`mt-6 leading-relaxed text-slate-700 ${descriptionFont} ${descriptionSize}`}
            >
              {description}
            </p>
          </div>

          <div className="relative mr-10 h-[520px] w-[720px]">
            <Image
              src="/Pastel med rainbow over fluffy clouds.png"
              alt="Großer Regenbogen"
              width={1400}
              height={700}
              className="absolute left-1/2 top-0 z-0 w-[1200px] -translate-x-1/2"
            />

            <Image
              src="/Pastel small rainbow over dreamy clouds.png"
              alt="Kleiner Regenbogen"
              width={720}
              height={360}
              className="absolute right-[-140px] top-[50px] z-10 w-[640px]"
            />

            <Image
              src="/Teddy bear with red heart.png"
              alt="Teddy mit Herz"
              width={240}
              height={240}
              className="absolute left-[180px] top-[120px] z-20 w-[220px]"
            />

            <Image
              src="/Cute rubber duck logo in pastel tones.png"
              alt="Ente"
              width={120}
              height={120}
              className="absolute right-[120px] top-[230px] z-30 w-[110px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}