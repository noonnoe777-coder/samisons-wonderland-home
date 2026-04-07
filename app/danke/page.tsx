"use client";

import { useEffect, useState } from "react";

export default function DankePage() {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    const ids = Array.from({ length: 20 }, (_, i) => i);
    setHearts(ids);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pink-50">
      {hearts.map((heart) => (
        <span
          key={heart}
          className="absolute text-pink-400 text-3xl animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          ❤️
        </span>
      ))}

      <div className="relative z-10 bg-white px-10 py-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          Danke für deine Bestellung!
        </h1>
        <p className="text-slate-600">
          Deine Zahlung war erfolgreich 💖
        </p>
      </div>
    </div>
  );
}