import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { 
  BookOpen, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  GraduationCap
} from "lucide-react";

type Props = {
  activeCourseId?: string;
};

export default async function CoursesSidebar({ activeCourseId }: Props) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const clerkUser = await currentUser();

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

  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";

  return (
    <>
      {/* MOBILE TOGGLE - Hidden Checkbox */}
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />

      {/* MOBILE HEADER & BURGER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-blue-600">
          <GraduationCap className="w-8 h-8" />
          <span>LMS Portal</span>
        </div>
        <label
          htmlFor="sidebar-toggle"
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
        >
          <Menu className="w-6 h-6 peer-checked:hidden" />
        </label>
      </div>

      {/* SIDEBAR */}
      <aside
        className="
          fixed inset-y-0 left-0 z-50 w-72 bg-slate-50 border-r
          transform -translate-x-full transition-all duration-300 ease-in-out
          peer-checked:translate-x-0
          md:static md:translate-x-0
          flex flex-col shadow-xl md:shadow-none
        "
      >
        {/* HEADER */}
        <div className="p-6">
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="bg-blue-600 p-2 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              LMS Portal
            </span>
            <label htmlFor="sidebar-toggle" className="md:hidden ml-auto">
              <X className="w-5 h-5 text-slate-400" />
            </label>
          </div>
          
          <h2 className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Main Curriculum
          </h2>
        </div>

        {/* COURSE LIST */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
          {courses.map((course) => {
            const isActive = course.id === activeCourseId;
            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className={`
                  group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                    : "text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm"}
                `}
              >
                <BookOpen className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                <span className="truncate">{course.title}</span>
                {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto border-t border-slate-200 p-4 space-y-2 bg-slate-100/50">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-white transition-all shadow-sm border border-transparent hover:border-slate-200"
          >
            <User className="w-4 h-4" />
            Profile
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-all border border-blue-100"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Panel
            </Link>
          )}

          <SignOutButton redirectUrl="/">
            <button className="flex items-center gap-3 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </aside>

      {/* BACKDROP (MOBILE) */}
      <label
        htmlFor="sidebar-toggle"
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 hidden peer-checked:block md:hidden"
      />
    </>
  );
}