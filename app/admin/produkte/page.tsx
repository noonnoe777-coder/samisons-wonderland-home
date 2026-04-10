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
  image: string | null;
  video: string | null;
};

export default function ProdukteAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Spielzeug");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("spielzeuge")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setProducts(data as Product[]);
    }
  };

  const addProduct = async () => {
    if (!name || !price || !description) return;

    const { error } = await supabase.from("spielzeuge").insert([
      {
        name,
        category,
        price,
        description,
        image,
        video,
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
    setImage(null);
    setVideo(null);

    loadProducts();
  };

  const deleteProduct = async (id: number) => {
    const { error } = await supabase
      .from("spielzeuge")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
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

        <div className="max-w-[700px] rounded-2xl bg-white p-4 shadow-md">
          <div className="flex flex-col gap-3">
            <h2 className="mb-1 text-2xl font-bold text-blue-500">
              Neues Produkt
            </h2>

            <input
              type="text"
              placeholder="Produktname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as ProductCategory)
              }
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="Spielzeug">Spielzeug</option>
              <option value="Schreibwaren">Schreibwaren</option>
            </select>

            <input
              type="text"
              placeholder="Preis"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />

            <textarea
              placeholder="Beschreibung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-20 rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  setImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />

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
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />

            <button
              onClick={addProduct}
              className="self-start rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-white shadow transition hover:scale-105"
            >
              Produkt speichern
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 shadow-md">
            <h2 className="mb-3 text-2xl font-bold text-blue-500">
              Spielzeug
            </h2>

            <div className="flex flex-col gap-2">
              {products
                .filter((product) => product.category === "Spielzeug")
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <span className="truncate text-sm font-medium text-slate-700">
                      {product.name}
                    </span>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white"
                    >
                      Löschen
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-md">
            <h2 className="mb-3 text-2xl font-bold text-pink-500">
              Schreibwaren
            </h2>

            <div className="flex flex-col gap-2">
              {products
                .filter((product) => product.category === "Schreibwaren")
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <span className="truncate text-sm font-medium text-slate-700">
                      {product.name}
                    </span>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white"
                    >
                      Löschen
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}