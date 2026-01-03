import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, moduleId, videoUrl, pdfUrl } = await req.json();

    if (!title || !moduleId || !videoUrl || !pdfUrl) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        moduleId,
        videoUrl,
        pdfUrl,
        isPublished: false, // 🔒 locked by default
        order: 0,           // lesson ordering later
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("LESSON CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create lesson" },
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
