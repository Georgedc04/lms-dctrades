import Link from "next/link";

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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* ---------- HERO ---------- */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        <span className="inline-block mb-4 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          Smart Learning Platform
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Trade Smarter.<br />
          <span className="text-blue-600">Learn Faster.</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          DC Trades is a professional trading education platform built for
          serious learners. Track progress, watch lessons, and master
          real-world trading strategies.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/sign-up"
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Create Free Account
          </Link>

          <Link
            href="/sign-in"
            className="px-6 py-3 rounded-xl border font-semibold hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          No credit card required
        </p>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        <Feature
          icon="🎥"
          title="Structured Video Lessons"
          desc="Professionally organized lessons with videos and PDFs."
        />
        <Feature
          icon="📊"
          title="Progress Tracking"
          desc="Track lesson completion and learning progress."
        />
        <Feature
          icon="🔐"
          title="Secure Accounts"
          desc="Powered by Clerk authentication."
        />
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            How DC Trades Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Step number="01" title="Create Account" desc="Sign up securely." />
            <Step number="02" title="Enroll & Learn" desc="Access courses." />
            <Step number="03" title="Track Progress" desc="Monitor mastery." />
          </div>
        </div>
      </section>

      {/* ---------- ADMIN ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Built for Students & Instructors
            </h2>
            <p className="text-gray-600 mb-6">
              Manage courses, modules, lessons, and students from one dashboard.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>✔ Course & module management</li>
              <li>✔ Video & PDF lessons</li>
              <li>✔ Student progress tracking</li>
              <li>✔ Secure access control</li>
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
          Join DC Trades and start learning today.
        </p>

        <div className="mt-8">
          <Link
            href="/sign-up"
            className="px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
          >
            Create Free Account
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
    <div className="bg-white rounded-2xl shadow p-8 text-center">
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
