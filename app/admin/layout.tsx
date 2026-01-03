import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth(); // ✅ await

  if (!userId) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
