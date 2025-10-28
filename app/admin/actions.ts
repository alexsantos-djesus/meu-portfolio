"use server";

import { auth, signIn, signOut } from "@/lib/auth";

export async function toggleAuth() {
  const session = await auth();
  if (session) {
    await signOut();
    return;
  }
  await signIn("google");
}
