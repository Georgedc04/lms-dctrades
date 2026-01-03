/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  AlertCircle,
  Search,
  Sparkles,
  Layers,
} from "lucide-react";

type Course = {
  id: string;
  title: string;
  imageUrl: string | null;
};

export default async function CoursesPage() {
  let courses: Course[] = [];

  try {
    courses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        imageUrl: true, // ✅ REQUIRED
      },
    });
  } catch {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
        <AlertCircle className="h-8 w-8 text-red-500 mb-3" />
        <h2 className="text-lg font-semibold">Connection Error</h2>
        <p className="text-sm text-slate-500 max-w-xs">
          Please refresh or try again later.
        </p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
        <Search className="h-8 w-8 text-slate-400 mb-3" />
        <h2 className="text-lg font-semibold">No courses yet</h2>
        <p className="text-sm text-slate-500">
          Check back later for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              <Sparkles className="h-4 w-4" />
              Explore Learning
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Available{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Courses
              </span>
            </h1>
          </div>

          <p className="max-w-md text-sm md:text-base text-slate-500">
            Master smart money concepts with expert-led lessons.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE THUMBNAIL */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                {course.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Layers className="h-8 w-8 text-slate-400" />
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex flex-col p-5">
                <div className="mb-3">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Bestseller
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                <p className="mb-5 text-sm text-slate-500 leading-relaxed">
                  Learn smart money concepts step by step with real examples.
                </p>

                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <BookOpen className="h-4 w-4 text-indigo-500" />
                    Self-paced
                  </div>

                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600"
                  >
                    View Course
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
