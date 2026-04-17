"use client";

import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import { supabase } from "@/app/lib/supabase";

type ProductCategory =
  | "Spielzeug"
  | "Schreibwaren"
  | "Heimware"
  | "Arts & Crafts";

type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: string;
  description: string;
  image: string | null;
  images: string[];
  video: string | null;
  deliveryText: string;
  noReturn: boolean;
};

export default function ProdukteAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

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

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setCategory("Spielzeug");
    setPrice("");
    setDescription("");
    setImages([]);
    setVideo(null);
    setDeliveryText("Lieferzeit: 1 Woche");
    setNoReturn(true);
  };

  const saveProduct = async () => {
    if (!name || !price || !description || images.length === 0) {
      alert(
        "Bitte Name, Preis, Beschreibung und mindestens 1 Bild eingeben."
      );
      return;
    }

    let error = null;

    const payload = {
      name,
      category,
      price,
      description,
      image: images[0],
      images,
      video,
      deliveryText,
      noReturn,
    };

    if (editingId) {
      const result = await supabase
        .from("spielzeuge")
        .update(payload)
        .eq("id", editingId);

      error = result.error;
    } else {
      const result = await supabase
        .from("spielzeuge")
        .insert([payload]);

      error = result.error;
    }

    if (error) {
      console.error("SUPABASE ERROR:", error);
      alert(`Fehler beim Speichern: ${error.message}`);
      return;
    }

    resetForm();
    await loadProducts();

    alert(
      editingId
        ? "Produkt erfolgreich bearbeitet"
        : "Produkt gespeichert"
    );
  };

  const deleteProduct = async (id: number) => {
    const confirmed = confirm(
      "Möchtest du dieses Produkt wirklich löschen?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("spielzeuge")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Fehler beim Löschen");
      return;
    }

    await loadProducts();
  };

  const categories: ProductCategory[] = [
    "Spielzeug",
    "Schreibwaren",
    "Heimware",
    "Arts & Crafts",
  ];

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
              {editingId ? "Produkt bearbeiten" : "Neues Produkt"}
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
              <option value="Heimware">Heimware</option>
              <option value="Arts & Crafts">Arts & Crafts</option>
            </select>

            <input
              type="text"
              placeholder="Preis z.B. 24.99"
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
              placeholder="Lieferzeit"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
            />

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={noReturn}
                onChange={(e) => setNoReturn(e.target.checked)}
                className="h-4 w-4"
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
  onChange={async (e) => {
    const files = Array.from(e.target.files || []);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("produkten")
        .upload(fileName, file);

      if (error) {
        console.error(error);
        alert("Fehler beim Bild-Upload");
        continue;
      }

      const { data } = supabase.storage
        .from("produkten")
        .getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    setImages(uploadedUrls);
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

            <div className="flex gap-3">
              <button
                onClick={saveProduct}
                className="flex-1 rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-white shadow transition hover:scale-105"
              >
                {editingId
                  ? "Änderungen speichern"
                  : "Produkt speichern"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="rounded-full bg-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-300"
                >
                  Abbrechen
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {categories.map((currentCategory) => (
            <div
              key={currentCategory}
              className="rounded-3xl bg-white p-5 shadow-lg"
            >
              <h2 className="mb-4 text-2xl font-bold text-pink-500">
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
                        {(product.images?.[0] || product.image) && (
                          <img
                            src={product.images?.[0] || product.image || ""}
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
                            {product.images?.length || 1} Bilder
                          </span>

                          {product.video && (
                            <span className="text-xs font-medium text-pink-500">
                              Video vorhanden
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(product.id);
                            setName(product.name);
                            setCategory(product.category);
                            setPrice(product.price);
                            setDescription(product.description);
                            setImages(product.images || []);
                            setVideo(product.video);
                            setDeliveryText(
                              product.deliveryText ||
                                "Lieferzeit: 1 Woche"
                            );
                            setNoReturn(product.noReturn ?? true);

                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          className="rounded-full bg-blue-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
                        >
                          Bearbeiten
                        </button>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="rounded-full bg-pink-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-pink-600"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}