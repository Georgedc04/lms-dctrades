import Link from "next/link";
import { TrendingUp, Twitter, Instagram, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-white">

      {/* Subtle gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-200/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Brand + Links */}
        <div className="flex flex-col items-center gap-5">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-slate-900">
              DC<span className="text-indigo-600">TRADES</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex gap-6 text-xs font-medium text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 transition">
              Terms
            </Link>
            <Link href="/support" className="hover:text-slate-900 transition">
              Support
            </Link>
          </nav>

          {/* Socials */}
          <div className="flex gap-5 text-slate-400">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-indigo-600 transition"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-indigo-600 transition"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-indigo-600 transition"
            >
              <Linkedin className="h-4 w-4" />
            </a>
           <a
            href="#"
            aria-label="Discord"
            className="hover:text-indigo-600 transition"
            >
            <MessageCircle className="h-4 w-4" />
            </a>
          </div>

        </div>

        {/* Soft divider */}
        <div className="my-10 h-px bg-slate-100" />

        {/* Legal */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} DC Trades. Built for discipline and consistency.
          </p>
          <p className="text-[11px] text-slate-400 max-w-xl leading-relaxed">
            Trading involves risk. Past performance does not guarantee future results.
            This platform does not provide financial advice.
          </p>
        </div>

      </div>
    </footer>
  );
}
