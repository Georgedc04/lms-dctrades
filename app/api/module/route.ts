/* eslint-disable @next/next/no-assign-module-variable */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ---------- CREATE ---------- */
export async function POST(req: Request) {
  const { title, courseId } = await req.json();

  const last = await prisma.module.findFirst({
    where: { courseId },
    orderBy: { order: "desc" },
  });

  const newModule = await prisma.module.create({
    data: {
      title,
      courseId,
      order: (last?.order ?? 0) + 1,
    },
  });

  return NextResponse.json(newModule);
}

/* ---------- READ ---------- */
export async function GET() {
  const modules = await prisma.module.findMany({
    include: { course: true },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(modules);
}

/* ---------- UPDATE ---------- */
export async function PATCH(req: Request) {
  const { id, title, courseId } = await req.json();

  const module = await prisma.module.update({
    where: { id },
    data: { title, courseId },
  });

  return NextResponse.json(module);
}

/* ---------- DELETE ---------- */
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.module.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
