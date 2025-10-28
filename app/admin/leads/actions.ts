"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../_auth";
import { LeadStatus } from "@prisma/client";

export async function setLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW") as LeadStatus;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

export async function deleteLead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}
