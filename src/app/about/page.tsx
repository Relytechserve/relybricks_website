import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const values = [
  "Transparency in every step",
  "Clear, timely communication",
  "Smart in time and money",
  "Digital enablement for remote owners",
  "Peace of mind for NRIs and out-of-station owners",
];

export const metadata: Metadata = {
  title: "About Us | RelyBricks - Property Management Chennai",
  description:
    "RelyBricks was founded by homeowners who moved abroad. We provide trusted, professional property management in Chennai with digital solutions.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About RelyBricks — Property Management Chennai",
    description:
      "Built by homeowners for homeowners. Trusted, transparent property management with digital reporting.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-accent-700 to-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&w=1920"
            alt=""
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-accent-900/90 via-stone-900 to-stone-900" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(225deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute inset-y-0 right-[-120px] w-[320px] rotate-6 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white">
            About RelyBricks
          </h1>
          <p className="mt-6 text-xl text-stone-300 max-w-2xl">
            Built by homeowners, for homeowners. Trusted property management in Chennai.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1 overflow-hidden rounded-2xl shadow-xl ring-1 ring-stone-200/50">
              <Image
                src="https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&w=800"
                alt="Trusted property management - RelyBricks"
                width={800}
                height={600}
                className="w-full h-72 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="font-display text-3xl font-bold text-stone-900">
                Our Story
              </h2>
              <p className="mt-6 text-lg text-stone-600 leading-relaxed">
                RelyBricks was founded by homeowners who moved abroad and struggled to
                find reliable property management partners. We know the anxiety of
                managing properties from a distance—whether you&apos;re an NRI or an
                out-of-station owner.
              </p>
              <p className="mt-6 text-lg text-stone-600 leading-relaxed">
                Our mission is simple: to give you trusted, professional care with
                digital solutions so you can manage your property online and enjoy
                peace of mind. We emphasize transparency, clear communication, and
                making property management smart in terms of time and money.
              </p>
              <h3 className="mt-10 text-xl font-bold text-stone-900">What we stand for</h3>
              <ul className="mt-6 space-y-3">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-accent-600 flex-shrink-0" />
                    <span className="text-stone-700">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 order-3 lg:col-span-2">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Snapshot
                </p>
                <p className="mt-3 text-sm text-stone-700">
                  Founded by homeowners who moved abroad and needed a trustworthy, tech-enabled
                  partner in Chennai to look after their properties, tenants and documentation.
                </p>
                <p className="mt-3 text-sm text-stone-700">
                  Recognised as a reliable, innovative property management provider for NRIs and
                  out-of-station owners.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">
                    Who we help
                  </p>
                  <p className="mt-2 font-semibold text-stone-900">
                    NRIs & busy professionals
                  </p>
                  <p className="mt-1 text-[11px] text-stone-600">
                    Remote owners who want one accountable partner in Chennai.
                  </p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">
                    How we work
                  </p>
                  <p className="mt-2 font-semibold text-stone-900">
                    Subscription & reports
                  </p>
                  <p className="mt-1 text-[11px] text-stone-600">
                    Annual plans, regular visits, photos, and clear reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
