import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { whatsappLink } from "@/lib/whatsapp";

export async function POST(req: Request) {
  const body = await req.json().catch(()=> ({}));
  const { name, email, phone, service, message } = body ?? {};
  const lead = await prisma.lead.create({ data: { name, email, phone, serviceSlug: service, message, source: "site" } });
  const text = `Olá Alex! Sou ${lead.name}. Tenho interesse em ${service ?? "um projeto"} — ${message ?? ""}`.trim();
  const whatsapp = whatsappLink(text);
  return NextResponse.json({ ok: true, whatsapp, leadId: lead.id });
}
