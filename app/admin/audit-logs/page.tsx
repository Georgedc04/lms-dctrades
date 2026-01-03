import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuditLogsPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user || user.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      actor: true,
      target: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Audit Logs</h1>
            <p className="text-sm text-gray-500">
              Track all sensitive admin actions
            </p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {logs.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">
            No audit activity recorded yet.
          </div>
        )}

        {/* LOG TABLE */}
        {logs.length > 0 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow">
            <div className="grid grid-cols-4 gap-4 border-b bg-gray-50 px-6 py-3 text-xs font-semibold uppercase text-gray-500">
              <span>Actor</span>
              <span>Action</span>
              <span>Target</span>
              <span>Time</span>
            </div>

            <div className="divide-y">
              {logs.map(log => (
                <div
                  key={log.id}
                  className="grid grid-cols-4 gap-4 px-6 py-4 text-sm hover:bg-gray-50"
                >
                  {/* ACTOR */}
                  <div className="font-medium text-gray-900">
                    {log.actor.email ?? "Unknown"}
                  </div>

                  {/* ACTION */}
                  <div>
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {log.action}
                    </span>
                  </div>

                  {/* TARGET */}
                  <div className="font-medium text-gray-900">
                    {log.target.email ?? "Unknown"}
                  </div>

                  {/* TIME */}
                  <div className="text-xs text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
