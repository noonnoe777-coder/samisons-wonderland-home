"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

type Product = {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: string;
  description: string;
  images: string[];
  video: string | null;
  deliveryText: string;
  noReturn: boolean;
};

type FilterCategory = {
  id: number;
  name: string;
  slug: string;
};

export default function HeimwarePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("alle");
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
    []
  );

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

    const loadData = async () => {
      const { data: productData, error: productError } = await supabase
        .from("spielzeuge")
        .select("*");

      if (productError) {
        console.error(productError);
        return;
      }

      const heimwareProducts =
        productData?.filter(
          (product: Product) => product.category === "Heimware"
        ) || [];

      setProducts(heimwareProducts);

      const { data: filterData, error: filterError } = await supabase
        .from("heimware_filter_kategorien")
        .select("*")
        .order("name", { ascending: true });

      if (filterError) {
        console.error(filterError);
        return;
      }

      setFilterCategories(filterData || []);
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        selectedFilter === "alle" ||
        product.subcategory === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [products, search, selectedFilter]);

  const toggleFavorite = (product: Product) => {
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
      (item: { id: number }) => item.id === product.id
    );

    let updated;

    if (exists) {
      updated = current.filter(
        (item: { id: number }) => item.id !== product.id
      );
    } else {
      updated = [...current, savedProduct];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));

    setFavorites((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-[1800px] px-3 py-6 sm:px-5 lg:px-8">
        <div className="mb-8 flex flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-3xl font-bold text-pink-500 sm:text-5xl">
              Heimware
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

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter("alle")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedFilter === "alle"
                  ? "bg-pink-500 text-white"
                  : "border border-pink-200 bg-white text-pink-500 hover:bg-pink-50"
              }`}
            >
              Alle
            </button>

            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.slug)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  selectedFilter === category.slug
                    ? "bg-pink-500 text-white"
                    : "border border-pink-200 bg-white text-pink-500 hover:bg-pink-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center text-lg text-slate-500 shadow-lg">
            Kein passendes Produkt gefunden.
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
                      onClick={() => toggleFavorite(product)}
                      className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg"
                    >
                      {favorites[product.id] ? "❤️" : "🤍"}
                    </button>

                    {product.video && (
                      <button
                        onClick={() => setSelectedVideo(product.video)}
                        className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-lg font-bold text-white"
                      >
                        ▶
                      </button>
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h2 className="text-sm font-bold text-pink-500 sm:text-lg">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-lg font-bold text-yellow-500">
                    {product.price}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-pink-100 px-2 py-1 text-[10px] font-bold text-pink-500">
                      Heimware
                    </span>

                    {product.subcategory && (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-500">
                        {product.subcategory}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-700">
                    <p>📦 {product.deliveryText}</p>

                    {product.noReturn && (
                      <p className="mt-1">⚠️ Keine Rückannahme möglich</p>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    <textarea
                      value={notes[product.id] || ""}
                      onChange={(e) =>
                        setNotes((prev) => ({
                          ...prev,
                          [product.id]: e.target.value,
                        }))
                      }
                      placeholder="Wünsche..."
                      className="min-h-[80px] w-full rounded-xl border-2 border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none focus:border-pink-400"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [product.id]: Math.max(
                              (prev[product.id] || 1) - 1,
                              1
                            ),
                          }))
                        }
                        className="h-8 w-8 rounded-lg bg-pink-100 font-bold text-pink-500"
                      >
                        -
                      </button>

                      <span className="min-w-[20px] text-center font-bold">
                        {quantities[product.id] || 1}
                      </span>

                      <button
                        onClick={() =>
                          setQuantities((prev) => ({
                            ...prev,
                            [product.id]: (prev[product.id] || 1) + 1,
                          }))
                        }
                        className="h-8 w-8 rounded-lg bg-pink-100 font-bold text-pink-500"
                      >
                        +
                      </button>
                    </div>

                    <Link
                      href={`/bestellen/${product.id}`}
                      className="block w-full rounded-xl bg-pink-500 px-3 py-2 text-center text-sm font-bold text-white hover:bg-pink-600"
                    >
                      Bestellen
                    </Link>

                    <button
                      onClick={() => setSelectedDescription(product)}
                      className="w-full rounded-xl border-2 border-pink-200 px-3 py-2 text-sm font-bold text-pink-500 hover:bg-pink-50"
                    >
                      Beschreibung
                    </button>

                    {product.images?.length > 0 && (
                      <button
                        onClick={() => {
                          setSelectedImageProduct(product);
                          setCurrentImageIndex(0);
                        }}
                        className="w-full rounded-xl border-2 border-blue-200 px-3 py-2 text-sm font-bold text-blue-500 hover:bg-blue-50"
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
      </div>
    </main>
  );
}