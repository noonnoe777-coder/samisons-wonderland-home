"use client";

import { JSX, useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import { supabase } from "@/app/lib/supabase";

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
    const loadStartseite = async () => {
      const { data, error } = await supabase
        .from("startseite_data")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      if (!data) return;

      setHeadline(data.headline || "Neueröffnung am");
      setHeadlineFont(data.headline_font || fredoka.className);

      setDate(data.date || "15.11.2025!");
      setDateFont(data.date_font || fredoka.className);

      setAddress(
        data.address ||
          "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg."
      );
      setAddressFont(data.address_font || "font-sans");

      setDescription(
        data.description ||
          "Willkommen bei SAMISON'S WONDERLAND – eure magische Spielzeugwelt voller Abenteuer, Farben und Spaß!"
      );
      setDescriptionFont(data.description_font || "font-sans");

      setImage(data.image || null);
    };

    loadStartseite();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef5ff] px-3 py-4">
      <div className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-4 text-center shadow-xl md:p-10">
        {image && (
          <img
            src={image}
            alt="Startseite"
            className="mb-6 h-auto max-h-[320px] w-full rounded-3xl object-cover"
          />
        )}

        <h1
          className={`mb-2 text-3xl font-extrabold text-blue-500 sm:text-4xl md:text-6xl ${headlineFont}`}
        >
          {headline}
        </h1>

        <h2
          className={`mb-6 text-2xl font-extrabold text-pink-500 sm:text-3xl md:text-5xl ${dateFont}`}
        >
          {date}
        </h2>

        <p
          className={`mb-6 text-lg font-bold text-slate-700 sm:text-xl md:text-3xl ${addressFont}`}
        >
          {address}
        </p>

        <p
          className={`text-base text-slate-600 sm:text-lg md:text-xl ${descriptionFont}`}
        >
          {description}
        </p>
      </div>
    </main>
  );
}