"use server";

import { auth, signIn, signOut } from "@/lib/auth";

export async function toggleAuth() {
  const session = await auth();
  if (session) {
    await signOut({ redirectTo: "/" }); // ← home após sair
    return;
  }
  await signIn("google", { redirectTo: "/admin" });
}
