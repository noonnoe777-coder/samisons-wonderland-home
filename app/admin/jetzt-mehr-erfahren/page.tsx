"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { Fredoka } from "next/font/google";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type JetztMehrErfahrenData = {
  title: string;
  titleFont: string;
  titleSize: string;
  text: string;
  textFont: string;
  textSize: string;
  images: string[];
};

export default function JetztMehrErfahrenAdminPage() {
  const [title, setTitle] = useState<string>("Unsere magische Welt");
  const [titleFont, setTitleFont] = useState<string>(fredoka.className);
  const [titleSize, setTitleSize] = useState<string>("text-6xl");

  const [text, setText] = useState<string>(
    "Bei SAMISON'S WONDERLAND erwartet euch eine bunte Welt voller Spielzeug, Abenteuer und Spaß!"
  );
  const [textFont, setTextFont] = useState<string>("font-sans");
  const [textSize, setTextSize] = useState<string>("text-2xl");

  const [images, setImages] = useState<string[]>([]);

  const fonts = [
    { label: "Standard", value: "font-sans" },
    { label: "Serif", value: "font-serif" },
    { label: "Monospace", value: "font-mono" },
    { label: "Fredoka", value: fredoka.className },
  ];

  const sizes = [
    { label: "Klein", value: "text-xl" },
    { label: "Mittel", value: "text-3xl" },
    { label: "Groß", value: "text-5xl" },
    { label: "Sehr groß", value: "text-6xl" },
    { label: "Extra groß", value: "text-7xl" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("jetztMehrErfahrenData");

    if (saved) {
      const data: JetztMehrErfahrenData = JSON.parse(saved);

      setTitle(data.title || "Unsere magische Welt");
      setTitleFont(data.titleFont || fredoka.className);
      setTitleSize(data.titleSize || "text-6xl");

      setText(
        data.text ||
          "Bei SAMISON'S WONDERLAND erwartet euch eine bunte Welt voller Spielzeug, Abenteuer und Spaß!"
      );
      setTextFont(data.textFont || "font-sans");
      setTextSize(data.textSize || "text-2xl");

      setImages(data.images || []);
    }
  }, []);

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = Array.from(e.target.files || []).slice(0, 5);

    const imagePromises = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            resolve(reader.result as string);
          };

          reader.readAsDataURL(file);
        })
    );

    const uploadedImages = await Promise.all(imagePromises);
    setImages(uploadedImages);
  };

  const handleSave = (): void => {
    const data: JetztMehrErfahrenData = {
      title,
      titleFont,
      titleSize,
      text,
      textFont,
      textSize,
      images,
    };

    localStorage.setItem(
      "jetztMehrErfahrenData",
      JSON.stringify(data)
    );

    alert("Jetzt mehr erfahren Seite gespeichert!");
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <h1 className="mb-8 text-5xl font-bold text-green-500">
          Jetzt mehr erfahren bearbeiten
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-lg">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titel"
              className="rounded-2xl border border-slate-200 p-4"
            />

            <select
              value={titleFont}
              onChange={(e) => setTitleFont(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {fonts.map((font) => (
                <option key={font.value} value={font.value}>
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
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Beschreibung"
              className="h-64 rounded-2xl border border-slate-200 p-4"
            />

            <select
              value={textFont}
              onChange={(e) => setTextFont(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {fonts.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>

            <select
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
              className="rounded-2xl border border-slate-200 p-4"
            >
              {sizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="rounded-2xl border border-slate-200 p-4"
            />

            <p className="text-sm text-slate-500">
              Du kannst bis zu 5 Bilder hochladen.
            </p>

            <button
              onClick={handleSave}
              className="rounded-2xl bg-green-500 py-4 text-xl font-bold text-white transition hover:bg-green-600"
            >
              Speichern
            </button>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2
              className={`mb-6 font-extrabold text-pink-500 ${titleFont} ${titleSize}`}
            >
              {title}
            </h2>

            <p
              className={`mb-10 leading-10 text-slate-700 ${textFont} ${textSize}`}
            >
              {text}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Bild ${index + 1}`}
                  className="h-52 w-full rounded-3xl object-cover shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}