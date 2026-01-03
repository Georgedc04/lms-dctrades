import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  let courses = [];

  try {
    courses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("DB ERROR:", err);
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Database unavailable. Try again.
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        No courses available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Available Courses
        </h1>

        {/* Courses Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <div
              key={course.id}
              className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {course.title}
              </h3>

              <p className="mb-6 text-sm text-gray-500">
                Learn smart money concepts step by step.
              </p>

              <a
                href={`/courses/${course.id}`}
                className="inline-block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                View Course →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
