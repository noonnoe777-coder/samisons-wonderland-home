import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      name,
      email,
      menge = 1,
      geschenk = false,
      gravur = false,
    } = body;

    if (!id || !name || !email) {
      return NextResponse.json(
        { error: "Name, E-Mail oder Produkt-ID fehlt." },
        { status: 400 }
      );
    }

    const { data: product, error: productError } = await supabase
      .from("spielzeuge")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: "Produkt nicht gefunden." },
        { status: 404 }
      );
    }

    const basePrice = Number(
      String(product.price)
        .replace("€", "")
        .replace(",", ".")
        .trim()
    );

    let total = basePrice * Number(menge);

    if (geschenk) {
      total += 5;
    }

    if (gravur) {
      total += 10;
    }

    const totalInCents = Math.round(total * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card", "paypal"],

      customer_email: email,
      customer_creation: "always",

      billing_address_collection: "required",

      shipping_address_collection: {
        allowed_countries: ["DE"],
      },

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              description: [
                geschenk ? "Geschenkverpackung +5€" : null,
                gravur ? "Gravur +10€" : null,
              ]
                .filter(Boolean)
                .join(" • "),
            },
            unit_amount: totalInCents,
          },
          quantity: 1,
        },
      ],

      metadata: {
        customer_name: name,
        customer_email: email,
        product_id: String(id),
        menge: String(menge),
        geschenk: String(geschenk),
        gravur: String(gravur),
      },

      success_url: `${process.env.NEXT_PUBLIC_URL}/danke?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/${id}`,
    });

    const { error: orderError } = await supabase.from("orders").insert([
      {
        id: Date.now(),
        customer: name,
        email,
        product: product.name,
        date: new Date().toLocaleDateString("de-DE"),
        revenue: `${total.toFixed(2).replace(".", ",")} €`,
      },
    ]);

    if (orderError) {
      console.error("Supabase Fehler:", orderError);
    }

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
      },
      { status: 500 }
    );
  }
}