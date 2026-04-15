"use client";

import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

type ProductCategory = "Spielzeug" | "Schreibwaren";

type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: string;
  description: string;
  images: string[];
  video: string | null;
  deliveryText: string;
  noReturn: boolean;
};

export default function ProdukteAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [category, setCategory] =
    useState<ProductCategory>("Spielzeug");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);

  const [deliveryText, setDeliveryText] = useState(
    "Lieferzeit: 1 Woche"
  );
  const [noReturn, setNoReturn] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("spielzeuge")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts((data as Product[]) || []);
  };

  const addProduct = async () => {
    if (!name || !price || !description || images.length === 0) {
      alert("Bitte Name, Preis, Beschreibung und Bilder eingeben.");
      return;
    }

    const { error } = await supabase.from("spielzeuge").insert([
      {
        name,
        category,
        price,
        description,
        images,
        video,
        deliveryText,
        noReturn,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Fehler beim Speichern");
      return;
    }

    setName("");
    setCategory("Spielzeug");
    setPrice("");
    setDescription("");
    setImages([]);
    setVideo(null);
    setDeliveryText("Lieferzeit: 1 Woche");
    setNoReturn(true);

    loadProducts();

    alert("Produkt gespeichert");
  };

  const deleteProduct = async (id: number) => {
    const { error } = await supabase
      .from("spielzeuge")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Fehler beim Löschen");
      return;
    }

    loadProducts();
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <h1 className="mb-8 text-5xl font-bold text-pink-500">
          Produkte verwalten
        </h1>

        <div className="max-w-[700px] rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-blue-500">
              Neues Produkt
            </h2>

            <input
              type="text"
              placeholder="Produktname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as ProductCategory)
              }
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            >
              <option value="Spielzeug">Spielzeug</option>
              <option value="Schreibwaren">Schreibwaren</option>
            </select>

            <input
              type="text"
              placeholder="Preis"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

            <textarea
              placeholder="Beschreibung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

            <input
              type="text"
              value={deliveryText}
              onChange={(e) => setDeliveryText(e.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={noReturn}
                onChange={(e) => setNoReturn(e.target.checked)}
              />
              Keine Rückannahme möglich
            </label>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-3 text-sm font-bold text-slate-700">
                Mehrere Bilder hochladen
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);

                  Promise.all(
                    files.map(
                      (file) =>
                        new Promise<string>((resolve) => {
                          const reader = new FileReader();

                          reader.onloadend = () => {
                            resolve(reader.result as string);
                          };

                          reader.readAsDataURL(file);
                        })
                    )
                  ).then((result) => {
                    setImages(result);
                  });
                }}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />

              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Bild ${index + 1}`}
                      className="h-20 w-20 rounded-2xl border border-slate-200 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-3 text-sm font-bold text-slate-700">
                Video hochladen
              </p>

              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();

                  reader.onloadend = () => {
                    setVideo(reader.result as string);
                  };

                  reader.readAsDataURL(file);
                }}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />

              {video && (
                <div className="mt-3 rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm text-pink-500">
                  Video ausgewählt
                </div>
              )}
            </div>

            <button
              onClick={addProduct}
              className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-white shadow transition hover:scale-105"
            >
              Produkt speichern
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {(["Spielzeug", "Schreibwaren"] as ProductCategory[]).map(
            (currentCategory) => (
              <div
                key={currentCategory}
                className="rounded-3xl bg-white p-5 shadow-lg"
              >
                <h2
                  className={`mb-4 text-2xl font-bold ${
                    currentCategory === "Spielzeug"
                      ? "text-blue-500"
                      : "text-pink-500"
                  }`}
                >
                  {currentCategory}
                </h2>

                <div className="flex flex-col gap-3">
                  {products
                    .filter(
                      (product) => product.category === currentCategory
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3"
                      >
                        <div className="flex items-center gap-3">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-14 w-14 rounded-xl object-cover"
                            />
                          )}

                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">
                              {product.name}
                            </span>

                            <span className="text-xs text-slate-500">
                              {product.price} €
                            </span>

                            <span className="text-xs text-slate-400">
                              {product.images?.length || 0} Bilder
                            </span>

                            {product.video && (
                              <span className="text-xs font-medium text-pink-500">
                                Video vorhanden
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="rounded-full bg-pink-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-pink-600"
                        >
                          Löschen
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}