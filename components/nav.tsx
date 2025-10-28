"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-mono text-neon-cyan text-lg">
          debuguei<span className="text-neon-magenta">.dev</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/sobre">Sobre</Link>
          <Link href="/servicos">Serviços</Link>
          <Link href="/projetos">Projetos</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/login">Entrar</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contato">
            <Button variant="glow">Fale no WhatsApp</Button>
          </Link>
          <button
            aria-label="Abrir menu"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white mb-1" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden p-4 space-y-2 border-t border-white/10">
          <Link href="/sobre" onClick={() => setOpen(false)}>
            Sobre
          </Link>
          <Link href="/servicos" onClick={() => setOpen(false)}>
            Serviços
          </Link>
          <Link href="/projetos" onClick={() => setOpen(false)}>
            Projetos
          </Link>
          <Link href="/contato" onClick={() => setOpen(false)}>
            Contato
          </Link>
          <Link href="/login" onClick={() => setOpen(false)}>
            Entrar
          </Link>
        </div>
      )}
    </header>
  );
}
