import CoursesSidebar from "@/components/CoursesSidebar";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <CoursesSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
