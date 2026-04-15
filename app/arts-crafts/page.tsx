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
  images: string[];
  video: string | null;
  deliveryText: string;
  noReturn: boolean;
};

export default function ArtsCraftsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const [selectedDescription, setSelectedDescription] =
    useState<Product | null>(null);

  const [selectedImageProduct, setSelectedImageProduct] =
    useState<Product | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [giftWrap, setGiftWrap] = useState<Record<number, boolean>>({});
  const [engraving, setEngraving] = useState<Record<number, boolean>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const favoriteMap: Record<number, boolean> = {};

    savedFavorites.forEach((item: { id: number }) => {
      favoriteMap[item.id] = true;
    });

    setFavorites(favoriteMap);

    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("spielzeuge")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      const artsCraftsProducts =
        data?.filter(
          (product: Product) => product.category === "Arts & Crafts"
        ) || [];

      setProducts(artsCraftsProducts);
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

      <div className="mx-auto max-w-[1800px] px-3 py-6 sm:px-5 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-pink-500 sm:text-5xl">
            Arts & Crafts
          </h1>

          <div className="w-full lg:w-[420px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Produkt suchen..."
              className="w-full rounded-3xl border border-pink-200 bg-white px-5 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200 sm:text-base"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center text-lg text-slate-500 shadow-lg">
            {search
              ? "Kein passendes Produkt gefunden."
              : "Noch keine Arts & Crafts Produkte vorhanden."}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex w-full flex-col overflow-hidden rounded-[24px] bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                {product.images?.[0] && (
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                    <button
                      onClick={() => {
                        const savedProduct = {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          images: product.images,
                        };

                        const current = JSON.parse(
                          localStorage.getItem("favorites") || "[]"
                        );

                        const exists = current.some(
                          (item: { id: number }) =>
                            item.id === product.id
                        );

                        let updated;

                        if (exists) {
                          updated = current.filter(
                            (item: { id: number }) =>
                              item.id !== product.id
                          );
                        } else {
                          updated = [...current, savedProduct];
                        }

                        localStorage.setItem(
                          "favorites",
                          JSON.stringify(updated)
                        );

                        setFavorites((prev) => ({
                          ...prev,
                          [product.id]: !prev[product.id],
                        }));
                      }}
                      className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg transition hover:scale-110"
                    >
                      {favorites[product.id] ? "❤️" : "🤍"}
                    </button>

                    {product.video && (
                      <button
                        onClick={() => setSelectedVideo(product.video)}
                        className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-lg font-bold text-white transition hover:scale-110"
                      >
                        ▶
                      </button>
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="line-clamp-2 text-sm font-bold leading-tight text-pink-500 sm:text-lg">
                        {product.name}
                      </h2>

                      <p className="mt-1 text-lg font-bold text-yellow-500 sm:text-xl">
                        {product.price}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-pink-100 px-2 py-1 text-[10px] font-bold text-pink-500 sm:text-xs">
                      Arts & Crafts
                    </span>
                  </div>

                  <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-700 sm:text-sm">
                    <p className="mb-1">📦 {product.deliveryText}</p>

                    {product.noReturn && (
                      <p>⚠️ Keine Rückannahme möglich</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-[10px] font-medium text-slate-700 sm:text-xs">
                      <input
                        type="checkbox"
                        checked={giftWrap[product.id] || false}
                        onChange={(e) =>
                          setGiftWrap((prev) => ({
                            ...prev,
                            [product.id]: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 accent-pink-500"
                      />
                      Geschenk (+5€)
                    </label>

                    <label className="flex items-center gap-2 rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-[10px] font-medium text-slate-700 sm:text-xs">
                      <input
                        type="checkbox"
                        checked={engraving[product.id] || false}
                        onChange={(e) =>
                          setEngraving((prev) => ({
                            ...prev,
                            [product.id]: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 accent-pink-500"
                      />
                      Gravur (+10€)
                    </label>

                    <textarea
                      value={notes[product.id] || ""}
                      onChange={(e) =>
                        setNotes((prev) => ({
                          ...prev,
                          [product.id]: e.target.value,
                        }))
                      }
                      placeholder="Wünsche..."
                      className="min-h-[70px] w-full rounded-xl border-2 border-pink-200 bg-pink-50 px-3 py-2 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:bg-white sm:min-h-[90px] sm:text-sm"
                    />

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex items-center rounded-xl border border-pink-200 bg-pink-50 px-1 py-1">
                        <button
                          onClick={() => {
                            setQuantities((prev) => ({
                              ...prev,
                              [product.id]: Math.max(
                                (prev[product.id] || 1) - 1,
                                1
                              ),
                            }));
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-pink-500 transition hover:bg-pink-100"
                        >
                          -
                        </button>

                        <span className="mx-2 min-w-[18px] text-center text-sm font-bold text-slate-700">
                          {quantities[product.id] || 1}
                        </span>

                        <button
                          onClick={() => {
                            setQuantities((prev) => ({
                              ...prev,
                              [product.id]: (prev[product.id] || 1) + 1,
                            }));
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-pink-500 transition hover:bg-pink-100"
                        >
                          +
                        </button>
                      </div>

                      <Link
                        href={`/bestellen/${product.id}?menge=${
                          quantities[product.id] || 1
                        }&notiz=${encodeURIComponent(
                          notes[product.id] || ""
                        )}&geschenk=${
                          giftWrap[product.id] || false
                        }&gravur=${
                          engraving[product.id] || false
                        }`}
                        className="w-full sm:flex-1 rounded-xl bg-pink-500 px-3 py-2 text-center text-[11px] font-bold text-white transition hover:bg-pink-600 sm:text-sm"
                      >
                        Bestellen
                      </Link>
                    </div>

                    <button
                      onClick={() => {
                        const savedProduct = {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          images: product.images,
                        };

                        const current = JSON.parse(
                          localStorage.getItem("favorites") || "[]"
                        );

                        const exists = current.some(
                          (item: { id: number }) =>
                            item.id === product.id
                        );

                        let updated;

                        if (exists) {
                          updated = current.filter(
                            (item: { id: number }) =>
                              item.id !== product.id
                          );
                        } else {
                          updated = [...current, savedProduct];
                        }

                        localStorage.setItem(
                          "favorites",
                          JSON.stringify(updated)
                        );

                        setFavorites((prev) => ({
                          ...prev,
                          [product.id]: !prev[product.id],
                        }));
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-pink-200 px-3 py-2 text-[11px] font-bold text-pink-500 transition hover:bg-pink-50 sm:text-sm"
                    >
                      <span className="text-lg">
                        {favorites[product.id] ? "❤️" : "🤍"}
                      </span>

                      {favorites[product.id] ? "Gemerkt" : "Merken"}
                    </button>

                    <Link
                      href="/bewerten"
                      className="block w-full rounded-xl bg-yellow-400 px-3 py-2 text-center text-[11px] font-bold text-white transition hover:bg-yellow-500 sm:text-sm"
                    >
                      Bewerten
                    </Link>

                    <button
                      onClick={() => setSelectedDescription(product)}
                      className="w-full rounded-xl border-2 border-pink-200 px-3 py-2 text-[11px] font-bold text-pink-500 transition hover:bg-pink-50 sm:text-sm"
                    >
                      Beschreibung
                    </button>

                    {product.images?.length > 0 && (
                      <button
                        onClick={() => {
                          setSelectedImageProduct(product);
                          setCurrentImageIndex(0);
                        }}
                        className="w-full rounded-xl border-2 border-blue-200 px-3 py-2 text-[11px] font-bold text-blue-500 transition hover:bg-blue-50 sm:text-sm"
                      >
                        Produktbilder ({product.images.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedDescription && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg rounded-[32px] bg-white p-6 shadow-2xl">
              <button
                onClick={() => setSelectedDescription(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-xl font-bold text-pink-500"
              >
                ×
              </button>

              <h2 className="mb-5 pr-12 text-2xl font-bold text-pink-500">
                {selectedDescription.name}
              </h2>

              {selectedDescription.images?.[0] && (
                <img
                  src={selectedDescription.images[0]}
                  alt={selectedDescription.name}
                  className="mb-5 h-72 w-full rounded-3xl object-cover"
                />
              )}

              <p className="mb-3 text-2xl font-bold text-yellow-500">
                {selectedDescription.price}
              </p>

              <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <p className="mb-1">
                  📦 {selectedDescription.deliveryText}
                </p>

                {selectedDescription.noReturn && (
                  <p>⚠️ Keine Rückannahme möglich</p>
                )}
              </div>

              <p className="text-sm leading-7 text-slate-600">
                {selectedDescription.description}
              </p>
            </div>
          </div>
        )}

        {selectedImageProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelectedImageProduct(null)}
          >
            <div
              className="relative w-full max-w-5xl rounded-[32px] bg-white p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImageProduct(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-500"
              >
                ×
              </button>

              <div className="relative">
                <img
                  src={selectedImageProduct.images[currentImageIndex]}
                  alt={selectedImageProduct.name}
                  className="max-h-[80vh] w-full rounded-3xl object-contain bg-white"
                />

                {selectedImageProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0
                            ? selectedImageProduct.images.length - 1
                            : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg"
                    >
                      ←
                    </button>

                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === selectedImageProduct.images.length - 1
                            ? 0
                            : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {selectedImageProduct.images.length > 1 && (
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  {selectedImageProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`overflow-hidden rounded-2xl border-4 ${
                        currentImageIndex === index
                          ? "border-pink-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Bild ${index + 1}`}
                        className="h-20 w-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-[32px] bg-white p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black text-xl font-bold text-white"
              >
                ×
              </button>

              <video controls autoPlay className="w-full rounded-3xl">
                <source src={selectedVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}