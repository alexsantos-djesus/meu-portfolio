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

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-white/10 pb-3">
        <nav className="flex gap-4 text-sm">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/servicos">Serviços</Link>
          <Link href="/admin/projetos">Projetos</Link>
          <Link href="/admin/leads">Leads</Link>
        </nav>

        <form action={toggleAuth}>
          <Button variant="outline">
            {session ? "Sair" : "Entrar com Google"}
          </Button>
        </form>
      </header>
      {children}
    </div>
  );
}
