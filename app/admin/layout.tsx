import Link from "next/link";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { toggleAuth } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const user = session?.user as
    | (typeof session.user & { isActive?: boolean; role?: string })
    | undefined;
  const canAdmin = !!user?.isActive;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-white/10 pb-3">
        <nav className="flex gap-4 text-sm">
          {canAdmin ? (
            <>
              <Link href="/admin">Dashboard</Link>
              <Link href="/admin/servicos">Serviços</Link>
              <Link href="/admin/projetos">Projetos</Link>
              <Link href="/admin/leads">Leads</Link>
            </>
          ) : (
            <span className="text-zinc-400">Admin</span>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-xs text-zinc-400">
                {user?.name ?? user?.email}
                {user?.role ? (
                  <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-300">
                    {user.role}
                  </span>
                ) : null}
                {!canAdmin ? (
                  <span className="ml-2 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-red-300">
                    sem acesso
                  </span>
                ) : (
                  <span className="ml-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-300">
                    ativo
                  </span>
                )}
              </span>
              <form action={toggleAuth}>
                <Button variant="outline">Sair</Button>
              </form>
            </>
          ) : (
            <form action={toggleAuth}>
              <Button variant="outline">Entrar com Google</Button>
            </form>
          )}
        </div>
      </header>

      {canAdmin ? (
        <>{children}</>
      ) : (
        <section className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Acesso negado</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Você precisa de permissão para acessar a área administrativa.
            {session
              ? " Fale com o administrador para liberar seu acesso."
              : " Faça login com sua conta autorizada."}
          </p>
          <div className="mt-4">
            <form action={toggleAuth}>
              <Button variant="outline">
                {session ? "Trocar conta" : "Entrar com Google"}
              </Button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
