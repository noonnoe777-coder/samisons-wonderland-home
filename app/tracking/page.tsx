"use client";

import { useState } from "react";
import Navbar from "@/Components/Navbar";

export default function TrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [searched, setSearched] = useState(false);

  const [tracking, setTracking] = useState<null | {
    order: string;
    product: string;
    status: string;
    arrival: string;
  }>(null);

  const orders = [
    {
      order: "SW-1001",
      product: "Motorik-Würfel",
      status: "Unterwegs",
      arrival: "08.04.2026",
    },
    {
      order: "SW-1002",
      product: "Buntstifte Set",
      status: "Verschickt",
      arrival: "09.04.2026",
    },
    {
      order: "SW-1003",
      product: "Holzeisenbahn",
      status: "Zugestellt",
      arrival: "05.04.2026",
    },
  ];

  const searchOrder = () => {
    setSearched(true);

    const found = orders.find(
      (item) =>
        item.order.toLowerCase() === orderNumber.trim().toLowerCase()
    );

    if (found) {
      setTracking(found);
    } else {
      setTracking(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="mb-10 text-5xl font-bold text-yellow-500">
          Bestellung verfolgen
        </h1>

        <div className="rounded-[36px] bg-white p-8 shadow-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchOrder();
            }}
            className="flex flex-col gap-4 md:flex-row"
          >
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => {
                setOrderNumber(e.target.value);
                setSearched(false);
              }}
              placeholder="Bestellnummer eingeben"
              className="flex-1 rounded-3xl border border-slate-200 px-6 py-5 text-lg outline-none transition focus:border-yellow-400"
            />

            <button
              type="submit"
              className="rounded-full bg-yellow-400 px-10 py-5 text-lg font-bold text-white transition hover:bg-yellow-500"
            >
              Suchen
            </button>
          </form>

          {tracking && searched && (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="mb-6 text-3xl font-bold text-blue-500">
                Deine Bestellung
              </h2>

              <div className="space-y-4 text-lg text-slate-700">
                <p>
                  <span className="font-bold">Bestellnummer:</span>{" "}
                  {tracking.order}
                </p>

                <p>
                  <span className="font-bold">Produkt:</span>{" "}
                  {tracking.product}
                </p>

                <p>
                  <span className="font-bold">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      tracking.status === "Zugestellt"
                        ? "text-green-600"
                        : tracking.status === "Unterwegs"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {tracking.status}
                  </span>
                </p>

                <p>
                  <span className="font-bold">
                    Voraussichtliche Lieferung:
                  </span>{" "}
                  {tracking.arrival}
                </p>
              </div>
            </div>
          )}

          {!tracking && searched && (
            <div className="mt-8 rounded-3xl border border-red-200 bg-red-100 p-6 text-lg font-bold text-red-600">
              Keine Bestellung mit dieser Nummer gefunden.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}