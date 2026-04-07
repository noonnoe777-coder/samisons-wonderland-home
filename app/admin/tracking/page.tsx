"use client";

import { useState } from "react";
import Navbar from "@/Components/Navbar";

type DeliveryService = "DHL" | "Hermes" | "DPD";

type TrackingStatus =
  | "Noch nicht verschickt"
  | "Verschickt"
  | "Unterwegs"
  | "Erledigt";

type Shipment = {
  orderNumber: string;
  customer: string;
  estimatedDate: string;
  shippingCompany: DeliveryService;
  trackingNumber: string;
  status: TrackingStatus;
};

export default function TrackingAdminPage() {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      orderNumber: "SW-1001",
      customer: "Anna Müller",
      estimatedDate: "08.04.2026",
      shippingCompany: "DHL",
      trackingNumber: "00340434161094000001",
      status: "Noch nicht verschickt",
    },
    {
      orderNumber: "SW-1002",
      customer: "Sophie Becker",
      estimatedDate: "09.04.2026",
      shippingCompany: "Hermes",
      trackingNumber: "H1234567890123456789",
      status: "Unterwegs",
    },
    {
      orderNumber: "SW-1003",
      customer: "Laura Wagner",
      estimatedDate: "10.04.2026",
      shippingCompany: "DPD",
      trackingNumber: "05224987654321",
      status: "Erledigt",
    },
  ]);

  const updateStatus = (
    orderNumber: string,
    newStatus: TrackingStatus
  ) => {
    setShipments((prev) =>
      prev.map((shipment) => {
        if (shipment.orderNumber !== orderNumber) return shipment;

        // Wenn "Verschickt" gewählt wird,
        // zeigen wir automatisch die Tracking-Leiste
        if (newStatus === "Verschickt") {
          return {
            ...shipment,
            status: "Unterwegs",
          };
        }

        return {
          ...shipment,
          status: newStatus,
        };
      })
    );
  };

  const getTrackingLink = (
    shippingCompany: DeliveryService,
    trackingNumber: string
  ) => {
    switch (shippingCompany) {
      case "DHL":
        return `https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=${trackingNumber}`;

      case "Hermes":
        return `https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation/#${trackingNumber}`;

      case "DPD":
        return `https://tracking.dpd.de/status/de_DE/parcel/${trackingNumber}`;

      default:
        return "#";
    }
  };

  return (
    <main className="min-h-screen bg-[#eef5ff]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <h1 className="mb-8 text-5xl font-bold text-yellow-500">
          Tracking verwalten
        </h1>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <table className="w-full">
            <thead className="bg-yellow-100">
              <tr className="text-left text-slate-700">
                <th className="px-6 py-5">Bestellnummer</th>
                <th className="px-6 py-5">Kunde</th>
                <th className="px-6 py-5">Lieferdatum</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Sendungsverfolgung</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((shipment) => (
                <tr
                  key={shipment.orderNumber}
                  className="border-t border-slate-100 align-top"
                >
                  <td className="px-6 py-5 font-bold text-blue-500">
                    {shipment.orderNumber}
                  </td>

                  <td className="px-6 py-5">{shipment.customer}</td>

                  <td className="px-6 py-5">{shipment.estimatedDate}</td>

                  <td className="px-6 py-5">
                    {shipment.status !== "Erledigt" ? (
                      <select
                        value={
                          shipment.status === "Unterwegs"
                            ? "Verschickt"
                            : shipment.status
                        }
                        onChange={(e) =>
                          updateStatus(
                            shipment.orderNumber,
                            e.target.value as TrackingStatus
                          )
                        }
                        className="rounded-full border border-slate-300 px-4 py-2"
                      >
                        <option>Noch nicht verschickt</option>
                        <option>Verschickt</option>
                        <option>Erledigt</option>
                      </select>
                    ) : (
                      <div className="rounded-full bg-green-100 px-4 py-2 text-center font-semibold text-green-700">
                        Erledigt
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    {(shipment.status === "Unterwegs" ||
                      shipment.status === "Erledigt") && (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-sm text-slate-500">
                            Versanddienst
                          </p>

                          <p className="font-bold text-slate-800">
                            {shipment.shippingCompany}
                          </p>

                          <p className="mt-3 text-sm text-slate-500">
                            Trackingnummer
                          </p>

                          <p className="font-mono text-sm font-semibold text-slate-800">
                            {shipment.trackingNumber}
                          </p>

                          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                shipment.status === "Erledigt"
                                  ? "w-full bg-green-500"
                                  : "w-2/3 bg-blue-500"
                              }`}
                            />
                          </div>

                          <p className="mt-2 text-sm text-slate-600">
                            {shipment.status === "Erledigt"
                              ? "Paket erfolgreich zugestellt"
                              : "Paket ist unterwegs zum Kunden"}
                          </p>
                        </div>

                        <a
                          href={getTrackingLink(
                            shipment.shippingCompany,
                            shipment.trackingNumber
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex rounded-full bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                        >
                          Live verfolgen bei {shipment.shippingCompany}
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}