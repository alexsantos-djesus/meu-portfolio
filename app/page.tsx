"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

const TechCube = dynamic<{ paused?: boolean }>(
  () => import("@/components/3d/TechCube"),
  { ssr: false, loading: () => <div className="h-60" /> }
);
const WeatherDemo = dynamic(() => import("@/components/demos/WeatherDemo"), {
  ssr: false,
});
const JockeyGame = dynamic(() => import("@/components/demos/JockeyGame"), {
  ssr: false,
});
const FinancePro = dynamic(() => import("@/components/demos/FinancePro"), {
  ssr: false,
});
const SchedulerMini = dynamic(() => import("@/components/demos/SchedulerMini"),
  { ssr: false }
);
const TodoListDemo = dynamic(() => import("@/components/demos/TodoListDemo"), {
  ssr: false,
});

const roles = [
  "Full-stack Engineer",
  "Next.js Specialist",
  "Prisma + Postgres",
  "UI Animations",
];

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [paused3D, setPaused3D] = useState(prefersReducedMotion);
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % roles.length),
      2200
    );
    return () => clearInterval(id);
  }, [prefersReducedMotion]);
  const role = useMemo(() => roles[roleIdx], [roleIdx]);

  const msg =
    "Olá Alex! Vim pelo seu portfólio e quero falar sobre um projeto.";

  return (
    <div className="space-y-14">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            <span className="text-neon-cyan block">Alex Santos</span>
            <span className="block mt-2 text-2xl md:text-3xl text-zinc-300 font-mono">
              <Typewriter text={role} />
            </span>
          </motion.h1>
          <p className="mt-4 text-zinc-300 max-w-xl">
            Portfólio + vitrine de serviços. Foco em{" "}
            <strong>performance</strong>, <strong>SEO</strong> e{" "}
            <strong>DX</strong>, com estética geek/retro-futurista, animações
            suaves e 3D leve.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/projetos">
              <Button variant="outline">Ver Projetos</Button>
            </Link>
            <Link href="/servicos">
              <Button variant="outline">Ver Serviços</Button>
            </Link>
            <a href={whatsappLink(msg)}>
              <Button variant="glow">Fale no WhatsApp</Button>
            </a>
          </div>
          <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-zinc-300">
            <li className="glass rounded-xl px-3 py-2">
              App Router + APIs tipadas
            </li>
            <li className="glass rounded-xl px-3 py-2">
              Prisma ORM + Postgres (Neon)
            </li>
            <li className="glass rounded-xl px-3 py-2">
              NextAuth (Google) para Admin
            </li>
            <li className="glass rounded-xl px-3 py-2">
              CTAs diretos p/ WhatsApp
            </li>
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="gradient-border rounded-2xl p-2"
        >
          <div className="flex items-center justify-between px-2 pt-2">
            <span className="text-xs text-zinc-400">Tech Cube (Three.js)</span>
            <button
              type="button"
              onClick={() => setPaused3D((v) => !v)}
              className="text-xs underline text-neon-cyan focus-ring"
              aria-pressed={paused3D}
            >
              {paused3D ? "▶️ Retomar" : "⏸️ Pausar"}
            </button>
          </div>
          <TechCube paused={paused3D} />
        </motion.div>
      </section>

      {/* DEMOS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Demos em destaque</h2>

        {/* 1) Clima & Jockey */}
        <div className="grid lg:grid-cols-2 gap-6 auto-rows-fr items-stretch">
          <div className="glass rounded-2xl p-5 flex flex-col h-full">
            <h3 className="font-semibold mb-2">Clima & Tempo</h3>
            <p className="text-sm text-zinc-300 mb-3">
              Consulta de clima usando API pública (Open-Meteo). Escolha a
              cidade e veja a temperatura atual.
            </p>
            <WeatherDemo />
          </div>

          <div className="glass rounded-2xl p-5 flex flex-col h-full">
            <h3 className="font-semibold mb-2">
              Jockey-Pow (Pedra/Papel/Tesoura)
            </h3>
            <p className="text-sm text-zinc-300 mb-3">
              Mini-jogo com placar e microinterações. Portado do repositório
              original.
            </p>
            <JockeyGame />
          </div>
        </div>

        {/* 2) To-do List | Agendador */}
        <div className="grid lg:grid-cols-2 gap-6 auto-rows-fr items-stretch">
          <div className="glass rounded-2xl p-5 flex flex-col h-full">
            <h3 className="font-semibold mb-2">To-do List</h3>
            <p className="text-sm text-zinc-300 mb-3">
              Tarefas com filtros e persistência em armazenamento local.
            </p>
            <TodoListDemo />
          </div>

          <div className="glass rounded-2xl p-5 flex flex-col h-full">
            <h3 className="font-semibold mb-2">Agendador de consultas</h3>
            <p className="text-sm text-zinc-300 mb-3">
              Formulário rápido que cria um Lead e já abre o WhatsApp para
              continuar o atendimento.
            </p>
            <SchedulerMini />
          </div>
        </div>

        {/* 3) Finanças Pro — largura total */}
        <div className="glass rounded-2xl p-5 flex flex-col h-full">
          <h3 className="font-semibold mb-2">Finanças pessoais</h3>
          <p className="text-sm text-zinc-300 mb-3">
            Adicione receitas e despesas com categorias/subcategorias. Veja
            totais, tabela e gráficos de pizza por categoria.
          </p>
          <FinancePro />
        </div>
      </section>

      {/* SOBRE + CERTIFICAÇÕES */}
      <section className="grid md:grid-cols-[320px,1fr] gap-6 items-start">
        <div className="glass rounded-2xl p-6">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden ring-1 ring-white/15 mx-auto">
            <Image
              src="/eu.jpeg"
              alt="Alex Santos"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4 text-center">
            <div className="text-lg font-semibold">Alex Santos</div>
            <div className="text-sm text-zinc-400">
              Full-stack Engineer — Salvador/BA
            </div>
            <div className="mt-2 text-sm font-mono">
              <span className="text-neon-cyan">alex@debuguei.com.br</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Sobre</h3>
          <p className="text-zinc-300">
            Construo produtos com foco em experiência, performance e conversão.
            No front uso Next.js/React com Tailwind, Framer e 3D leve
            (Three.js). No back, APIs do App Router com Prisma + Postgres (Neon)
            e autenticação Google (NextAuth). Tudo com cuidado de SEO, A11y e
            DX.
          </p>

          <h3 className="text-xl font-semibold mt-6">Certificações & Cursos</h3>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-zinc-300">
            <li className="glass rounded-xl px-3 py-2">
              Next.js Avançado — <span className="text-neon-cyan">Vercel</span>
            </li>
            <li className="glass rounded-xl px-3 py-2">
              TypeScript para Projetos Reais
            </li>
            <li className="glass rounded-xl px-3 py-2">
              Prisma ORM & Postgres — Data Modeling
            </li>
            <li className="glass rounded-xl px-3 py-2">
              Acessibilidade Web (WCAG AA)
            </li>
          </ul>
        </div>
      </section>

      {/* STACKS */}
      <section aria-labelledby="stacks">
        <h2 id="stacks" className="sr-only">
          Principais tecnologias
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            "Next.js",
            "TypeScript",
            "Tailwind",
            "Prisma",
            "Postgres",
            "Three.js",
            "Framer Motion",
            "Recharts",
          ].map((t) => (
            <motion.div
              key={t}
              whileHover={{ scale: 1.02, y: -1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass rounded-2xl p-4 text-center"
            >
              {t}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  return (
    <span className="inline-block relative pr-3">
      <span
        className="inline-block overflow-hidden align-bottom whitespace-nowrap"
        style={{ animation: "typing 1.1s steps(16, end)" }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute right-0 top-0 h-full w-[2px] bg-neon-cyan"
        style={{ animation: "blink 1s step-end infinite" }}
      />
      <style jsx>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
