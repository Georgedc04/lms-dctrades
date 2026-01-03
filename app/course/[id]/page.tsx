import { prisma } from "@/lib/prisma";

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!course) return <div>Course not found</div>;

  return (
    <div>
      <h1>{course.title}</h1>

      {course.modules.map(m => (
        <div key={m.id}>
          <h3>{m.title}</h3>
          {m.lessons.map(l => (
            <a key={l.id} href={`/lesson/${l.id}`}>
              ▶ {l.title}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
