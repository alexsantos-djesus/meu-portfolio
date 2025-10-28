"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const stacks = [
  "HTML",
  "CSS",
  "Tailwind",
  "Sass",
  "Bootstrap",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue",
  "PHP",
  "MySQLi",
  "PostgreSQL",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "Figma",
];

const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

export default function Sobre() {
  return (
    <div className="space-y-10">
      <motion.header {...fade} transition={{ duration: 0.35 }}>
        <h1 className="text-4xl font-bold">Sobre</h1>
        <p className="mt-2 text-zinc-300 max-w-3xl">
          Sou <span className="text-neon-cyan font-medium">Alex Santos</span>,
          engenheiro front-end + back-end. Construo produtos com foco em{" "}
          <strong>performance</strong>, <strong>SEO</strong> e
          <strong> DX</strong> — sempre com aquele toque{" "}
          <em>retro-futurista</em> que você já viu na home.
        </p>
      </motion.header>

      {/* Bio + Avatar */}
      <section className="grid gap-6 md:grid-cols-[1fr,320px]">
        <motion.div {...fade} className="glass rounded-2xl p-6 leading-relaxed">
          <div className="font-mono text-sm space-y-2">
            <div className="text-neon-cyan">
              alex@debuguei.com.br — Salvador/BA
            </div>
            <div>$ whoami → alex</div>
            <div>
              $ cat bio.txt → "Crio interfaces que brilham no dark mode e APIs
              que não te deixam na mão."
            </div>
          </div>
          <ul className="mt-4 list-disc ml-6 text-zinc-300 text-sm space-y-2">
            <li>
              <strong>Front-end</strong>: Next.js/React, Tailwind, animações com
              Framer Motion, efeitos 3D leves com Three.js.
            </li>
            <li>
              <strong>Back-end</strong>: APIs no App Router, Prisma ORM com
              PostgreSQL (Neon), autenticação com NextAuth.
            </li>
            <li>
              <strong>Dev Experience</strong>: arquitetura limpa, tipagem forte
              (TS), testes de fumaça com Playwright, CI/CD simples.
            </li>
            <li>
              <strong>Negócio</strong>: foco em conversão (LPs), SEO técnico, e
              integrações práticas (WhatsApp, e-mail).
            </li>
          </ul>
        </motion.div>

        <motion.aside
          {...fade}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden ring-1 ring-white/15">
              <Image
                src="/eu.jpeg"
                alt="Alex Santos"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">Alex Santos</h3>
              <p className="text-sm text-zinc-400">Full-stack Engineer</p>
            </div>
          </div>
          <div className="mt-4 text-sm space-y-1">
            <p>
              <span className="text-zinc-400">Disponível para:</span> Landing
              Pages, Sites com Painel, Dashboards e Sistemas sob medida.
            </p>
            <p>
              <span className="text-zinc-400">Atendo via:</span> Brasil (remoto)
              e internacional.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="glass rounded-xl p-3">
              <span className="text-2xl font-bold text-neon-cyan">90+</span>
              <div className="text-zinc-400">Lighthouse</div>
            </div>
            <div className="glass rounded-xl p-3">
              <span className="text-2xl font-bold text-neon-cyan">SEO</span>
              <div className="text-zinc-400">melhorias técnicas</div>
            </div>
          </div>
        </motion.aside>
      </section>

      {/* O que eu entrego */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">O que eu entrego</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              t: "Landing Pages que convertem",
              d: "Componentes reutilizáveis, performance alta, copy enxuta, métricas e testes.",
            },
            {
              t: "Sites com Painel ADM",
              d: "CMS leve com CRUD, Google OAuth, roles e upload (S3-ready).",
            },
            {
              t: "Dashboards e Sistemas",
              d: "Recharts, filtros, exportações, endpoints tipados e banco escalável (Neon).",
            },
          ].map((c, i) => (
            <motion.div
              key={i}
              {...fade}
              transition={{ delay: 0.05 * i }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="font-medium mb-2">{c.t}</h3>
              <p className="text-sm text-zinc-300">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline - terminal style */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Timeline</h2>
        <div className="font-mono text-sm space-y-2 glass rounded-2xl p-6">
          <div>
            <span className="text-neon-cyan">$</span> mkdir debuguei && cd
            debuguei
          </div>
          <div>
            <span className="text-neon-cyan">$</span> git init && code .
          </div>
          <div>
            <span className="text-neon-cyan">$</span> build{" "}
            <span className="text-zinc-400">
              — Landing Pages • Sites com Painel • Dashboards
            </span>
          </div>
          <div>
            <span className="text-neon-cyan">$</span> deploy{" "}
            <span className="text-zinc-400">
              — Vercel + Postgres (Neon) + S3
            </span>
          </div>
          <div>
            <span className="text-neon-cyan">$</span> measure{" "}
            <span className="text-zinc-400">
              — Lighthouse 90+ e monitoramento básico
            </span>
          </div>
        </div>
      </section>

      {/* Stacks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Stacks & Ferramentas</h2>
        <div className="grid md:grid-cols-4 gap-3">
          {stacks.map((s) => (
            <motion.div key={s} whileHover={{ y: -2 }}>
              <Badge>{s}</Badge>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Diferenciais</h2>
        <ul className="grid md:grid-cols-2 gap-2 text-sm text-zinc-300">
          <li className="glass rounded-xl p-3">
            App Router com rotas server e APIs tipadas.
          </li>
          <li className="glass rounded-xl p-3">
            Componentização com shadcn/ui + Tailwind (tema neon, glassmorphism).
          </li>
          <li className="glass rounded-xl p-3">
            Auth com Google (NextAuth) e controle por roles.
          </li>
          <li className="glass rounded-xl p-3">
            Banco relacional com Prisma + Neon/PostgreSQL (migrations e seed).
          </li>
          <li className="glass rounded-xl p-3">
            Animações suaves com Framer e 3D leve com Three.js.
          </li>
          <li className="glass rounded-xl p-3">
            Qualidade: A11y, Lighthouse, testes de fumaça (Playwright).
          </li>
        </ul>
      </section>
    </div>
  );
}
