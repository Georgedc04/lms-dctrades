import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { BentoFeatures } from "@/components/marketing/bento-features";
import { Roadmap } from "@/components/marketing/roadmap";
import { AdminPreview } from "@/components/marketing/admin-preview";
import { Footer } from "@/components/marketing/footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen text-slate-900 selection:bg-indigo-100 selection:text-indigo-100">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Core Value */}
      <BentoFeatures />

      {/* Process / Philosophy */}
      <Roadmap />

      {/* Discipline / Performance */}
      <AdminPreview />

      {/* ---------- AMBITIOUS CTA ---------- */}
      <section className="relative py-28 overflow-hidden">

        {/* Soft background art (respects global gradient) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/40 to-transparent -z-10" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 bg-indigo-200/30 blur-[140px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Decide who you become <br className="hidden sm:block" />
            in the next market cycle.
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mb-10">
            Consistency is not talent. It’s structure, discipline, and the
            environment you operate in.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold
                       hover:bg-indigo-700 transition shadow-lg shadow-indigo-200/60"
          >
            Enter the Platform
          </Link>

          <p className="mt-4 text-xs text-slate-400">
            Built for serious traders only.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
