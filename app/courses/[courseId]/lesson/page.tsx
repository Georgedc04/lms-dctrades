/* eslint-disable @next/next/no-html-link-for-pages */
export default function LessonView() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Lesson Title */}
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Lesson Title
        </h1>

        {/* Video */}
        <div className="mb-8 overflow-hidden rounded-xl bg-black shadow">
          <video
            controls
            className="w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            📄 Download PDF
          </a>

          <a
            href="/courses"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to courses
          </a>
        </div>
      </div>
    </div>
  );
}
