import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

type Props = {
  activeCourseId?: string;
};

export default async function CoursesSidebar({
  activeCourseId,
}: Props) {
  // 🔐 Auth
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const clerkUser = await currentUser();

  // 👤 Ensure DB user exists
  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {
      email: clerkUser?.emailAddresses[0]?.emailAddress ?? null,
      name: clerkUser?.firstName ?? null,
    },
    create: {
      clerkId,
      email: clerkUser?.emailAddresses[0]?.emailAddress ?? null,
      name: clerkUser?.firstName ?? null,
    },
  });

  // 📚 Courses
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r bg-white">

      {/* HEADER */}
      <div className="border-b px-4 py-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Your Courses
        </h2>
      </div>

      {/* COURSE LIST */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {courses.map(course => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition
              ${
                course.id === activeCourseId
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {course.title}
          </Link>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="border-t p-3 space-y-2 text-sm">

        <Link
          href="/profile"
          className="block rounded-lg px-3 py-2 hover:bg-gray-100"
        >
          Profile
        </Link>

        {user.role === "ADMIN" && (
          <Link
            href="/admin"
            className="block rounded-lg px-3 py-2 text-blue-600 hover:bg-blue-50"
          >
            Admin Panel
          </Link>
        )}

        <SignOutButton redirectUrl="/">
          <button className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50">
            Sign Out
          </button>
        </SignOutButton>

      </div>
    </aside>
  );
}
