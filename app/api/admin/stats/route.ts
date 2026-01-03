import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [
    courses,
    modules,
    lessons,
    students,
  ] = await Promise.all([
    prisma.course.count(),
    prisma.module.count(),
    prisma.lesson.count(),
    prisma.user.count(), // Clerk users synced here
  ]);

  return NextResponse.json({
    courses,
    modules,
    lessons,
    students,
  });
}
