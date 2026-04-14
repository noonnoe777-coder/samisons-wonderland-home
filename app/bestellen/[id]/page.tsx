"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

type SavedProduct = {
  id: number;
  name: string;
  price: string;
};

export default function BestellungPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleWeiter = async () => {
    if (!name || !email) {
      alert("Bitte Name und E-Mail eingeben.");
      return;
    }

    const { data: products, error: productError } = await supabase
      .from("spielzeuge")
      .select("id, name, price");

    if (productError) {
      console.error(productError);
      alert("Produkte konnten nicht geladen werden.");
      return;
    }

    const selectedProduct = (products as SavedProduct[])?.find(
      (product) => product.id === id
    );

    const { error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          id: Date.now(),
          customer: name,
          email,
          product: selectedProduct?.name || `Produkt ${id}`,
          date: new Date().toLocaleDateString("de-DE"),
          revenue: selectedProduct?.price || "0,00 €",
        },
      ]);

    if (orderError) {
      console.error(orderError);
      alert("Bestellung konnte nicht gespeichert werden.");
      return;
    }

    sessionStorage.setItem(
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
    <div className="flex min-h-screen items-center justify-center bg-[#eef5ff] p-8">
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