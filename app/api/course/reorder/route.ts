import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const items: { id: string; order: number }[] = await req.json();

  await prisma.$transaction(
    items.map(i =>
      prisma.course.update({
        where: { id: i.id },
        data: { order: i.order },
      })
    )
  );

  return NextResponse.json({ success: true });
}
