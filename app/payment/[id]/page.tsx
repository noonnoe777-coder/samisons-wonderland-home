"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import Navbar from "@/Components/Navbar";

export default function PaymentPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const id = params.id;

  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";

  const menge = Number(searchParams.get("menge") || "1");
  const preis = Number(searchParams.get("preis") || "0");
  const geschenk = searchParams.get("geschenk") === "true";
  const gravur = searchParams.get("gravur") === "true";
  const notiz = searchParams.get("notiz") || "";

  const deliveryCost = 4.99;
  const giftCost = geschenk ? 5 : 0;
  const engravingCost = gravur ? 10 : 0;

  const subtotal = preis * menge;
  const total =
    subtotal + deliveryCost + giftCost + engravingCost;

  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Deutschland");

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      if (!name || !email) {
        alert("Name oder E-Mail fehlt.");
        return;
      }

      if (
        !street ||
        !houseNumber ||
        !postalCode ||
        !city ||
        !country
      ) {
        alert("Bitte Lieferadresse vollständig eingeben.");
        return;
      }

      setLoading(true);

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
          menge,
          preis,
          geschenk,
          gravur,
          notiz,
          deliveryCost,
          total,

          street,
          houseNumber,
          postalCode,
          city,
          country,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert(data.error || "Fehler beim Weiterleiten zur Zahlung");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Keine Zahlungs-URL erhalten.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Fehler beim Weiterleiten zur Zahlung");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto flex max-w-2xl flex-col px-4 py-10">
        <div className="rounded-[32px] bg-white p-8 shadow-xl">
          <h1 className="mb-2 text-center text-4xl font-bold text-pink-500">
            Zahlung abschließen
          </h1>

          <p className="mb-8 text-center text-sm text-slate-500">
            Bezahle sicher mit Kreditkarte, Girokonto, Maestro, PayPal,
            Bankkarte oder weiteren Zahlungsmethoden.
          </p>

          <div className="mb-6 rounded-2xl border border-pink-100 bg-pink-50 p-5 text-slate-700">
            <h2 className="mb-3 text-lg font-bold text-pink-500">
              Bestelldaten
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-bold">Name:</span> {name}
              </p>

              <p>
                <span className="font-bold">E-Mail:</span> {email}
              </p>

              <p>
                <span className="font-bold">Menge:</span> {menge}
              </p>

              <p>
                <span className="font-bold">Geschenkverpackung:</span>{" "}
                {geschenk ? "Ja" : "Nein"}
              </p>

              <p>
                <span className="font-bold">Gravur:</span>{" "}
                {gravur ? "Ja" : "Nein"}
              </p>

              {notiz && (
                <p>
                  <span className="font-bold">Wunsch:</span> {notiz}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-bold text-slate-700">
              Lieferadresse
            </h2>

            <div className="grid gap-4">
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Straße"
                className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
              />

              <input
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="Hausnummer"
                className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="PLZ"
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
                />

                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ort / Stadt"
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
                />
              </div>

              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Land"
                className="w-full rounded-2xl border border-pink-200 px-4 py-3 outline-none focus:border-pink-400"
              />
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="mb-4 text-lg font-bold text-slate-700">
              Preisübersicht
            </h2>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Produkte ({menge}x)</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>

              {geschenk && (
                <div className="flex justify-between">
                  <span>Geschenkverpackung</span>
                  <span>5.00 €</span>
                </div>
              )}

              {gravur && (
                <div className="flex justify-between">
                  <span>Gravur</span>
                  <span>10.00 €</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Lieferkosten</span>
                <span>4.99 €</span>
              </div>

              <div className="border-t border-slate-300 pt-3">
                <div className="flex justify-between text-lg font-bold text-pink-500">
                  <span>Gesamt</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="mb-3 text-lg font-bold text-slate-700">
              Verfügbare Zahlungsmethoden
            </h2>

            <div className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-600 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                💳 Kreditkarte
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                🏦 Girokonto
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                💠 Maestro
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                💳 Bankkarte
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                🅿️ PayPal
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                💶 Sofort / Klarna
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Auf der nächsten Seite werden automatisch alle verfügbaren
              Zahlungsmethoden angezeigt.
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full rounded-2xl bg-pink-500 px-5 py-4 text-lg font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Weiterleitung..."
              : `Jetzt ${total.toFixed(2)} € bezahlen`}
          </button>
        </div>
      </div>
    </main>
  );
}