import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  ArrowLeft, 
  PlayCircle, 
  BookOpen, 
  ChevronRight, 
  GraduationCap, 
  Circle} from "lucide-react";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  if (!courseId) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6 text-sm text-red-500">
        Invalid course selection.
      </div>
    );
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
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-slate-500">
        <BookOpen className="h-12 w-12 opacity-20" />
        <p>Course not found</p>
        <Link href="/courses" className="text-indigo-600 font-medium hover:underline">Return to library</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* HEADER STRIP */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Link
            href="/courses"
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Library
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-600">
                <GraduationCap className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Full Curriculum</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                {course.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase">Total Content</p>
                    <p className="text-sm font-bold text-slate-700">{course.modules.length} Modules</p>
                </div>
                <div className="h-8 w-[1px] bg-slate-200" />
                <PlayCircle className="h-8 w-8 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* MODULES LIST */}
        <div className="space-y-10">
          {course.modules.map((module, index) => (
            <div key={module.id} className="relative">
              {/* Vertical connector line for visual flow */}
              {index !== course.modules.length - 1 && (
                <div className="absolute left-[26px] top-16 bottom-[-40px] w-0.5 bg-slate-200" />
              )}

              <div className="flex gap-6">
                {/* Module Numbering Bubble */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-100">
                  {index + 1}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="pt-2">
                    <h2 className="text-2xl font-bold text-slate-900 leading-none">
                      {module.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Module focus and key learning objectives.
                    </p>
                  </div>

                  {/* LESSONS CONTAINER */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                    {module.lessons.length === 0 ? (
                      <div className="flex items-center gap-3 px-6 py-8 text-slate-400 italic">
                        <Circle className="h-4 w-4" />
                        <p className="text-sm">No lessons published in this module yet.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-50">
                        {module.lessons.map((lesson, i) => (
                          <Link
                            key={lesson.id}
                            href={`/courses/${course.id}/lesson/${lesson.id}`}
                            className="group flex items-center justify-between px-6 py-5 transition-all hover:bg-slate-50"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-200 text-[10px] font-bold text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors">
                                {i + 1}
                              </div>
                              <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-slate-300 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Start Lesson</span>
                                <div className="rounded-full bg-slate-100 p-1 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}