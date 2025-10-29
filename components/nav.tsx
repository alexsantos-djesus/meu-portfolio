"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

const LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/contato", label: "Contato" },
  { href: "/login", label: "Entrar" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // trava o scroll quando o menu mobile abre
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => firstLinkRef.current?.focus(), 10);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // fecha com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const msg = useMemo(
    () =>
      "Olá Alex! Vim pelo seu portfólio (debuguei.dev) e quero falar sobre um projeto.",
    []
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-mono text-neon-cyan text-lg">
          debuguei<span className="text-neon-magenta">.dev</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors ${
                  active ? "text-neon-cyan" : "text-zinc-300 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={whatsappLink(msg)}>
            <Button variant="glow">Fale no WhatsApp</Button>
          </a>

          {/* Mobile toggle */}
          <button
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls={dialogId}
            className="md:hidden grid place-items-center size-9 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-neon-cyan/60"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`relative block h-0.5 w-6 bg-white transition-all before:content-[''] before:absolute before:-translate-y-2 before:h-0.5 before:w-6 before:bg-white before:transition-all after:content-[''] after:absolute after:translate-y-2 after:h-0.5 after:w-6 after:bg-white after:transition-all ${
                open
                  ? "bg-transparent before:translate-y-0 before:rotate-45 after:translate-y-0 after:-rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id={dialogId}
        role="dialog"
        aria-modal="true"
        className={`md:hidden overflow-hidden border-t border-white/10 transition-[max-height] duration-300 ${
          open ? "max-h-[60vh]" : "max-h-0"
        }`}
      >
        {/* overlay clicável para fechar */}
        <button
          className={`${
            open ? "block" : "hidden"
          } fixed inset-0 z-30 bg-black/40 backdrop-blur-sm`}
          aria-hidden
          onClick={() => setOpen(false)}
        />

        <div className="relative z-40 bg-black/80 p-4 space-y-2">
          {LINKS.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                ref={i === 0 ? firstLinkRef : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "text-neon-cyan bg-neon-cyan/10"
                    : "text-zinc-300 hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a href={whatsappLink(msg)} onClick={() => setOpen(false)}>
            <Button className="w-full mt-2" variant="glow">
              Fale no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
