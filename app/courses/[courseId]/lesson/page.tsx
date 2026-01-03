import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LessonView({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const { courseId, lessonId } = params;

  if (!lessonId) {
    return <div className="p-6 text-sm text-red-500">Invalid lesson</div>;
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson || !lesson.isPublished) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Lesson not found or unpublished
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {lesson.title}
          </h1>
        </div>

        {/* VIDEO */}
        {lesson.videoUrl && (
          <div className="overflow-hidden rounded-2xl bg-black shadow">
            <video
              controls
              src={lesson.videoUrl}
              className="w-full"
            />
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {lesson.pdfUrl && (
            <a
              href={lesson.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              📄 Download PDF
            </a>
          )}

          <Link
            href={`/courses/${courseId}`}
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            ← Back to course
          </Link>
        </div>

      </div>
    </div>
  );
}
