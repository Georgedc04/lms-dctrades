import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  FileText, 
  ChevronRight, 
  MonitorPlay, 
  ExternalLink,
  AlertCircle
} from "lucide-react";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>; // Updated to Promise for Next.js 15
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { courseId, lessonId } = await params;

  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      isPublished: true,
      module: {
        courseId,
      },
    },
    include: {
      module: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="rounded-full bg-amber-50 p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Lesson not found</h2>
        <p className="mt-2 text-slate-500">The lesson you are looking for might be private or moved.</p>
        <Link href={`/courses/${courseId}`} className="mt-6 font-semibold text-indigo-600 hover:text-indigo-700">
          Return to course overview
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER / BREADCRUMB NAV */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2 overflow-hidden text-sm font-medium">
            <Link 
              href="/courses" 
              className="text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Courses
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <Link 
              href={`/courses/${courseId}`}
              className="text-slate-500 hover:text-indigo-600 transition-colors truncate"
            >
              {lesson.module.course.title}
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-300 shrink-0" />
            <span className="text-slate-900 truncate font-bold">{lesson.title}</span>
          </div>
          
          <Link
            href={`/courses/${courseId}`}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-10 lg:py-16">
        <div className="space-y-8">
          
          {/* TITLE SECTION */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              <MonitorPlay className="h-4 w-4" />
              <span>Module: {lesson.module.title}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 md:text-5xl tracking-tight leading-tight">
              {lesson.title}
            </h1>
          </div>

          {/* VIDEO PLAYER SECTION */}
          {lesson.videoUrl ? (
            <div className="group relative overflow-hidden rounded-3xl bg-black shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transition-all">
              <div className="aspect-video w-full">
                <iframe
                  src={lesson.videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
             <div className="flex aspect-video items-center justify-center rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200">
               <p className="text-slate-400 font-medium">No video content for this lesson.</p>
             </div>
          )}

          {/* BOTTOM SECTION: RESOURCES */}
          <div className="pt-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Lesson Resources</h3>
                <p className="text-slate-500 text-sm">Downloadable materials and notes for this session.</p>
              </div>

              {lesson.pdfUrl ? (
                <a
                  href={lesson.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95"
                >
                  <FileText className="h-5 w-5" />
                  View PDF Notes
                  <ExternalLink className="h-4 w-4 opacity-50" />
                </a>
              ) : (
                <div className="text-sm font-medium text-slate-400 italic">
                  No attachments available
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}