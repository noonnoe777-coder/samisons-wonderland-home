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

export default function StartseitePage(): JSX.Element {
  const [headline, setHeadline] = useState<string>("Neueröffnung am");
  const [headlineFont, setHeadlineFont] = useState<string>(
    fredoka.className
  );
  const [headlineSize, setHeadlineSize] = useState<string>("text-6xl");

  const [date, setDate] = useState<string>("15.11.2025!");
  const [dateFont, setDateFont] = useState<string>(fredoka.className);
  const [dateSize, setDateSize] = useState<string>("text-5xl");

  const [address, setAddress] = useState<string>(
    "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg."
  );
  const [addressFont, setAddressFont] = useState<string>("font-sans");
  const [addressSize, setAddressSize] = useState<string>("text-3xl");

  const [description, setDescription] = useState<string>(
    "Willkommen bei SAMISON'S WONDERLAND – eure magische Spielzeugwelt voller Abenteuer, Farben und Spaß!"
  );
  const [descriptionFont, setDescriptionFont] = useState<string>("font-sans");
  const [descriptionSize, setDescriptionSize] = useState<string>("text-xl");

  const [image, setImage] = useState<string | null>(null);

  useEffect((): void => {
    const saved: string | null = localStorage.getItem("startseiteData");

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
          "Willkommen bei SAMISON'S WONDERLAND – eure magische Spielzeugwelt voller Abenteuer, Farben und Spaß!"
      );
      setDescriptionFont(data.descriptionFont ?? "font-sans");
      setDescriptionSize(data.descriptionSize ?? "text-xl");

      setImage(data.image ?? null);
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef5ff] px-8 py-16">
      <div className="w-full max-w-5xl rounded-3xl bg-white p-10 text-center shadow-xl">
        {image && (
          <img
            src={image}
            alt="Startseite"
            className="mb-8 h-[320px] w-full rounded-3xl object-cover"
          />
        )}

        <h1
          className={`mb-3 font-extrabold text-blue-500 ${headlineFont} ${headlineSize}`}
        >
          {headline}
        </h1>

        <h2
          className={`mb-8 font-extrabold text-pink-500 ${dateFont} ${dateSize}`}
        >
          {date}
        </h2>

        <p
          className={`mb-8 font-bold text-slate-700 ${addressFont} ${addressSize}`}
        >
          {address}
        </p>

        <p
          className={`mx-auto max-w-3xl leading-8 text-slate-600 ${descriptionFont} ${descriptionSize}`}
        >
          {description}
        </p>
      </div>
    </main>
  );
}