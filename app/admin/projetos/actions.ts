"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../_auth";

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const summary = String(formData.get("summary") || "");
  const repoUrl = String(formData.get("repoUrl") || "");
  const demoUrl = String(formData.get("demoUrl") || "");
  const techs = String(formData.get("techs") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const featured = String(formData.get("featured") || "false") === "true";
  await prisma.project.update({
    where: { id },
    data: { title, summary, repoUrl, demoUrl, techs, featured },
  });
  revalidatePath("/admin/projetos");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projetos");
}
