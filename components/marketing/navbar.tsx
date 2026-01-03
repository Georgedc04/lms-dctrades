import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import {
  TrendingUp,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 sm:h-10 sm:w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <TrendingUp className="text-white h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
            DC<span className="text-indigo-600">TRADES</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-6">

          {/* Signed out */}
          <SignedOut>

            {/* Desktop sign in */}
            <SignInButton mode="modal">
              <button className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600 transition">
                Sign In
              </button>
            </SignInButton>

            {/* Mobile sign in icon */}
            <SignInButton mode="modal">
              <button className="sm:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
                <User className="h-4 w-4" />
              </button>
            </SignInButton>

            {/* Get started */}
            <SignUpButton mode="modal">
              <button className="px-4 sm:px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95">
                Get Started
              </button>
            </SignUpButton>

          </SignedOut>

          {/* Signed in */}
          <SignedIn>

            {/* Desktop dashboard */}
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold hover:bg-indigo-100 transition"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            {/* Mobile dashboard icon */}
            <Link
              href="/dashboard"
              className="sm:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            >
              <LayoutDashboard className="h-4 w-4" />
            </Link>

            {/* Avatar */}
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-9 w-9 sm:h-10 sm:w-10 rounded-xl",
                },
              }}
            />

            {/* Desktop sign out */}
            <SignOutButton>
              <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </SignOutButton>

          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
