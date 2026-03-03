"use client";

import { useState } from "react";
import Image from "next/image";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqjgewz";
const SUBJECT_SUFFIX = "Relybricks";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", `${formData.get("name") || "Contact"} - ${SUBJECT_SUFFIX}`);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Something went wrong");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-accent-700 to-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/15536298/pexels-photo-15536298.jpeg?auto=compress&w=1920"
            alt=""
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent-900/88 via-stone-900 to-stone-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Contact Us
          </h1>
          <p className="mt-6 text-xl text-stone-300 max-w-2xl">
            Get in touch. We&apos;d love to help you manage your property with peace of mind.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900">
                Reach out
              </h2>
              <p className="mt-4 text-stone-600">
                Whether you&apos;re an NRI, out-of-station owner, or local—we&apos;re here
                to help you maintain your valuable investment.
              </p>
              <div className="mt-10 space-y-6">
                <a
                  href="tel:+919952004948"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-stone-200 hover:border-accent-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Phone</p>
                    <p className="text-accent-600 font-medium">+91 99520 04948</p>
                  </div>
                </a>
                <a
                  href="mailto:info@relybricks.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-stone-200 hover:border-accent-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Email</p>
                    <p className="text-accent-600 font-medium">info@relybricks.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-stone-200">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Location</p>
                    <p className="text-stone-600">Chennai, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8 lg:p-10">
              <h2 className="font-display text-2xl font-bold text-stone-900">
                Send a message
              </h2>
              {submitted ? (
                <div className="mt-8 p-6 rounded-xl bg-accent-50 border border-accent-200 text-center">
                  <p className="text-accent-700 font-medium">
                    Thank you! We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none resize-none"
                      placeholder="Tell us about your property needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
