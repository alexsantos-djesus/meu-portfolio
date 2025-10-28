import { prisma } from "@/lib/prisma";
export async function GET() {
  const base = "https://www.debuguei.com.br";
  const staticUrls = ["","/sobre","/servicos","/projetos","/contato"].map((p)=> `<url><loc>${base}${p}</loc></url>`).join("");
  const projects = await prisma.project.findMany({ select: { slug: true } });
  const dyn = projects.map(p=> `<url><loc>${base}/projetos#${p.slug}</loc></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${dyn}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
