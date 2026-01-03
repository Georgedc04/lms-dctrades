import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuditPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      actor: { select: { email: true, role: true } },
      target: { select: { email: true, role: true } },
    },
  });

  return <div>Audit Logs</div>;
}
