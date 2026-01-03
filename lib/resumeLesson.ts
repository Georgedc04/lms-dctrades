import { prisma } from "@/lib/prisma";

export async function getResumeLessonId(
  userId: string,
  courseId: string
) {
  const lessons = await prisma.lesson.findMany({
    where: {
      isPublished: true,
      module: { courseId },
    },
    orderBy: [
      { module: { order: "asc" } },
      { order: "asc" },
    ],
    select: { id: true },
  });

  if (lessons.length === 0) return null;

  const completed = await prisma.lessonProgress.findMany({
    where: {
      userId,
      completed: true,
      lessonId: { in: lessons.map(l => l.id) },
    },
    select: { lessonId: true },
  });

  const completedSet = new Set(completed.map(c => c.lessonId));

  const nextLesson =
    lessons.find(l => !completedSet.has(l.id)) ?? lessons.at(-1);

  return nextLesson?.id ?? null;
}
