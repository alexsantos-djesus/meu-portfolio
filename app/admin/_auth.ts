"use server";

import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session?.user || role !== "ADMIN") {
    throw new Error("Acesso negado: somente ADMIN.");
  }
}
