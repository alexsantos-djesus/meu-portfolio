import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProject, updateProject, deleteProject } from "./actions";

export default async function AdminProjetos() {
  const items = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Projetos</h1>

      {/* Adicionar */}
      <section className="glass rounded-2xl p-4">
        <h2 className="font-semibold mb-3">Adicionar novo projeto</h2>
        <form
          action={createProject}
          encType="multipart/form-data"
          className="grid gap-3 md:grid-cols-2"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400">Título*</label>
            <input
              name="title"
              required
              className="rounded bg-black/40 border border-white/15 px-2 py-1"
              placeholder="Ex.: Smart Clinic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400">Slug (opcional)</label>
            <input
              name="slug"
              className="rounded bg-black/40 border border-white/15 px-2 py-1"
              placeholder="smart-clinic"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-xs text-zinc-400">Resumo</label>
            <textarea
              name="summary"
              rows={3}
              className="rounded bg-black/40 border border-white/15 px-2 py-2"
              placeholder="Breve descrição..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400">Techs (vírgula)</label>
            <input
              name="techs"
              className="rounded bg-black/40 border border-white/15 px-2 py-1"
              placeholder="Next.js, Prisma, Postgres"
            />
          </div>

          {/* Novo: upload de capa */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400">Capa (imagem)</label>
            <input
              name="coverFile"
              type="file"
              accept="image/*"
              className="rounded bg-black/40 border border-white/15 px-2 py-1"
            />
            <span className="text-[11px] text-zinc-400">
              PNG/JPG/WEBP até 5MB
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400">Repositório</label>
            <input
              name="repoUrl"
              className="rounded bg-black/40 border border-white/15 px-2 py-1"
              placeholder="https://github.com/..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400">Demo</label>
            <input
              name="demoUrl"
              className="rounded bg-black/40 border border-white/15 px-2 py-1"
              placeholder="https://demo..."
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              className="size-4"
            />
            <label htmlFor="featured" className="text-sm text-zinc-300">
              Destacar na vitrine
            </label>
          </div>
          <div className="md:col-span-2">
            <Button variant="outline">Adicionar</Button>
          </div>
        </form>
      </section>

      {/* Lista + Edição */}
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
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.slug}</td>
                <td className="p-3">{p.techs.join(", ")}</td>
                <td className="p-3">
                  {p.repoUrl ? (
                    <a
                      className="underline"
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3">
                  {p.demoUrl ? (
                    <a
                      className="underline"
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Demo
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  {/* EDITAR */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Editar</Button>
                    </DialogTrigger>

                    <DialogContent
                      className="
      w-[92vw] sm:max-w-lg md:max-w-xl 
      p-4 sm:p-6 rounded-2xl 
      max-h-[80vh] overflow-y-auto
    "
                    >
                      <DialogHeader className="mb-2">
                        <DialogTitle className="text-lg">
                          Editar projeto
                        </DialogTitle>
                      </DialogHeader>

                      <form
                        action={updateProject}
                        encType="multipart/form-data"
                        className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2"
                      >
                        <input type="hidden" name="id" defaultValue={p.id} />

                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-zinc-400">
                            Título*
                          </label>
                          <input
                            name="title"
                            defaultValue={p.title}
                            required
                            className="rounded bg-black/40 border border-white/15 px-2 py-1"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-zinc-400">Slug</label>
                          <input
                            name="slug"
                            defaultValue={p.slug}
                            className="rounded bg-black/40 border border-white/15 px-2 py-1"
                          />
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-2">
                          <label className="text-xs text-zinc-400">
                            Resumo
                          </label>
                          <textarea
                            name="summary"
                            defaultValue={p.summary ?? ""}
                            rows={3}
                            className="rounded bg-black/40 border border-white/15 px-2 py-2"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-zinc-400">
                            Techs (vírgula)
                          </label>
                          <input
                            name="techs"
                            defaultValue={p.techs.join(", ")}
                            className="rounded bg-black/40 border border-white/15 px-2 py-1"
                          />
                        </div>

                        {/* Capa */}
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <label className="text-xs text-zinc-400">
                            Capa (atual / trocar)
                          </label>
                          {p.coverUrl ? (
                            <img
                              src={p.coverUrl}
                              alt=""
                              className="h-24 w-full object-cover rounded border border-white/10"
                            />
                          ) : (
                            <div className="text-xs text-zinc-400">
                              Sem capa
                            </div>
                          )}
                          <input
                            name="coverFile"
                            type="file"
                            accept="image/*"
                            className="rounded bg-black/40 border border-white/15 px-2 py-1"
                          />
                          <span className="text-[11px] text-zinc-400">
                            Enviar um arquivo substitui a capa atual (máx. 5MB).
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-zinc-400">
                            Repositório
                          </label>
                          <input
                            name="repoUrl"
                            defaultValue={p.repoUrl ?? ""}
                            className="rounded bg-black/40 border border-white/15 px-2 py-1"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-zinc-400">Demo</label>
                          <input
                            name="demoUrl"
                            defaultValue={p.demoUrl ?? ""}
                            className="rounded bg-black/40 border border-white/15 px-2 py-1"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            id={`featured-${p.id}`}
                            name="featured"
                            type="checkbox"
                            className="size-4"
                            defaultChecked={p.featured}
                          />
                          <label
                            htmlFor={`featured-${p.id}`}
                            className="text-sm text-zinc-300"
                          >
                            Destacar
                          </label>
                        </div>

                        <div className="md:col-span-2">
                          <Button variant="outline">Salvar alterações</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* REMOVER */}
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
                  Nenhum projeto. Adicione acima.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
