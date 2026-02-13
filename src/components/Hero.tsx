"use client";

import { useState, useTransition } from "react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    startTransition(async () => {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
      }
    });
  };

  return (
    <>
      <section className="w-full px-8 md:px-16 py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <h1 className="font-playfair text-[64px] md:text-[80px] lg:text-[92px] leading-[1.05] tracking-tight text-[#1A1A1A] mb-10">
            Design the Future of
            <br />
            Intelligent Spaces
          </h1>

          <p className="text-[#6C6C6C] text-base md:text-lg max-w-[640px] mb-14 leading-relaxed">
            An advanced design platform for exploring space, material, light,
            and atmosphere — thoughtfully composed for modern architects and
            interior designers.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-[520px] mb-3">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-12 py-3 px-5 bg-white border border-[#D8D6D1] rounded-[6px] text-[#1A1A1A] placeholder:text-[#6C6C6C] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
              <button
                type="submit"
                disabled={isPending}
                className="h-12 px-8 bg-[#1A1A1A] text-white rounded-[6px] hover:bg-[#2A2A2A] transition-colors duration-200 disabled:opacity-70"
              >
                {isPending ? "Sending…" : "Notify Me"}
              </button>
            </div>
          </form>

          <p className="text-sm text-[#6C6C6C]">
            We'll share early access when we launch.
          </p>
        </div>
      </section>

      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && setSubmitted(false)}
          onKeyDown={(e) => e.key === "Escape" && setSubmitted(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-dialog-title"
          tabIndex={-1}
        >
          <div className="w-full max-w-[380px] bg-white rounded-lg shadow-lg p-8 text-center animate-in zoom-in-95 fade-in duration-200">
            <p
              id="success-dialog-title"
              className="font-playfair text-xl text-[#1A1A1A] mb-2"
            >
              You're on the list
            </p>
            <p className="text-[#6C6C6C] text-[15px] leading-relaxed mb-6">
              Thanks for signing up. We'll notify you when we launch.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-sm rounded-[6px] hover:bg-[#2A2A2A] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={(e) =>
            e.target === e.currentTarget && setErrorMessage(null)
          }
          onKeyDown={(e) =>
            e.key === "Escape" && setErrorMessage(null)
          }
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="error-dialog-title"
          tabIndex={-1}
        >
          <div className="w-full max-w-[380px] bg-white rounded-lg shadow-lg p-8 text-center animate-in zoom-in-95 fade-in duration-200">
            <p
              id="error-dialog-title"
              className="font-playfair text-xl text-[#1A1A1A] mb-2"
            >
              Something went wrong
            </p>
            <p className="text-[#6C6C6C] text-[15px] leading-relaxed mb-6">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-sm rounded-[6px] hover:bg-[#2A2A2A] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
