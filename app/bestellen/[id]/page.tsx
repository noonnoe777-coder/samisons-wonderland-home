"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

type Order = {
  id: number;
  customer: string;
  email: string;
  product: string;
  date: string;
  revenue: string;
};

type SavedProduct = {
  id: number;
  name: string;
  price: string;
};

export default function BestellungPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleWeiter = () => {
    const savedProducts = localStorage.getItem("products");
    const products: SavedProduct[] = savedProducts
      ? JSON.parse(savedProducts)
      : [];

    const selectedProduct = products.find(
      (product) => product.id === id
    );

    const order: Order = {
      id: Date.now(),
      customer: name,
      email: email,
      product: selectedProduct?.name || `Produkt ${id}`,
      date: new Date().toLocaleDateString("de-DE"),
      revenue: selectedProduct?.price || "0,00 €",
    };

    const existingOrders: Order[] = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    existingOrders.push(order);

    localStorage.setItem("orders", JSON.stringify(existingOrders));

    localStorage.setItem(
      "bestellung",
      JSON.stringify({
        productId: id,
        name,
        email,
      })
    );

    router.push(`/payment/${id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef5ff] p-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-pink-500">
          Bestellung für Produkt {id}
        </h1>

        <input
          type="text"
          placeholder="Dein Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-pink-400"
        />

        <input
          type="email"
          placeholder="Deine E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-6 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-pink-400"
        />

        <button
          onClick={handleWeiter}
          className="w-full rounded-full bg-pink-500 py-3 font-bold text-white transition hover:bg-pink-600"
        >
          Weiter zur Zahlung
        </button>
      </div>
    </div>
  );
}