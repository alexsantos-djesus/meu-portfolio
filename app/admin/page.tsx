import { prisma } from "@/lib/prisma";

export default async function AdminIndex() {
  const [services, projects, leads] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.lead.count(),
  ]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="glass rounded-2xl p-5">
        <div className="text-sm text-zinc-400">Serviços</div>
        <div className="text-3xl font-bold text-neon-cyan">{services}</div>
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="text-sm text-zinc-400">Projetos</div>
        <div className="text-3xl font-bold text-neon-cyan">{projects}</div>
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="text-sm text-zinc-400">Leads</div>
        <div className="text-3xl font-bold text-neon-cyan">{leads}</div>
      </div>
    </div>
  );
}
