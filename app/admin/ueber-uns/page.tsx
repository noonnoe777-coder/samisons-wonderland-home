"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function UeberUnsAdminPage() {
  const [title, setTitle] = useState(
    "Willkommen bei SAMISON'S WONDERLAND"
  );
  const [titleFont, setTitleFont] = useState(fredoka.className);
  const [titleSize, setTitleSize] = useState("text-4xl");

  const [description, setDescription] = useState(
    "Hier findest du liebevoll ausgewähltes Spielzeug und wunderschöne Schreibwaren für Kinder."
  );
  const [descriptionFont, setDescriptionFont] = useState("font-sans");
  const [descriptionSize, setDescriptionSize] = useState("text-xl");

  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  const fonts = [
    { label: "Standard", value: "font-sans" },
    { label: "Serif", value: "font-serif" },
    { label: "Monospace", value: "font-mono" },
    { label: "Fredoka Logo Style", value: fredoka.className },
  ];

  const sizes = [
    { label: "Sehr klein", value: "text-sm" },
    { label: "Klein", value: "text-lg" },
    { label: "Mittel", value: "text-xl" },
    { label: "Groß", value: "text-3xl" },
    { label: "Sehr groß", value: "text-4xl" },
    { label: "Extra groß", value: "text-5xl" },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("ueberUns");

    if (!savedData) return;

    const data = JSON.parse(savedData);

    setTitle(data.title || "Willkommen bei SAMISON'S WONDERLAND");
    setTitleFont(data.titleFont || fredoka.className);
    setTitleSize(data.titleSize || "text-4xl");

    setDescription(
      data.description ||
        "Hier findest du liebevoll ausgewähltes Spielzeug und wunderschöne Schreibwaren für Kinder."
    );
    setDescriptionFont(data.descriptionFont || "font-sans");
    setDescriptionSize(data.descriptionSize || "text-xl");

    setImage(data.image || null);
    setVideo(data.video || null);
  }, []);

  const handleSave = () => {
    const data = {
      title,
      titleFont,
      titleSize,
      description,
      descriptionFont,
      descriptionSize,
      image,
      video,
    };

    localStorage.setItem("ueberUns", JSON.stringify(data));

    alert("Erfolgreich gespeichert!");
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-5xl font-bold text-pink-500">
            Über uns bearbeiten
          </h1>

          <Link
            href="/admin"
            className="rounded-full bg-yellow-400 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-yellow-500"
          >
            Zurück zu Admin
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-lg">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titel"
              className="rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-pink-400"
            />

            <select
              value={titleFont}
              onChange={(e) => setTitleFont(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {fonts.map((font) => (
                <option key={font.label} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>

            <select
              value={titleSize}
              onChange={(e) => setTitleSize(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {sizes.map((size) => (
                <option key={size.label} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibung"
              className="h-40 rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-pink-400"
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
              {sizes.map((size) => (
                <option key={size.label} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-slate-700">
                Bild hochladen
              </label>

              <input
                type="file"
                accept="image/*"
                className="rounded-2xl border border-slate-200 p-4"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();

                  reader.onloadend = () => {
                    setImage(reader.result as string);
                  };

                  reader.readAsDataURL(file);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-slate-700">
                Video hochladen
              </label>

              <input
                type="file"
                accept="video/*"
                className="rounded-2xl border border-slate-200 p-4"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();

                  reader.onloadend = () => {
                    setVideo(reader.result as string);
                  };

                  reader.readAsDataURL(file);
                }}
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-4 rounded-2xl bg-pink-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-600"
            >
              Speichern
            </button>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            {image ? (
              <img
                src={image}
                alt="Über uns"
                className="mb-6 h-[300px] w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="mb-6 flex h-[300px] w-full items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                Noch kein Bild hochgeladen
              </div>
            )}

            {video && (
              <video controls className="mb-6 w-full rounded-3xl">
                <source src={video} />
              </video>
            )}

            <h2
              className={`mb-4 font-extrabold text-blue-500 ${titleFont} ${titleSize}`}
            >
              {title}
            </h2>

            <p
              className={`leading-9 text-slate-700 ${descriptionFont} ${descriptionSize}`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}