import Link from "next/link";
import { Zap, ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden text-center">

      {/* Soft background art */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-200/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:22px_22px] opacity-30 -z-10" />

      <div className="max-w-5xl mx-auto px-5 relative">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] sm:text-xs font-semibold tracking-widest mb-8">
          <Zap className="h-3 w-3" />
          Future of Trading Education
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
          Master the Markets <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 relative">
            With Precision
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-indigo-200/70 rounded-full" />
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed mb-10">
          Professional trading curriculum built for clarity, structure, and real-world execution.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 items-center">
          <Link
            href="/courses"
            className="group w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            Start Learning
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/sign-up"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition"
          >
            Free Preview
          </Link>
        </div>

        {/* Micro note */}
        <p className="mt-4 text-xs text-slate-400">
          No credit card required
        </p>

        {/* Social proof */}
{/* Social proof + community */}
<div className="mt-16 flex flex-col items-center gap-10">

  {/* Visible gradient divider */}
  <div className="h-px w-48 bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />

  {/* Social proof */}
  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-400 text-sm font-semibold">
    <div className="flex items-center gap-2">
      <TrendingUp className="h-4 w-4" /> NASDAQ
    </div>
    <div className="flex items-center gap-2">
      <Zap className="h-4 w-4" /> FORBES
    </div>
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-4 w-4" /> SECURE
    </div>
  </div>

  {/* Discord handwritten invite */}
  <div className="relative text-center group">

    {/* Border container */}
    <div className="rounded-2xl border border-slate-200 px-8 py-6 transition-all duration-300
                    group-hover:border-indigo-300
                    group-hover:shadow-lg
                    group-hover:shadow-indigo-200/40
                    group-hover:-translate-y-1">

      <p className="text-[12px] text-slate-400 font-bold uppercase tracking-tighter mb-1">
        Community Access
      </p>

      <a
        href="#"
        className="inline-block text-xl text-indigo-600 font-handwritten leading-none -rotate-2
                   group-hover:opacity-90 transition"
      >
        Join Discord
      </a>

      {/* Signature & seal */}
      <div className="flex items-end justify-between mt-3 w-40 mx-auto">
        <div className="space-y-1">
          <div className="h-[1px] w-14 bg-slate-200 mx-auto" />
          <p className="text-[7px] text-slate-600 font-handwritten">
            Private Community
          </p>
        </div>

        <div className="h-7 w-7 rounded-full bg-indigo-100 border border-indigo-100 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-indigo-500/20 animate-pulse" />
        </div>
      </div>

    </div>
  </div>
</div>


      </div>
    </section>
  );
}
