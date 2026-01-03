import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lessonId, userId } = body ?? {};

    if (!lessonId || !userId) {
      return NextResponse.json(
        { error: "lessonId and userId required" },
        { status: 400 }
      );
    }

    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId,
        lessonId,
        completed: true,
      },
    });

    return NextResponse.json(
      { success: true, progress },
      { status: 200 }
    );
  } catch (error) {
    console.error("LESSON COMPLETE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to mark lesson complete" },
      { status: 500 }
    );
  }
}

// ⛔ block browser access
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
