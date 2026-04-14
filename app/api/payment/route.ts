import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
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

      // Aktivierte Zahlungsmethoden
      payment_method_types: ["card", "klarna"],

      customer_email: email,
      customer_creation: "always",

      customer_update: {
        name: "auto",
        address: "auto",
      },

      billing_address_collection: "required",

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
            unit_amount: 2500, // 25,00 €
          },
          quantity: 1,
        },
      ],

      metadata: {
        customer_name: name,
        product_id: String(id),
      },

      success_url: `${process.env.NEXT_PUBLIC_URL}/danke?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/${id}`,
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
  } catch (error: any) {
    console.error("FULL STRIPE ERROR:");
    console.error(JSON.stringify(error, null, 2));

    return NextResponse.json(
      {
        error:
          error?.raw?.message ||
          error?.message ||
          "Fehler beim Erstellen der Zahlung.",
        code: error?.code || null,
        type: error?.type || null,
      },
      { status: 500 }
    );
  }
}