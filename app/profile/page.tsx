import React from "react";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import {
  User,
  Mail,
  Calendar,
  Shield,
  BookOpen,
  CheckCircle,
  Trophy,
  ArrowLeft,
  LogOut,
  Zap,
  LucideIcon,
} from "lucide-react";

export default async function ProfilePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress ?? null,
      name: clerkUser.firstName ?? null,
    },
    create: {
      clerkId,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? null,
      name: clerkUser.firstName ?? null,
    },
  });

  const totalLessons = await prisma.lesson.count({
    where: { isPublished: true },
  });

  const completedLessons = await prisma.lessonProgress.count({
    where: { userId: user.id, completed: true },
  });

  const progress =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* HEADER */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/courses"
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600">
            Active Session
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 space-y-8">
        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl border p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute right-6 top-6 opacity-5">
            <User className="w-24 h-24" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
              <Image
                src={clerkUser.imageUrl}
                alt="Profile"
                width={88}
                height={88}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-slate-50"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-1.5 rounded-lg text-white">
                <Trophy className="w-4 h-4" />
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 items-center">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {user.name ?? "Student"}
                </h1>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    user.role === "ADMIN"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Lessons"
            value={totalLessons}
            icon={<BookOpen className="w-5 h-5" />}
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <StatCard
            title="Completed"
            value={completedLessons}
            icon={<CheckCircle className="w-5 h-5" />}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <StatCard
            title="Progress"
            value={`${progress}%`}
            icon={<Zap className="w-5 h-5" />}
            color="text-indigo-600"
            bg="bg-indigo-50"
            isProgress
          />
        </div>

        {/* DETAILS + ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-3xl border p-6 sm:p-8">
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              Account Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <InfoItem icon={User} label="Name" value={user.name ?? "—"} />
              <InfoItem icon={Mail} label="Email" value={user.email ?? "—"} />
              <InfoItem
                icon={Calendar}
                label="Member Since"
                value={new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              />
              <InfoItem icon={Shield} label="Role" value={user.role} />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link
              href="/courses"
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 sm:py-5 text-white font-bold hover:bg-indigo-700 active:scale-95"
            >
              <Zap className="w-5 h-5" />
              Continue Learning
            </Link>

            <SignOutButton redirectUrl="/">
              <button className="flex items-center justify-center gap-2 rounded-2xl border py-4 sm:py-5 font-bold text-red-600 hover:bg-red-50">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI PARTS ---------- */

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bg: string;
  isProgress?: boolean;
};

function StatCard({
  title,
  value,
  icon,
  color,
  bg,
  isProgress = false,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border p-5">
      <div
        className={`w-11 h-11 ${bg} ${color} rounded-xl flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-extrabold">{value}</p>
      {isProgress && (
        <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all"
            style={{ width: value }}
          />
        </div>
      )}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <p className="font-semibold text-slate-700 text-sm mt-1">{value}</p>
    </div>
  );
}
