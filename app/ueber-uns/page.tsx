"use client";

import { useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function UeberUnsPage() {
  const [title, setTitle] = useState(
    "Willkommen bei SAMISON'S WONDERLAND"
  );
  const [titleFont, setTitleFont] = useState(fredoka.className);
  const [titleSize, setTitleSize] = useState("text-4xl");

  const [description, setDescription] = useState(
    "Hier findest du liebevoll ausgewähltes Spielzeug und wunderschöne Schreibwaren für Kinder. Unser Ziel ist es, Kindern Freude zu schenken und Eltern hochwertige Produkte anzubieten."
  );
  const [descriptionFont, setDescriptionFont] = useState("font-sans");
  const [descriptionSize, setDescriptionSize] = useState("text-xl");

  const [image, setImage] = useState<string | null>("/ueber-uns/shop.jpg");
  const [video, setVideo] = useState<string | null>(
    "/ueber-uns/shop-video.mp4"
  );

  useEffect(() => {
    const savedData = localStorage.getItem("ueberUns");

    if (!savedData) return;

    const data = JSON.parse(savedData);

    setTitle(data.title || "Willkommen bei SAMISON'S WONDERLAND");
    setTitleFont(data.titleFont || fredoka.className);
    setTitleSize(data.titleSize || "text-4xl");

    setDescription(
      data.description ||
        "Hier findest du liebevoll ausgewähltes Spielzeug und wunderschöne Schreibwaren für Kinder. Unser Ziel ist es, Kindern Freude zu schenken und Eltern hochwertige Produkte anzubieten."
    );
    setDescriptionFont(data.descriptionFont || "font-sans");
    setDescriptionSize(data.descriptionSize || "text-xl");

    setImage(data.image || "/ueber-uns/shop.jpg");
    setVideo(data.video || "/ueber-uns/shop-video.mp4");
  }, []);

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-8 py-10">
        <h1 className="mb-8 text-5xl font-bold text-pink-500">
          Über uns
        </h1>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          {image && (
            <img
              src={image}
              alt="Samison's Wonderland"
              className="mb-8 h-[350px] w-full rounded-3xl object-cover"
            />
          )}

          
          <h2
            className={`mb-5 font-extrabold text-blue-500 ${titleFont} ${titleSize}`}
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
    </main>
  );
}