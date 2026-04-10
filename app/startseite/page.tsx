"use client";

import { JSX, useEffect, useState } from "react";
import { Fredoka } from "next/font/google";

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

export default function StartseitePage(): JSX.Element {
  const [headline, setHeadline] = useState("Neueröffnung am");
  const [headlineFont, setHeadlineFont] = useState(fredoka.className);

  const [date, setDate] = useState("15.11.2025!");
  const [dateFont, setDateFont] = useState(fredoka.className);

  const [address, setAddress] = useState(
    "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg."
  );
  const [addressFont, setAddressFont] = useState("font-sans");

  const [description, setDescription] = useState(
    "Willkommen bei SAMISON'S WONDERLAND – eure magische Spielzeugwelt voller Abenteuer, Farben und Spaß!"
  );
  const [descriptionFont, setDescriptionFont] = useState("font-sans");

  const [image, setImage] = useState<string | null>(null);

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
          "Willkommen bei SAMISON'S WONDERLAND – eure magische Spielzeugwelt voller Abenteuer, Farben und Spaß!"
      );
      setDescriptionFont(data.descriptionFont ?? "font-sans");

      setImage(data.image ?? null);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#eef5ff] px-3 py-4 overflow-x-hidden">
      <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white p-4 md:p-10 text-center shadow-xl">
        {image && (
          <img
            src={image}
            alt="Startseite"
            className="mb-6 h-auto max-h-[320px] w-full rounded-3xl object-cover"
          />
        )}

        <h1
          className={`mb-2 font-extrabold text-blue-500 ${headlineFont} text-3xl sm:text-4xl md:text-6xl`}
        >
          {headline}
        </h1>

        <h2
          className={`mb-6 font-extrabold text-pink-500 ${dateFont} text-2xl sm:text-3xl md:text-5xl`}
        >
          {date}
        </h2>

        <p
          className={`mb-6 font-bold text-slate-700 ${addressFont} text-lg sm:text-xl md:text-3xl`}
        >
          {address}
        </p>

        <p
          className={`text-slate-600 ${descriptionFont} text-base sm:text-lg md:text-xl`}
        >
          {description}
        </p>
      </div>
    </main>
  );
}