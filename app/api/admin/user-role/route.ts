import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!admin || admin.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { targetUserId, role } = await req.json(); // role = "ADMIN" | "STUDENT"

  await prisma.user.update({
    where: { id: targetUserId },
    data: { role },
  });

  return NextResponse.json({ success: true });
}
