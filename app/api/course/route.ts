import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all courses (admin)
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// CREATE course
export async function POST(req: Request) {
  try {
    const { title, price } = await req.json();

    if (!title || !price) {
      return NextResponse.json(
        { error: "Title and price required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        price: Number(price),
        isPublished: false, // default
      },
    });

    return NextResponse.json(course);
  } catch {
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}

// ✅ PUBLISH / UNPUBLISH COURSE (CASCADE TO LESSONS)
export async function PATCH(req: Request) {
  try {
    const { id, isPublished } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Course id required" },
        { status: 400 }
      );
    }

    // 1️⃣ Update course publish state
    const course = await prisma.course.update({
      where: { id },
      data: { isPublished },
    });

    // 2️⃣ Cascade update ALL lessons under this course
    await prisma.lesson.updateMany({
      where: {
        module: {
          courseId: id,
        },
      },
      data: {
        isPublished,
      },
    });

    return NextResponse.json(course);
  } catch {
    return NextResponse.json(
      { error: "Failed to update publish state" },
      { status: 500 }
    );
  }
}
