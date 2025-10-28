import { prisma } from "@/lib/prisma";
export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json({ projects });
}
