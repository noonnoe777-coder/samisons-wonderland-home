"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

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

export default function PaymentPage() {
  const { id } = useParams();

  const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");
  const [shippingMethod, setShippingMethod] = useState<string>("DHL");
  const [loading, setLoading] = useState(false);

  const versandkosten: Record<string, number> = {
    DHL: 4.99,
    DPD: 5.99,
    Hermes: 3.99,
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const savedOrder = localStorage.getItem("bestellung");
      const savedProducts = localStorage.getItem("products");

      if (!savedOrder || !savedProducts) {
        alert("Fehlende Bestelldaten");
        return;
      }

      const orderData = JSON.parse(savedOrder);
      const products: SavedProduct[] = JSON.parse(savedProducts);

      const selectedProduct = products.find(
        (product) => product.id === Number(id)
      );

      const productPrice = selectedProduct
        ? Number(
            selectedProduct.price.replace("€", "").replace(",", ".").trim()
          )
        : 0;

      const totalPrice = productPrice + versandkosten[shippingMethod];

      // 👉 Bestellung speichern (optional)
      const newOrder: Order = {
        id: Date.now(),
        customer: orderData.name,
        email: orderData.email,
        product: selectedProduct?.name || `Produkt ${id}`,
        date: new Date().toLocaleDateString("de-DE"),
        revenue: `${totalPrice.toFixed(2).replace(".", ",")} €`,
      };

      const existingOrders: Order[] = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      existingOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      // 👉 WICHTIG: Name + Email an API schicken
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: orderData.name,
          email: orderData.email,
          paymentMethod,
          shippingMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Fehler bei Stripe");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      alert("Fehler beim Weiterleiten zur Zahlung");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef5ff] p-8">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-blue-500">
          Zahlung & Versand
        </h1>

        <h2 className="mb-3 text-lg font-bold">Zahlungsmethode</h2>

        <div className="mb-6 grid gap-3">
          {["PayPal", "Klarna", "Kreditkarte", "SEPA"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`rounded-xl border p-3 text-left transition ${
                paymentMethod === method
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-300"
              }`}
            >
              {method === "SEPA"
                ? "Girokonto / SEPA-Lastschrift"
                : method}
            </button>
          ))}
        </div>

        <h2 className="mb-3 text-lg font-bold">
          Versand innerhalb Deutschlands
        </h2>

        <p className="mb-4 text-sm text-slate-600">
          Lieferung nur innerhalb Deutschlands möglich.
          <br />
          Standard-Lieferzeit: 2–5 Werktage.
        </p>

        <div className="mb-6 grid gap-3">
          <button
            onClick={() => setShippingMethod("DHL")}
            className={`rounded-xl border p-3 text-left ${
              shippingMethod === "DHL"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            DHL – 4,99 €
          </button>

          <button
            onClick={() => setShippingMethod("DPD")}
            className={`rounded-xl border p-3 text-left ${
              shippingMethod === "DPD"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            DPD – 5,99 €
          </button>

          <button
            onClick={() => setShippingMethod("Hermes")}
            className={`rounded-xl border p-3 text-left ${
              shippingMethod === "Hermes"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            Hermes – 3,99 €
          </button>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full rounded-full bg-green-500 py-3 font-bold text-white transition hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Weiterleitung..." : "Zahlung abschließen"}
        </button>
      </div>
    </div>
  );
}