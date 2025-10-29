"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../_auth";
import { put } from "@vercel/blob";

const MAX_FILE_MB = 5;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

function getExtFromMime(mime: string) {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  };
  return map[mime] ?? "bin";
}

async function uploadCoverToBlob(file: File | null) {
  if (!file || file.size === 0) return null;
  if (!file.type.startsWith("image/"))
    throw new Error("Envie uma imagem válida.");
  if (file.size > MAX_FILE_MB * 1024 * 1024)
    throw new Error(`Imagem muito grande. Máximo ${MAX_FILE_MB}MB.`);

  const ext = getExtFromMime(file.type);
  const key = `projects/${crypto.randomUUID()}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { url } = await put(key, new Blob([buffer], { type: file.type }), {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return url; // URL pública
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Título é obrigatório.");

  const slugInput = String(formData.get("slug") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const repoUrl = String(formData.get("repoUrl") || "").trim();
  const demoUrl = String(formData.get("demoUrl") || "").trim();
  const techs = String(formData.get("techs") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const featured = !!formData.get("featured");

  const base = slugify(slugInput || title) || `project-${Date.now()}`;
  let finalSlug = base,
    i = 1;
  while (await prisma.project.findUnique({ where: { slug: finalSlug } })) {
    finalSlug = `${base}-${i++}`;
  }

  // Novo: upload do arquivo da capa
  const coverFile = (formData.get("coverFile") as File) ?? null;
  const coverUrl = await uploadCoverToBlob(coverFile);

  await prisma.project.create({
    data: {
      title,
      slug: finalSlug,
      summary,
      content: {},
      repoUrl: repoUrl || null,
      demoUrl: demoUrl || null,
      coverUrl: coverUrl || null,
      techs,
      featured,
    },
  });

  revalidatePath("/admin/projetos");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const repoUrl = String(formData.get("repoUrl") || "").trim();
  const demoUrl = String(formData.get("demoUrl") || "").trim();
  const techs = String(formData.get("techs") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const featured = !!formData.get("featured");

  const current = await prisma.project.findUnique({
    where: { id },
    select: { slug: true, title: true },
  });
  if (!current) throw new Error("Projeto não encontrado.");

  let newSlug = current.slug;
  if (slugInput && slugInput !== current.slug) {
    const base = slugify(slugInput);
    if (!base) throw new Error("Slug inválido.");
    newSlug = base;
    let i = 1;
    while (await prisma.project.findUnique({ where: { slug: newSlug } })) {
      if (newSlug === current.slug) break;
      newSlug = `${base}-${i++}`;
    }
  }

  // Novo: se vier arquivo, faz upload e substitui a capa
  const coverFile = (formData.get("coverFile") as File) ?? null;
  const newCoverUrl = await uploadCoverToBlob(coverFile);

  await prisma.project.update({
    where: { id },
    data: {
      title: title || current.title,
      slug: newSlug,
      summary,
      repoUrl: repoUrl || null,
      demoUrl: demoUrl || null,
      ...(newCoverUrl ? { coverUrl: newCoverUrl } : {}),
      techs,
      featured,
    },
  });

  revalidatePath("/admin/projetos");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projetos");
}
