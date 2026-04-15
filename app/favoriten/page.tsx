"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/Navbar";

type FavoriteProduct = {
  id: number;
  name: string;
  price: string;
  images: string[];
};

export default function FavoritenPage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((product) => product.id !== id);

    setFavorites(updated);

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-bold text-pink-500">
          Deine Favoriten ❤️
        </h1>

        {favorites.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="mb-4 text-lg text-slate-500">
              Du hast noch keine Produkte gemerkt.
            </p>

            <Link
              href="/"
              className="rounded-2xl bg-pink-500 px-6 py-3 font-bold text-white"
            >
              Produkte ansehen
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg"
              >
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-64 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  <h2 className="mb-2 text-xl font-bold text-pink-500">
                    {product.name}
                  </h2>

                  <p className="mb-5 text-lg font-bold text-yellow-500">
                    {product.price}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/bestellen/${product.id}`}
                      className="flex-1 rounded-2xl bg-pink-500 px-4 py-3 text-center font-bold text-white"
                    >
                      Bestellen
                    </Link>

                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="rounded-2xl border border-pink-200 px-4 py-3 text-2xl"
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}