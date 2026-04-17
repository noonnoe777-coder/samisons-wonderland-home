"use client";

import { useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function StartseiteAdminPage() {
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
    "Willkommen bei SAMISON'S WONDERLAND – eure magische Spielzeugwelt voller Abenteuer, Farben und Spaß!"
  );
  const [descriptionFont, setDescriptionFont] = useState("font-sans");
  const [descriptionSize, setDescriptionSize] = useState("text-xl");

  const [image, setImage] = useState<string | null>(null);

  const fonts = [
    { label: "Standard", value: "font-sans" },
    { label: "Serif", value: "font-serif" },
    { label: "Monospace", value: "font-mono" },
    { label: "Fredoka Logo Style", value: fredoka.className },
  ];

  const textSizes = [
    { label: "Klein", value: "text-lg" },
    { label: "Mittel", value: "text-2xl" },
    { label: "Groß", value: "text-4xl" },
    { label: "Sehr groß", value: "text-6xl" },
    { label: "Extra groß", value: "text-7xl" },
  ];

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase
        .from("startseite")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setHeadline(data.headline || "Neueröffnung am");
        setHeadlineFont(data.headline_font || fredoka.className);
        setHeadlineSize(data.headline_size || "text-6xl");

        setDate(data.date || "15.11.2025!");
        setDateFont(data.date_font || fredoka.className);
        setDateSize(data.date_size || "text-5xl");

        setAddress(
          data.address ||
            "Besucht uns auf der Blumenstraße 7, 69168 Wiesloch Baden-Württemberg."
        );
        setAddressFont(data.address_font || "font-sans");
        setAddressSize(data.address_size || "text-3xl");

        setDescription(
          data.description ||
            "Willkommen bei SAMISON'S WONDERLAND – eure magische Spielzeugwelt voller Abenteuer, Farben und Spaß!"
        );
        setDescriptionFont(data.description_font || "font-sans");
        setDescriptionSize(data.description_size || "text-xl");

        setImage(data.image || null);
      }
    };

    loadData();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase
      .from("startseite")
      .upsert([
        {
          id: 1,
          headline,
          headline_font: headlineFont,
          headline_size: headlineSize,
          date,
          date_font: dateFont,
          date_size: dateSize,
          address,
          address_font: addressFont,
          address_size: addressSize,
          description,
          description_font: descriptionFont,
          description_size: descriptionSize,
          image,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Fehler beim Speichern");
      return;
    }

    alert("Startseite gespeichert!");
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <h1 className="mb-8 text-5xl font-bold text-green-500">
          Startseite bearbeiten
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-lg">
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Überschrift"
              className="rounded-2xl border border-slate-200 p-4"
            />

            <select
              value={headlineFont}
              onChange={(e) => setHeadlineFont(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {fonts.map((font) => (
                <option key={font.label} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>

            <select
              value={headlineSize}
              onChange={(e) => setHeadlineSize(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {textSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Datum"
              className="rounded-2xl border border-slate-200 p-4"
            />

            <select
              value={dateFont}
              onChange={(e) => setDateFont(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {fonts.map((font) => (
                <option key={font.label} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>

            <select
              value={dateSize}
              onChange={(e) => setDateSize(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {textSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Adresse"
              className="h-28 rounded-2xl border border-slate-200 p-4"
            />

            <select
              value={addressFont}
              onChange={(e) => setAddressFont(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {fonts.map((font) => (
                <option key={font.label} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>

            <select
              value={addressSize}
              onChange={(e) => setAddressSize(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {textSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibung"
              className="h-36 rounded-2xl border border-slate-200 p-4"
            />

            <select
              value={descriptionFont}
              onChange={(e) => setDescriptionFont(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {fonts.map((font) => (
                <option key={font.label} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>

            <select
              value={descriptionSize}
              onChange={(e) => setDescriptionSize(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {textSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();

                reader.onloadend = () => {
                  setImage(reader.result as string);
                };

                reader.readAsDataURL(file);
              }}
              className="rounded-2xl border border-slate-200 p-4"
            />

            <button
              onClick={handleSave}
              className="mt-2 rounded-2xl bg-green-500 px-6 py-4 font-bold text-white transition hover:bg-green-600"
            >
              Speichern
            </button>
          </div>

          <div className="flex flex-col items-center rounded-3xl bg-white p-10 text-center shadow-lg">
            {image && (
              <img
                src={image}
                alt="Startseite"
                className="mb-8 h-[250px] w-full rounded-3xl object-cover"
              />
            )}

            <h2
              className={`${headlineSize} mb-3 font-extrabold text-blue-500 ${headlineFont}`}
            >
              {headline}
            </h2>

            <h3
              className={`${dateSize} mb-8 font-extrabold text-pink-500 ${dateFont}`}
            >
              {date}
            </h3>

            <p
              className={`${addressSize} mb-8 font-bold text-slate-700 ${addressFont}`}
            >
              {address}
            </p>

            <p
  className={`${descriptionSize} max-w-2xl whitespace-pre-line leading-8 text-slate-600 ${descriptionFont}`}
>
  {description}
</p>
          </div>
        </div>
      </div>
    </main>
  );
}