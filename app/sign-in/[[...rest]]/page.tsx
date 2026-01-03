import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">

      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.10),transparent_65%)] -z-10" />

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              DC<span className="text-indigo-600">TRADES</span>
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Sign in to continue.
          </p>
        </div>

        {/* Clerk Sign In */}
        <div className="rounded-2xl   px-1">
          <SignIn
            afterSignInUrl="/courses"
            appearance={{
              variables: {
                colorPrimary: "#4f46e5",
                colorText: "#0f172a",
                colorTextSecondary: "#64748b",
                borderRadius: "12px",
                fontFamily: "var(--font-inter)",
              },
              elements: {
                card: "bg-transparent shadow-none border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",

                formFieldInput:
                  "rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500",

                formButtonPrimary:
                  "bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold transition",

                socialButtonsBlockButton:
                  "border border-slate-200 hover:bg-slate-50 transition",

                footerActionLink:
                  "text-indigo-600 hover:text-indigo-700 font-semibold",

                dividerLine: "bg-slate-200",
                dividerText: "text-slate-400 text-xs",
              },
            }}
          />
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-[11px] text-slate-400">
          Trading involves risk. No financial advice provided.
        </p>

        {/* Back */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-indigo-600 transition"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
