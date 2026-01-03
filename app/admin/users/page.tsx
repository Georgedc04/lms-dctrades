import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Role, User } from "@prisma/client";

export default async function AdminUsersPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  const me = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!me || me.role !== Role.SUPER_ADMIN) {
    redirect("/courses");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>

      <div className="bg-white rounded-2xl shadow divide-y">
        {users.map(user => (
          <UserRow
            key={user.id}
            user={user}
            actorId={me.id}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- USER ROW ---------- */

function UserRow({
  user,
  actorId,
}: {
  user: User;
  actorId: string;
}) {
  const isSelf = user.id === actorId;

  async function toggleAdmin() {
    "use server";

    if (user.role === Role.SUPER_ADMIN) return;

    const newRole =
      user.role === Role.ADMIN ? Role.STUDENT : Role.ADMIN;

    await prisma.user.update({
      where: { id: user.id },
      data: { role: newRole },
    });

    await prisma.auditLog.create({
      data: {
        actorId,
        targetId: user.id,
        action:
          newRole === Role.ADMIN
            ? "PROMOTE_ADMIN"
            : "DEMOTE_ADMIN",
      },
    });
  }

  async function toggleActive() {
    "use server";

    if (isSelf) return;

    await prisma.user.update({
      where: { id: user.id },
      data: { isActive: !user.isActive },
    });

    await prisma.auditLog.create({
      data: {
        actorId,
        targetId: user.id,
        action: user.isActive
          ? "DISABLE_USER"
          : "ENABLE_USER",
      },
    });
  }

  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <p className="font-medium">
          {user.name ?? "User"}
        </p>
        <p className="text-sm text-gray-500">
          {user.email ?? "—"}
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-xs px-2 py-1 rounded bg-gray-100">
          {user.role}
        </span>

        <form action={toggleAdmin}>
          <button
            disabled={user.role === Role.SUPER_ADMIN}
            className="border px-3 py-1 rounded text-sm disabled:opacity-40"
          >
            {user.role === Role.ADMIN
              ? "Remove Admin"
              : "Make Admin"}
          </button>
        </form>

        <form action={toggleActive}>
          <button
            disabled={isSelf}
            className="border px-3 py-1 rounded text-sm disabled:opacity-40"
          >
            {user.isActive ? "Disable" : "Enable"}
          </button>
        </form>
      </div>
    </div>
  );
}
