"use client";

import { useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import Navbar from "@/Components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type StartseiteData = {
  id: number;
  headline?: string;
  headline_font?: string;
  date?: string;
  date_font?: string;
  address?: string;
  address_font?: string;
  description?: string;
  description_font?: string;
  image?: string | null;
  kitten_image?: string | null;
};

const DEFAULT_HEADLINE = "Neueröffnung am";
const DEFAULT_DATE = "15.11.2025!";
const DEFAULT_ADDRESS =
  "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg.";
const DEFAULT_DESCRIPTION =
  "SAMISON'S WONDERLAND ist der Ort, an dem Kinder lachen und spielen, während Eltern entspannt einkaufen.";
const DEFAULT_KITTEN_IMAGE = "/kitten heart yarn.png";

export default function Page() {
  const [headline, setHeadline] = useState<string>(DEFAULT_HEADLINE);
  const [headlineFont, setHeadlineFont] = useState<string>(fredoka.className);

  const [date, setDate] = useState<string>(DEFAULT_DATE);
  const [dateFont, setDateFont] = useState<string>(fredoka.className);

  const [address, setAddress] = useState<string>(DEFAULT_ADDRESS);
  const [addressFont, setAddressFont] = useState<string>("font-sans");

  const [description, setDescription] = useState<string>(DEFAULT_DESCRIPTION);
  const [descriptionFont, setDescriptionFont] = useState<string>("font-sans");

  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [kittenImage, setKittenImage] = useState<string>(DEFAULT_KITTEN_IMAGE);

  useEffect(() => {
    async function loadHomepage() {
      const { data, error } = await supabase
        .from("startseite")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Fehler beim Laden der Startseite:", error);
        return;
      }

      const homepage = data as StartseiteData | null;

      if (!homepage) return;

      setHeadline(homepage.headline ?? DEFAULT_HEADLINE);
      setHeadlineFont(homepage.headline_font ?? fredoka.className);

      setDate(homepage.date ?? DEFAULT_DATE);
      setDateFont(homepage.date_font ?? fredoka.className);

      setAddress(homepage.address ?? DEFAULT_ADDRESS);
      setAddressFont(homepage.address_font ?? "font-sans");

      setDescription(homepage.description ?? DEFAULT_DESCRIPTION);
      setDescriptionFont(homepage.description_font ?? "font-sans");

      setHeroImage(homepage.image ?? null);
      setKittenImage(homepage.kitten_image ?? DEFAULT_KITTEN_IMAGE);
    }

    loadHomepage();
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
            <Image
              src={heroImage}
              alt="Startseite"
              width={1400}
              height={700}
              priority
              className="mb-8 h-auto max-h-[320px] w-full max-w-4xl rounded-3xl object-cover shadow-2xl"
            />
          )}

          <h1
            className={`text-3xl font-extrabold text-blue-500 sm:text-4xl md:text-6xl ${headlineFont}`}
          >
            {headline}
          </h1>

          <p
            className={`mt-2 text-2xl font-extrabold text-pink-500 sm:text-3xl md:text-5xl ${dateFont}`}
          >
            {date}
          </p>

          <p
            className={`mt-6 max-w-4xl text-lg font-semibold text-slate-700 sm:text-xl md:text-3xl ${addressFont}`}
          >
            {address}
          </p>

          <Link
            href="/jetzt-mehr-erfahren"
            className="mt-8 rounded-full bg-yellow-400 px-6 py-3 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:bg-yellow-500 sm:px-10 sm:py-4 sm:text-2xl"
          >
            Jetzt mehr erfahren
          </Link>
        </div>

        <div className="relative mt-10 flex flex-col items-center gap-10 px-4 pb-12 md:flex-row md:items-start md:justify-between md:px-10">
          <div className="max-w-3xl text-center md:text-left">
            <h2 className="text-3xl font-extrabold leading-tight text-slate-700 sm:text-4xl md:text-5xl">
              Willkommen bei <span className="text-pink-500">SAMISON&apos;s</span>
              <br />
              <span className="text-blue-500">WONDERLAND!</span>
            </h2>

            <p
              className={`mt-6 text-base leading-relaxed text-slate-700 sm:text-lg md:text-2xl ${descriptionFont}`}
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
  src={kittenImage}
  alt="Kitten with heart yarn"
  width={280}
  height={280}
  className="absolute z-20 right-[120px] top-[50%] -translate-y-1/2 w-[140px] sm:right-[170px] sm:w-[190px] md:right-[240px] md:top-[48%] md:w-[260px]"
/>
          </div>
        </div>
      </div>
    </div>
  );
}
