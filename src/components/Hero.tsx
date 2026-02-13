"use client";

import { ArrowRightIcon, Loader2, MoveRight } from "lucide-react";
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
        setErrorMessage(
          data?.error ?? "Something went wrong. Please try again.",
        );
      }
    });
  };

  return (
    <>
      <section className="relative w-full px-8 md:px-16 pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black/10 z-10" />
        {/* Background Video - plays once */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              pointerEvents: "none",
            }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full font-bold font-inter text-8xl md:text-9xl text-white flex items-center justify-between gap-4">
          <span>
            H</ span><span>E</span><span>M</span><span>A</span>
          </div>

        {/* Content overlay */}
        <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center text-center w-full py-20">
          <form onSubmit={handleSubmit} className="w-full max-w-[520px] mb-3">
            <div className="flex flex-col gap-3">
              <p className="text-lg md:text-xl lg:text-2xl text-white font-bold font-inter">Join The Waitlist</p>
              <div className="relative flex-1 h-12 py-3 px-5 bg-white border border-[#D8D6D1] rounded-[6px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="font-inter h-full w-full placeholder:text-[#C30101] text-[#C30101] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="absolute right-3 top-0 h-full transition-colors duration-200 disabled:opacity-70"
                >
                  {isPending ? <Loader2 className="size-6 text-[#C30101]" /> : <MoveRight className="size-6 text-[#C30101]" />}
                </button>
              </div>
            </div>
          </form>
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
          onClick={(e) => e.target === e.currentTarget && setErrorMessage(null)}
          onKeyDown={(e) => e.key === "Escape" && setErrorMessage(null)}
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
