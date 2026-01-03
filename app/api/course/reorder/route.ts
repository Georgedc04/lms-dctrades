import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type ReorderItem = {
  id: string;
  order: number;
};

export async function POST(req: Request) {
  try {
    const items: ReorderItem[] = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid reorder payload" },
        { status: 400 }
      );
    }

    await prisma.$transaction(
      items.map((item) =>
        prisma.course.update({
          where: { id: item.id },
          data: { order: item.order }, // ✅ ONLY order
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("REORDER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to reorder courses" },
      { status: 500 }
    );
  }
}
