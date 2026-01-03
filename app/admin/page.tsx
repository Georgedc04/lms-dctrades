"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";

/* ---------- Types ---------- */
type Stats = {
  courses: number;
  modules: number;
  lessons: number;
  students: number;
};

type MeResponse = {
  role: "ADMIN" | "SUPER_ADMIN";
};

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState<Stats | null>(null);
  const [me, setMe] = useState<MeResponse | null>(null);

  /* ---------- Auth + Stats ---------- */
  useEffect(() => {
    if (!isLoaded) return;

    fetch("/api/admin/me")
      .then(r => r.json())
      .then(data => {
        if (!data?.role) {
          window.location.href = "/courses";
          return;
        }
        setMe(data);
      });

    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(setStats);
  }, [isLoaded]);

  /* ---------- Shortcuts ---------- */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === "1") location.href = "/admin/courses";
      if (e.key === "2") location.href = "/admin/modules";
      if (e.key === "3") location.href = "/admin/lesson";
      if (e.key === "4") location.href = "/admin/users";
      if (e.key === "5" && me?.role === "SUPER_ADMIN")
        location.href = "/admin/audit-logs";
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [me]);

  if (!isLoaded || !stats || !me) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ---------- SIDEBAR ---------- */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold">DC Trades</div>

        <nav className="flex-1 px-4 space-y-1">
          <Nav href="/admin/courses" label="Courses" icon="📘" />
          <Nav href="/admin/modules" label="Modules" icon="📂" />
          <Nav href="/admin/lesson" label="Lessons" icon="🎥" />
          <Nav href="/admin/users" label="Users" icon="👥" />

          {me.role === "SUPER_ADMIN" && (
            <Nav
              href="/admin/audit-logs"
              label="Audit Logs"
              icon="📜"
            />
          )}
        </nav>

        <div className="border-t p-4 space-y-2 text-sm">
          <Link href="/courses" className="text-gray-600 hover:underline">
            ← Student View
          </Link>

          <SignOutButton>
            <button className="block w-full text-left text-red-600 hover:underline">
              Sign out
            </button>
          </SignOutButton>

          <p className="text-xs text-gray-400 pt-2">
            Ctrl / ⌘ + 1–5
          </p>
        </div>
      </aside>

      {/* ---------- MAIN ---------- */}
      <main className="flex-1 p-8 space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.firstName}
          </h1>
          <p className="text-gray-500">
            Role: {me.role.replace("_", " ")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat title="Courses" value={stats.courses} icon="📘" />
          <Stat title="Modules" value={stats.modules} icon="📂" />
          <Stat title="Lessons" value={stats.lessons} icon="🎥" />
          <Stat title="Students" value={stats.students} icon="👥" />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="flex gap-4 flex-wrap">
            <Action href="/admin/courses" text="New Course" />
            <Action href="/admin/modules" text="New Module" />
            <Action href="/admin/lesson" text="New Lesson" />
            <Action href="/admin/users" text="Manage Users" />

            {me.role === "SUPER_ADMIN" && (
              <Action
                href="/admin/audit-logs"
                text="View Audit Logs"
              />
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

/* ---------- UI ---------- */

function Nav({ href, label, icon }: {
  href: string; label: string; icon: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
    >
      <span>{icon}</span>
      {label}
    </Link>
  );
}

function Stat({ title, value, icon }: {
  title: string; value: number; icon: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="text-3xl">{icon}</div>
      <p className="mt-4 text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Action({ href, text }: {
  href: string; text: string;
}) {
  return (
    <Link
      href={href}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700"
    >
      {text}
    </Link>
  );
}
