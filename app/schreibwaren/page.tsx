"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/Navbar";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string | null;
  video: string | null;
};

export default function SchreibwarenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<Product | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      const parsedProducts: Product[] = JSON.parse(savedProducts);

      const schreibwarenProducts = parsedProducts.filter(
        (product) => product.category === "Schreibwaren"
      );

      setProducts(schreibwarenProducts);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-[1800px] px-6 py-8">
        <h1 className="mb-10 text-5xl md:text-6xl font-bold text-pink-500">
          Schreibwaren
        </h1>

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center text-lg text-slate-500 shadow-lg">
            Noch keine Schreibwaren vorhanden.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="aspect-square min-h-[520px] rounded-[24px] bg-white p-4 shadow-md transition hover:shadow-xl flex flex-col"
              >
                {product.image && (
                  <div className="mb-3 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}

                {product.video && (
                  <div className="mb-3 overflow-hidden rounded-2xl">
                    <video controls className="w-full rounded-2xl">
                      <source src={product.video} type="video/mp4" />
                    </video>
                  </div>
                )}

                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="text-lg font-bold leading-tight text-pink-500">
                    {product.name}
                  </h2>

                  <span className="rounded-full bg-pink-100 px-2 py-1 text-[10px] font-bold text-pink-500 whitespace-nowrap">
                    Schreibwaren
                  </span>
                </div>

                <p className="mb-3 text-xl font-bold text-yellow-500">
                  {product.price}
                </p>

                <div className="mt-auto space-y-2">
                  <div className="flex gap-2">
                    <Link
                      href={`/bestellen/${product.id}`}
                      className="flex-1 rounded-xl bg-pink-500 px-2 py-2 text-[10px] font-bold text-white text-center transition hover:bg-pink-600"
                    >
                      Jetzt bestellen
                    </Link>

                    <Link
                      href="/bewerten"
                      className="flex-1 rounded-xl bg-yellow-400 px-2 py-2 text-[10px] font-bold text-white text-center transition hover:bg-yellow-500"
                    >
                      Bewerten
                    </Link>
                  </div>

                  <button
                    onClick={() => setSelectedDescription(product)}
                    className="w-full rounded-xl border border-pink-200 px-2 py-2 text-[10px] font-bold text-pink-500 transition hover:bg-pink-50"
                  >
                    Beschreibung ansehen
                  </button>

                  {product.image && (
                    <button
                      onClick={() => setSelectedImage(product.image)}
                      className="w-full rounded-xl border border-blue-200 px-2 py-2 text-[10px] font-bold text-blue-500 transition hover:bg-blue-50"
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
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-lg font-bold text-pink-500 hover:bg-pink-200"
            >
              ×
            </button>

            <h2 className="mb-4 text-2xl font-bold text-pink-500">
              {selectedDescription.name}
            </h2>

            {selectedDescription.image && (
              <div className="mb-4 flex h-[180px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={selectedDescription.image}
                  alt={selectedDescription.name}
                  className="max-h-full max-w-full object-contain"
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
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-500 hover:bg-blue-200"
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