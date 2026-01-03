import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

/* ---------- Types ---------- */
type FeatureProps = {
  icon: string;
  title: string;
  desc: string;
};

type StepProps = {
  number: string;
  title: string;
  desc: string;
};

type MiniStatProps = {
  label: string;
  value: string;
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">

      {/* ---------- NAVBAR ---------- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            DC Trades
          </Link>

          <div className="flex items-center gap-4">
            <SignedOut>
              <Link href="/sign-in" className="text-sm font-medium">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                Get Started
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/courses"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <section className="relative pt-32 pb-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <span className="inline-block mb-6 rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
            Smart Learning Platform
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Trade Smarter.<br />
            <span className="text-blue-200">Learn Faster.</span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            Professional trading education built for serious learners.
            Learn, track progress, and master real strategies.
          </p>

          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            <Link
              href="/courses"
              className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/sign-up"
              className="px-8 py-3 rounded-xl bg-blue-600 border border-white/30 font-semibold hover:bg-blue-700 transition"
            >
              Create Free Account
            </Link>
          </div>

          <p className="mt-6 text-sm text-blue-200">
            No credit card required
          </p>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-10">
        <Feature
          icon="🎥"
          title="Structured Lessons"
          desc="Well-organized video & PDF based courses."
        />
        <Feature
          icon="📊"
          title="Progress Tracking"
          desc="Monitor learning and completion easily."
        />
        <Feature
          icon="🔐"
          title="Secure Platform"
          desc="Authentication powered by Clerk."
        />
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Step number="01" title="Create Account" desc="Sign up securely." />
            <Step number="02" title="Enroll & Learn" desc="Access courses." />
            <Step number="03" title="Track Progress" desc="Measure mastery." />
          </div>
        </div>
      </section>

      {/* ---------- ADMIN ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Built for Students & Admins
            </h2>
            <p className="text-gray-600 mb-6">
              Manage courses, lessons, and users from one dashboard.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Course & module management</li>
              <li>✔ Video & PDF lessons</li>
              <li>✔ Student progress</li>
              <li>✔ Secure access</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-sm text-gray-500 mb-2">Admin Dashboard</p>
            <p className="text-xl font-semibold">
              Real-time analytics & control
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <MiniStat label="Courses" value="12" />
              <MiniStat label="Students" value="1,200+" />
              <MiniStat label="Lessons" value="120+" />
              <MiniStat label="Completion" value="87%" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-blue-600 py-24 text-center text-white">
        <h2 className="text-4xl font-bold">
          Ready to level up your trading?
        </h2>
        <p className="mt-4 text-blue-100">
          Start learning with DC Trades today.
        </p>

        <div className="mt-8">
          <Link
            href="/courses"
            className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DC Trades. All rights reserved.
      </footer>
    </main>
  );
}

/* ---------- Components ---------- */

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }: StepProps) {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-blue-600 mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function MiniStat({ label, value }: MiniStatProps) {
  return (
    <div className="border rounded-xl p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
