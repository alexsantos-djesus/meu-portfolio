"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  slug: string; // para nome do arquivo na pasta /public/projects
  repo: string;
  demo?: string;
  stack: string[];
  blurb: string;
};

const projects: Project[] = [
  {
    title: "Instituto Beth Leite",
    slug: "instituto-beth-leite",
    repo: "https://github.com/alexsantos-djesus/Instituto-Beth-Leite",
    demo: "",
    stack: ["Next.js", "Tailwind", "A11y", "SEO"],
    blurb:
      "Site institucional com foco em acessibilidade e SEO. Home com hero informativo, áreas do instituto e chamadas para apoio/contato.",
  },
  {
    title: "Cardápio Online",
    slug: "cardapio",
    repo: "https://github.com/alexsantos-djesus/Cardapio",
    demo: "",
    stack: ["HTML", "CSS", "JS"],
    blurb:
      "Cardápio digital leve e responsivo. Seções por categorias e destaque para promoções — ideal para restaurantes.",
  },
  {
    title: "Refrigeração — Website",
    slug: "refrigeracao-site",
    repo: "https://github.com/alexsantos-djesus/refrigeracao-site",
    demo: "",
    stack: ["Bootstrap", "JS", "SEO Local"],
    blurb:
      "Landing institucional para serviços de refrigeração com foco em conversão local (WhatsApp + mapas).",
  },
  {
    title: "SamCreds — Landing Page",
    slug: "samcreds-landing-page",
    repo: "https://github.com/alexsantos-djesus/Samcreds-landing-page",
    demo: "",
    stack: ["HTML", "CSS", "JS"],
    blurb:
      "Landing otimizada para captação de leads no nicho de crédito, com benefícios claros e CTAs de WhatsApp.",
  },
  {
    title: "Smart Clinic",
    slug: "smart-clinic",
    repo: "https://github.com/alexsantos-djesus/smart-clinic",
    demo: "",
    stack: ["Next.js", "Prisma", "Postgres"],
    blurb:
      "Protótipo de clínica inteligente: agendamentos, listagem e base para painel administrativo (stack moderna).",
  },
  {
    title: "Clínica Dental",
    slug: "clinicadental",
    repo: "https://github.com/alexsantos-djesus/clinicadental",
    demo: "",
    stack: ["HTML", "CSS", "JS"],
    blurb:
      "Site temático para consultório odontológico, visual limpo, seções de serviços e depoimentos.",
  },
];

export default function ProjectsShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Projetos</h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr items-stretch">
        {projects.map((p, idx) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.03 }}
            className="glass rounded-2xl p-4 flex flex-col h-full"
          >
            {/* thumb */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-white/10 bg-gradient-to-br from-white/5 to-white/0 mb-3">
              {/* Coloque a imagem em public/projects/<slug>.jpg|png */}
              <Image
                src={`/projects/${p.slug}.png`}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
                priority={false}
              />
            </div>

            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-zinc-300">{p.blurb}</p>

            {/* badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-1 rounded-xl border border-white/10 text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* footer buttons */}
            <div className="mt-auto pt-3 flex gap-2">
              <a href={p.repo} target="_blank" rel="noreferrer">
                <Button variant="outline">Ver repositório</Button>
              </a>
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer">
                  <Button variant="outline">Ver demo</Button>
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
