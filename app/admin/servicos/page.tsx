import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { EditServiceDialog } from "@/components/admin/EditServiceDialog";
import { createService, updateService, deleteService } from "./actions";

export default async function AdminServicos() {
  const items = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Serviços</h1>

      {/* Criar */}
      <form
        action={createService}
        className="grid md:grid-cols-5 gap-2 glass p-3 rounded-2xl"
      >
        <input
          className="rounded-xl bg-black/40 border border-white/15 px-3 py-2"
          name="title"
          placeholder="Título"
        />
        <input
          className="rounded-xl bg-black/40 border border-white/15 px-3 py-2"
          name="slug"
          placeholder="slug"
        />
        <input
          className="rounded-xl bg-black/40 border border-white/15 px-3 py-2"
          name="shortDesc"
          placeholder="Descrição curta"
        />
        <input
          className="rounded-xl bg-black/40 border border-white/15 px-3 py-2"
          name="baseStack"
          placeholder="Stack (ex: Next.js, Prisma)"
        />
        <Button type="submit">Adicionar</Button>
        <input className="hidden" name="longDesc" defaultValue="" />
        <input className="hidden" name="features" defaultValue="" />
        <input
          className="hidden"
          name="ctaWhatsapp"
          defaultValue="Quero saber mais"
        />
      </form>

      {/* Tabela */}
      <div className="overflow-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="p-3">Título</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Stack</th>
              <th className="p-3">Ativo</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id} className="border-t border-white/10">
                <td className="p-3">{s.title}</td>
                <td className="p-3">{s.slug}</td>
                <td className="p-3">{s.baseStack.join(", ")}</td>
                <td className="p-3">{s.isActive ? "Sim" : "Não"}</td>
                <td className="p-3 flex gap-2">
                  <EditServiceDialog service={s} onAction={updateService} />
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={s.id} />
                    <Button variant="outline">Remover</Button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="p-4 text-zinc-400" colSpan={5}>
                  Nenhum serviço. Rode o seed.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
