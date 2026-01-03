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
    const { title, price, imageUrl } = await req.json();

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
        imageUrl: imageUrl ?? null, // ✅ SAVE THUMBNAIL
        isPublished: false,
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

// UPDATE / PUBLISH / UNPUBLISH COURSE
export async function PATCH(req: Request) {
  try {
    const { id, title, price, imageUrl, isPublished } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Course id required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(price !== undefined && { price: Number(price) }),
        ...(imageUrl !== undefined && { imageUrl }), // ✅ UPDATE THUMBNAIL
        ...(isPublished !== undefined && { isPublished }),
      },
    });

    // Cascade publish to lessons
    if (isPublished !== undefined) {
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
    }

    return NextResponse.json(course);
  } catch {
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
