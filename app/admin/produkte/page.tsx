"use client";

import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";

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
 const [products, setProducts] = useState<Product[]>(() => {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("products");
  return saved ? JSON.parse(saved) : [];
});

const [name, setName] = useState("");
const [category, setCategory] =
  useState<ProductCategory>("Spielzeug");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState<string | null>(null);
const [video, setVideo] = useState<string | null>(null);

useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
}, [products]);

const addProduct = () => {
  if (!name || !price || !description) return;

    const newProduct: Product = {
      id: Date.now(),
      name,
      category,
      price,
      description,
      image,
      video,
    };

    setProducts([...products, newProduct]);

    setName("");
    setCategory("Spielzeug");
    setPrice("");
    setDescription("");
    setImage(null);
    setVideo(null);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-5xl font-bold text-pink-500 mb-8">
          Produkte verwalten
        </h1>

        <div className="rounded-2xl bg-white p-4 shadow-md flex flex-col gap-3 max-w-[700px]">
  <h2 className="text-2xl font-bold text-blue-500 mb-1">
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
    onChange={(e) => setCategory(e.target.value as ProductCategory)}
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
    className="rounded-xl border border-slate-200 px-3 py-2 text-sm h-20"
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
    className="rounded-full bg-yellow-400 px-5 py-2 text-sm text-white font-bold shadow hover:scale-105 transition self-start"
  >
    Produkt speichern
  </button>
</div>

          <div className="hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[220px] object-cover rounded-3xl mb-4"
                  />
                )}

                {product.video && (
                  <video controls className="w-full rounded-3xl mb-4">
                    <source src={product.video} />
                  </video>
                )}

                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-3xl font-bold text-blue-500">
                    {product.name}
                  </h2>

                  <span className="rounded-full bg-pink-100 px-4 py-2 text-pink-500 font-bold">
                    {product.category}
                  </span>
                </div>

                <p className="text-yellow-500 text-2xl font-bold mb-3">
                  {product.price}
                </p>

                <p className="text-slate-600 text-lg mb-5">
                  {product.description}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="rounded-full bg-pink-500 px-6 py-3 text-white font-bold"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>



<div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
  <div className="rounded-xl bg-white p-2 shadow-sm max-h-[150px] overflow-y-auto">
    <h2 className="text-lg font-bold text-blue-500 mb-2">
      Spielzeug
    </h2>

    <div className="flex flex-col gap-1">
      {products
        .filter((product) => product.category === "Spielzeug")
        .map((product) => (
          <div
            key={product.id}
            className="rounded-md bg-slate-50 px-2 py-1 border border-slate-100 flex items-center justify-between"
          >
            <span className="text-[11px] font-medium text-slate-700 truncate">
              {product.name}
            </span>

            <button
              onClick={() => deleteProduct(product.id)}
              className="rounded-full bg-pink-500 px-2 py-[2px] text-[9px] text-white font-bold"
            >
              Löschen
            </button>
          </div>
        ))}
    </div>
  </div>

  <div className="rounded-xl bg-white p-2 shadow-sm max-h-[150px] overflow-y-auto">
    <h2 className="text-lg font-bold text-pink-500 mb-2">
      Schreibwaren
    </h2>

    <div className="flex flex-col gap-1">
      {products
        .filter((product) => product.category === "Schreibwaren")
        .map((product) => (
          <div
            key={product.id}
            className="rounded-md bg-slate-50 px-2 py-1 border border-slate-100 flex items-center justify-between"
          >
            <span className="text-[11px] font-medium text-slate-700 truncate">
              {product.name}
            </span>
            <button
              onClick={() => deleteProduct(product.id)}
              className="rounded-full bg-pink-500 px-2 py-[2px] text-[9px] text-white font-bold"
            >
              Löschen
            </button>
          </div>
        ))}
    </div>
  </div>
</div>

      
    </main>
  );
}