"use client";

import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";

type Order = {
  id: number;
  customer: string;
  email: string;
  product: string;
  date: string;
  revenue: string;
};

export default function BestellungenAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const deleteOrder = (id: number) => {
    const updatedOrders = orders.filter((order) => order.id !== id);

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const deleteAllOrders = () => {
    const confirmed = window.confirm(
      "Möchtest du wirklich alle Bestellungen löschen?"
    );

    if (confirmed) {
      setOrders([]);
      localStorage.removeItem("orders");
    }
  };

  const totalMonthlyRevenue = orders.reduce((sum, order) => {
    const numericValue = Number(
      order.revenue.replace("€", "").replace(",", ".").trim()
    );

    return sum + numericValue;
  }, 0);

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-5xl font-bold text-blue-500">
            Bestellungen
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-md">
              <p className="text-sm text-slate-500">Monatsumsatz</p>
              <p className="text-3xl font-bold text-green-600">
                {totalMonthlyRevenue.toFixed(2).replace(".", ",")} €
              </p>
            </div>

            <button
              onClick={deleteAllOrders}
              className="rounded-2xl bg-red-500 px-5 py-4 text-sm font-bold text-white shadow-md transition hover:bg-red-600"
            >
              Alle löschen
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <table className="w-full">
            <thead className="bg-blue-100">
              <tr className="text-left">
                <th className="px-6 py-5 text-slate-700">Bestellnummer</th>
                <th className="px-6 py-5 text-slate-700">Kunde</th>
                <th className="px-6 py-5 text-slate-700">E-Mail</th>
                <th className="px-6 py-5 text-slate-700">Produkt</th>
                <th className="px-6 py-5 text-slate-700">Datum</th>
                <th className="px-6 py-5 text-slate-700">Umsatz</th>
                <th className="px-6 py-5 text-slate-700">Aktion</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-lg text-slate-500"
                  >
                    Keine Bestellungen vorhanden.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-bold text-pink-500">
                      #{order.id}
                    </td>

                    <td className="px-6 py-5">{order.customer}</td>

                    <td className="px-6 py-5">{order.email}</td>

                    <td className="px-6 py-5">{order.product}</td>

                    <td className="px-6 py-5">{order.date}</td>

                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {order.revenue}
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="rounded-xl bg-red-100 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-200"
                      >
                        Löschen
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}