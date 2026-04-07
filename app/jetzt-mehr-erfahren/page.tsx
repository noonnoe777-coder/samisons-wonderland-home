"use client";

import { useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import Navbar from "@/Components/Navbar";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type JetztMehrErfahrenData = {
  title?: string;
  titleFont?: string;
  titleSize?: string;
  text?: string;
  textFont?: string;
  textSize?: string;
  images?: string[];
};

export default function JetztMehrErfahrenPage() {
  const [title, setTitle] = useState("Unsere magische Welt");
  const [titleFont, setTitleFont] = useState(fredoka.className);
  const [titleSize, setTitleSize] = useState("text-6xl");

  const [text, setText] = useState(
    "Bei SAMISON'S WONDERLAND erwartet euch eine bunte Welt voller Spielzeug, Abenteuer und Spaß!"
  );
  const [textFont, setTextFont] = useState("font-sans");
  const [textSize, setTextSize] = useState("text-2xl");

  const [images, setImages] = useState<string[]>([]);

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

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl bg-white p-10 shadow-2xl">
          <h1
            className={`mb-8 text-center font-extrabold text-pink-500 ${titleFont} ${titleSize}`}
          >
            {title}
          </h1>

          <p
            className={`mx-auto mb-12 max-w-4xl text-center leading-10 text-slate-700 ${textFont} ${textSize}`}
          >
            {text}
          </p>

          {images.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Bild ${index + 1}`}
                  className="h-72 w-full rounded-3xl object-cover shadow-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}