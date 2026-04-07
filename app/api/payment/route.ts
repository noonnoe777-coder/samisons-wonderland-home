import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id, name, email } = body;

    if (!id || !name || !email) {
      return NextResponse.json(
        { error: "Name, E-Mail oder Produkt-ID fehlt." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: [
        "card",
        "paypal",
        "klarna",
        "sepa_debit",
      ],

      // E-Mail direkt im Stripe Checkout vorausfüllen
      customer_email: email,

      // Stripe erstellt automatisch einen Customer
      customer_creation: "always",

      // Stripe darf Name / Adresse nach Checkout speichern
      customer_update: {
        name: "auto",
        address: "auto",
        shipping: "auto",
      },

      // Rechnungsadresse verpflichtend
      billing_address_collection: "required",

      // Lieferadresse nur Deutschland
      shipping_address_collection: {
        allowed_countries: ["DE"],
      },

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Produkt ${id}`,
            },
            unit_amount: 1999, // 19,99 €
          },
          quantity: 1,
        },
      ],

      // Dein eigener Name aus dem Formular
      metadata: {
        customer_name: name,
        product_id: String(id),
      },

      success_url: `${process.env.NEXT_PUBLIC_URL}/danke`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/bestellen/${id}`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Keine Stripe-URL erhalten." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Fehler:", error);

    return NextResponse.json(
      { error: "Fehler beim Erstellen der Zahlung." },
      { status: 500 }
    );
  }
}