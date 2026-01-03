/* eslint-disable @next/next/no-html-link-for-pages */
import { prisma } from "@/lib/prisma";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  if (!courseId) {
    return <div className="p-6 text-sm text-red-500">Invalid course</div>;
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) {
    return <div className="p-6 text-sm text-gray-500">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {course.title}
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {course.modules.map((module, index) => (
            <div key={module.id}>
              {/* Module title */}
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
                Module {index + 1}: {module.title}
              </h2>

              {/* Lessons */}
              <div className="rounded-md border bg-white">
                {module.lessons.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500">
                    No lessons published
                  </p>
                ) : (
                  module.lessons.map((lesson, i) => (
                    <a
                      key={lesson.id}
                      href={`/courses/${course.id}/lesson/${lesson.id}`}
                      className="flex items-center justify-between border-b px-4 py-3 text-sm hover:bg-gray-50 last:border-b-0"
                    >
                      <span className="text-gray-900">
                        {i + 1}. {lesson.title}
                      </span>
                      <span className="text-gray-400">→</span>
                    </a>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Back */}
        <div className="mt-6">
          <a
            href="/courses"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to courses
          </a>
        </div>
      </div>
    </div>
  );
}
