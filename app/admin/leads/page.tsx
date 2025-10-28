import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { deleteLead, setLeadStatus } from "./actions";

export default async function AdminLeads() {
  const items = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Leads</h1>
      <div className="overflow-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">E-mail</th>
              <th className="p-3">Serviço</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((l) => (
              <tr key={l.id} className="border-t border-white/10">
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.email}</td>
                <td className="p-3">{l.serviceSlug ?? "-"}</td>
                <td className="p-3">
                  <form
                    action={setLeadStatus}
                    className="flex items-center gap-2"
                  >
                    <input type="hidden" name="id" defaultValue={l.id} />
                    <select
                      name="status"
                      defaultValue={l.status}
                      className="rounded bg-black/40 border border-white/15 px-2 py-1"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="WON">WON</option>
                      <option value="LOST">LOST</option>
                    </select>
                    <Button variant="outline">Salvar</Button>
                  </form>
                </td>
                <td className="p-3">
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={l.id} />
                    <Button variant="outline">Remover</Button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="p-4 text-zinc-400" colSpan={5}>
                  Nenhum lead ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
