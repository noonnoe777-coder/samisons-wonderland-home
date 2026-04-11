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
};

export default function SchreibwarenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDescription, setSelectedDescription] =
    useState<Product | null>(null);
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

      const schreibwarenProducts =
        data?.filter(
          (product) => product.category === "Schreibwaren"
        ) || [];

      setProducts(schreibwarenProducts);
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

      <div className="mx-auto max-w-[1800px] px-3 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-pink-500 sm:text-5xl md:text-6xl">
            Schreibwaren
          </h1>

          <div className="w-full md:w-[360px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Produkt suchen..."
              className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200 sm:px-5 sm:py-3 sm:text-sm"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center text-lg text-slate-500 shadow-lg">
            {search
              ? "Kein passendes Produkt gefunden."
              : "Noch keine Schreibwaren vorhanden."}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="mx-auto flex aspect-square h-auto w-full max-w-[115px] flex-col rounded-[20px] bg-white p-2 shadow-md transition hover:shadow-xl sm:max-w-none sm:min-h-[520px] sm:aspect-auto sm:p-4"
              >
                {product.image && (
                  <div className="mb-2 flex h-[80px] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 sm:mb-3 sm:h-[180px] sm:rounded-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                <div className="mb-2 flex items-start justify-between gap-1 sm:gap-2">
                  <h2 className="break-words text-[10px] font-bold leading-tight text-pink-500 sm:text-lg">
                    {product.name}
                  </h2>

                  <span className="shrink-0 whitespace-nowrap rounded-full bg-pink-100 px-1 py-0.5 text-[7px] font-bold text-pink-500 sm:px-2 sm:py-1 sm:text-[10px]">
                    Schreibwaren
                  </span>
                </div>

                <p className="mb-2 text-xs font-bold text-yellow-500 sm:mb-4 sm:text-xl">
                  {product.price}
                </p>

                <div className="flex-1" />

                <div className="space-y-1 sm:space-y-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                    <Link
                      href={`/bestellen/${product.id}`}
                      className="flex-1 rounded-lg bg-pink-500 px-2 py-2 text-center text-[8px] font-bold text-white transition hover:bg-pink-600 sm:rounded-xl sm:px-3 sm:py-3 sm:text-xs"
                    >
                      Jetzt bestellen
                    </Link>

                    <Link
                      href="/bewerten"
                      className="flex-1 rounded-lg bg-yellow-400 px-2 py-2 text-center text-[8px] font-bold text-white transition hover:bg-yellow-500 sm:rounded-xl sm:px-3 sm:py-3 sm:text-xs"
                    >
                      Bewerten
                    </Link>
                  </div>

                  <button
                    onClick={() => setSelectedDescription(product)}
                    className="w-full rounded-lg border border-pink-200 px-2 py-2 text-[8px] font-bold text-pink-500 transition hover:bg-pink-50 sm:rounded-xl sm:px-3 sm:py-3 sm:text-xs"
                  >
                    Beschreibung ansehen
                  </button>

                  {product.image && (
                    <button
                      onClick={() => setSelectedImage(product.image)}
                      className="w-full rounded-lg border border-blue-200 px-2 py-2 text-[8px] font-bold text-blue-500 transition hover:bg-blue-50 sm:rounded-xl sm:px-3 sm:py-3 sm:text-xs"
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
          <div className="relative w-full max-w-md rounded-[24px] bg-white p-4 shadow-2xl sm:p-6">
            <button
              onClick={() => setSelectedDescription(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-lg font-bold text-pink-500 transition hover:bg-pink-200"
            >
              ×
            </button>

            <h2 className="mb-4 pr-10 text-xl font-bold text-pink-500 sm:text-2xl">
              {selectedDescription.name}
            </h2>

            {selectedDescription.image && (
              <div className="mb-4 flex h-[140px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100 sm:h-[180px]">
                <img
                  src={selectedDescription.image}
                  alt={selectedDescription.name}
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <p className="mb-3 text-lg font-bold text-yellow-500 sm:text-xl">
              {selectedDescription.price}
            </p>

            <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
              {selectedDescription.description}
            </p>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-[24px] bg-white p-4 shadow-2xl sm:p-5">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-500 transition hover:bg-blue-200"
            >
              ×
            </button>

            <div className="flex h-[250px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-slate-100 sm:h-[500px]">
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