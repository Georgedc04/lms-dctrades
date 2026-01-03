import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default async function ProfilePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  // ✅ Ensure DB user exists + sync basic data
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

  // 📊 Stats
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-sm text-gray-500">
              Manage your learning account
            </p>
          </div>

          <Link
            href="/courses"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Courses
          </Link>
        </div>

        {/* PROFILE INFO */}
        <div className="bg-white rounded-2xl shadow p-6 grid sm:grid-cols-2 gap-6">
          <Info label="Name" value={user.name ?? "Student"} />
          <Info label="Email" value={user.email ?? "Not available"} />
          <Info
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
          <Info label="Role" value={user.role} />
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-3 gap-6">
          <Stat title="Total Lessons" value={totalLessons} />
          <Stat title="Completed" value={completedLessons} />
          <Stat title="Progress" value={`${progress}%`} />
        </div>

        {/* ACTIONS */}
        <div className="bg-white rounded-2xl shadow p-6 flex gap-4">
          <Link
            href="/courses"
            className="flex-1 text-center rounded-xl bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700"
          >
            Continue Learning
          </Link>

          <SignOutButton redirectUrl="/">
            <button className="flex-1 rounded-xl border py-2.5 font-medium hover:bg-gray-100">
              Sign Out
            </button>
          </SignOutButton>
        </div>

      </div>
    </div>
  );
}

/* ---------- UI ---------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
