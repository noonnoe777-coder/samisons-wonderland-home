"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string | null;
  video: string | null;
};

export default function SpielzeugePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDescription, setSelectedDescription] = useState<Product | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("spielzeuge")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        const spielzeugProducts = data.filter(
          (product) => product.category === "Spielzeug"
        );

        setProducts(spielzeugProducts);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-[1800px] px-6 py-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-5xl font-bold text-pink-500 md:text-6xl">
            Spielzeug
          </h1>

          <div className="w-full md:w-[360px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Produkt suchen..."
              className="w-full rounded-2xl border border-pink-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center text-lg text-slate-500 shadow-lg">
            {search
              ? "Kein passendes Produkt gefunden."
              : "Noch keine Spielzeuge vorhanden."}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex h-full min-h-[520px] flex-col rounded-[24px] bg-white p-4 shadow-md transition hover:shadow-xl"
              >
                {product.image && (
                  <div className="mb-3 flex h-[180px] w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                {product.video && (
                  <div className="mb-3 overflow-hidden rounded-2xl">
                    <video
                      controls
                      className="h-[180px] w-full rounded-2xl object-cover"
                    >
                      <source src={product.video} type="video/mp4" />
                    </video>
                  </div>
                )}

                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="break-words text-lg font-bold leading-tight text-pink-500">
                    {product.name}
                  </h2>

                  <span className="shrink-0 whitespace-nowrap rounded-full bg-pink-100 px-2 py-1 text-[10px] font-bold text-pink-500">
                    Spielzeug
                  </span>
                </div>

                <p className="mb-4 text-xl font-bold text-yellow-500">
                  {product.price}
                </p>

                <div className="flex-1" />

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/bestellen/${product.id}`}
                      className="flex-1 rounded-xl bg-pink-500 px-3 py-3 text-center text-xs font-bold text-white transition hover:bg-pink-600"
                    >
                      Jetzt bestellen
                    </Link>

                    <Link
                      href="/bewerten"
                      className="flex-1 rounded-xl bg-yellow-400 px-3 py-3 text-center text-xs font-bold text-white transition hover:bg-yellow-500"
                    >
                      Bewerten
                    </Link>
                  </div>

                  <button
                    onClick={() => setSelectedDescription(product)}
                    className="w-full rounded-xl border border-pink-200 px-3 py-3 text-xs font-bold text-pink-500 transition hover:bg-pink-50"
                  >
                    Beschreibung ansehen
                  </button>

                  {product.image && (
                    <button
                      onClick={() => setSelectedImage(product.image)}
                      className="w-full rounded-xl border border-blue-200 px-3 py-3 text-xs font-bold text-blue-500 transition hover:bg-blue-50"
                    >
                      Produktbild ansehen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedDescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl">
            <button
              onClick={() => setSelectedDescription(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-lg font-bold text-pink-500 transition hover:bg-pink-200"
            >
              ×
            </button>

            <h2 className="mb-4 pr-10 text-2xl font-bold text-pink-500">
              {selectedDescription.name}
            </h2>

            {selectedDescription.image && (
              <div className="mb-4 flex h-[180px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={selectedDescription.image}
                  alt={selectedDescription.name}
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <p className="mb-3 text-xl font-bold text-yellow-500">
              {selectedDescription.price}
            </p>

            <p className="text-sm leading-6 text-slate-600">
              {selectedDescription.description}
            </p>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-[24px] bg-white p-5 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-500 transition hover:bg-blue-200"
            >
              ×
            </button>

            <div className="flex h-[500px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-slate-100">
              <img
                src={selectedImage}
                alt="Produktbild"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}