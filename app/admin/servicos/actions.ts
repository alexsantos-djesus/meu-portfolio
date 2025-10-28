"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../_auth";

export async function createService(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "");
  const shortDesc = String(formData.get("shortDesc") || "");
  const longDesc = String(formData.get("longDesc") || "");
  const baseStack = String(formData.get("baseStack") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const features = String(formData.get("features") || "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const ctaWhatsapp = String(formData.get("ctaWhatsapp") || "Quero saber mais");
  await prisma.service.create({
    data: {
      title,
      slug,
      shortDesc,
      longDesc,
      baseStack,
      features,
      ctaWhatsapp,
    },
  });
  revalidatePath("/admin/servicos");
}

export async function updateService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const shortDesc = String(formData.get("shortDesc") || "");
  const longDesc = String(formData.get("longDesc") || "");
  const baseStack = String(formData.get("baseStack") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const features = String(formData.get("features") || "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const isActive = String(formData.get("isActive") || "true") === "true";
  const ctaWhatsapp = String(formData.get("ctaWhatsapp") || "Quero saber mais");
  await prisma.service.update({
    where: { id },
    data: {
      title,
      shortDesc,
      longDesc,
      baseStack,
      features,
      isActive,
      ctaWhatsapp,
    },
  });
  revalidatePath("/admin/servicos");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/servicos");
}
