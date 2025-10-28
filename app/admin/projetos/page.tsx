import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { updateProject, deleteProject } from "./actions";

export default async function AdminProjetos() {
  const items = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Projetos</h1>
      <div className="overflow-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="p-3">Título</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Techs</th>
              <th className="p-3">Repo</th>
              <th className="p-3">Demo</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="p-3">
                  <form
                    action={updateProject}
                    className="flex gap-2 items-center"
                  >
                    <input type="hidden" name="id" defaultValue={p.id} />
                    <input
                      className="rounded bg-black/40 border border-white/15 px-2 py-1"
                      name="title"
                      defaultValue={p.title}
                    />
                    <input
                      className="hidden"
                      name="summary"
                      defaultValue={p.summary}
                    />
                    <input
                      className="hidden"
                      name="techs"
                      defaultValue={p.techs.join(", ")}
                    />
                    <input
                      className="hidden"
                      name="repoUrl"
                      defaultValue={p.repoUrl ?? ""}
                    />
                    <input
                      className="hidden"
                      name="demoUrl"
                      defaultValue={p.demoUrl ?? ""}
                    />
                    <input
                      className="hidden"
                      name="featured"
                      defaultValue={String(p.featured)}
                    />
                    <Button variant="outline">Salvar</Button>
                  </form>
                </td>
                <td className="p-3">{p.slug}</td>
                <td className="p-3">{p.techs.join(", ")}</td>
                <td className="p-3">
                  {p.repoUrl ? (
                    <a className="underline" href={p.repoUrl}>
                      GitHub
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3">
                  {p.demoUrl ? (
                    <a className="underline" href={p.demoUrl}>
                      Demo
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3">
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={p.id} />
                    <Button variant="outline">Remover</Button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="p-4 text-zinc-400" colSpan={6}>
                  Nenhum projeto. Rode o seed.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
