import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/* ---------- TYPES ---------- */
type CourseWithContent = {
  id: string;
  title: string;
  modules: {
    id: string;
    lessons: {
      id: string;
    }[];
  }[];
};

export default async function CoursesPage() {
  // ✅ AUTH
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // ✅ FETCH COURSES
  const courses: CourseWithContent[] = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            select: { id: true },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ---------- SIDEBAR ---------- */}
      <aside className="w-64 border-r bg-white p-6 hidden md:block">
        <h2 className="text-lg font-semibold mb-6">DC Trades</h2>

        <nav className="space-y-2 text-sm">
          <Link href="/courses" className="block font-medium text-blue-600">
            📚 My Courses
          </Link>
          <Link href="/profile" className="block text-gray-600 hover:text-black">
            👤 Profile
          </Link>
        </nav>
      </aside>

      {/* ---------- MAIN ---------- */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Your Courses</h1>

        {courses.length === 0 && (
          <p className="text-gray-500">No courses available yet.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => {
            const firstLesson =
              course.modules[0]?.lessons[0]?.id ?? null;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow p-6 flex flex-col"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  {course.modules.length} modules
                </p>

                <div className="mt-auto">
                  {firstLesson ? (
                    <Link
                      href={`/courses/${course.id}/lesson/${firstLesson}`}
                      className="block text-center bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700"
                    >
                      Start Learning →
                    </Link>
                  ) : (
                    <span className="block text-center text-sm text-gray-400">
                      No lessons yet
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
