"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react";

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
const certs = [
  { t: "Next.js Avançado", org: "Vercel" },
  { t: "TypeScript para Projetos Reais", org: "" },
  { t: "Prisma ORM & Postgres", org: "" },
  { t: "Acessibilidade Web (WCAG AA)", org: "" },
];

const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

export default function Sobre() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <motion.header {...fade} transition={{ duration: 0.35 }}>
        <h1 className="text-4xl font-bold">Sobre</h1>
        <p className="mt-2 text-zinc-300 max-w-3xl">
          Sou <span className="text-neon-cyan font-medium">Alex Santos</span>,
          engenheiro front-end + back-end. Construo produtos com foco em{" "}
          <strong>performance</strong>, <strong>SEO</strong> e{" "}
          <strong>DX</strong> — com estética geek/retro-futurista, animações
          suaves e 3D leve.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://github.com/alexsantos-djesus"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/alexsantos-djesus"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </a>
          <a href="mailto:alex@debuguei.com.br">
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              E-mail
            </Button>
          </a>
          <a
            href="https://wa.me/5571992620696?text=Ol%C3%A1%20Alex!%20Vim%20pelo%20portf%C3%B3lio%20e%20quero%20falar%20sobre%20um%20projeto."
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </a>
          <a href="/cv/Currículo-Alex-Santos-de-Jesus.pdf" download>
            <Button variant="glow">
              <Download className="mr-2 h-4 w-4" />
              Baixar CV
            </Button>
          </a>
        </div>
      </motion.header>

      {/* BIO + AVATAR + MÉTRICAS */}
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
              <strong>Front-end</strong>: Next.js/React, Tailwind, Framer Motion
              e Three.js.
            </li>
            <li>
              <strong>Back-end</strong>: APIs no App Router, Prisma ORM +
              PostgreSQL (Neon), NextAuth.
            </li>
            <li>
              <strong>DX</strong>: arquitetura limpa, TypeScript forte, testes
              de fumaça (Playwright), CI/CD simples.
            </li>
            <li>
              <strong>Negócio</strong>: foco em conversão, SEO técnico e
              integrações práticas (WhatsApp/e-mail).
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
              <div className="text-zinc-400">técnico</div>
            </div>
          </div>
        </motion.aside>
      </section>

      {/* O QUE ENTREGO */}
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
              d: "CRUD, Google OAuth, controle de roles e upload (S3-ready).",
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

      {/* CERTIFICAÇÕES */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Certificações & Cursos</h2>
        <ul className="grid md:grid-cols-2 gap-2 text-sm">
          {certs.map((c) => (
            <li
              key={c.t}
              className="glass rounded-xl p-3 flex items-center justify-between"
            >
              <span>{c.t}</span>
              {c.org ? (
                <span className="text-xs text-zinc-400">{c.org}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* TIMELINE */}
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
              — LPs • Sites com Painel • Dashboards
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
              — Lighthouse 90+ e monitoramento
            </span>
          </div>
        </div>
      </section>

      {/* STACKS */}
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

      {/* JSON-LD Person (SEO) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Alex Santos",
            email: "mailto:alex@debuguei.com.br",
            jobTitle: "Full-stack Engineer",
            url: "https://www.debuguei.com.br",
            sameAs: [
              "https://github.com/alexsantos-djesus",
              "https://www.linkedin.com/in/alexsantos-djesus",
            ],
          }),
        }}
      />
    </div>
  );
}
