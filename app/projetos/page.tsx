"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverUrl?: string | null;
  repoUrl?: string | null;
  demoUrl?: string | null;
  techs: string[];
};

async function fetcher(url: string) {
  const r = await fetch(url, { next: { revalidate: 0 } });
  if (!r.ok) throw new Error("Falha ao carregar projetos");
  return r.json();
}

export default function ProjetosPage() {
  const { data, isLoading, error } = useSWR("/api/projects", fetcher, {
    revalidateOnFocus: false,
  });

  const allProjects: Project[] = data?.projects ?? [];

  // busca + filtros
  const [q, setQ] = useState("");
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const techs = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => p.techs.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allProjects]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allProjects.filter((p) => {
      const matchesText =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.summary.toLowerCase().includes(term) ||
        p.techs.some((t) => t.toLowerCase().includes(term));
      const matchesTech = !activeTech || p.techs.includes(activeTech);
      return matchesText && matchesTech;
    });
  }, [allProjects, q, activeTech]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((p) =>
      p.techs.forEach((t) => (counts[t] = (counts[t] || 0) + 1))
    );
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filtered]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projetos</h1>
          <p className="text-zinc-300">
            Explorar por tecnologia, pesquisar e ver detalhes.
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Buscar por título, descrição ou stack…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full sm:w-80"
            aria-label="Buscar projetos"
          />
        </div>
      </header>

      {/* filtros por stack */}
      <div className="flex flex-wrap gap-2">
        <FilterChip
          label="Tudo"
          active={!activeTech}
          onClick={() => setActiveTech(null)}
        />
        {techs.map((t) => (
          <FilterChip
            key={t}
            label={t}
            active={activeTech === t}
            onClick={() => setActiveTech(t === activeTech ? null : t)}
          />
        ))}
      </div>

      {/* estados */}
      {isLoading && <GridSkeleton />}
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm">
          Falha ao carregar. Tente novamente.
        </div>
      )}
      {!isLoading && !error && filtered.length === 0 && (
        <div className="rounded-2xl border border-white/10 p-6 text-sm text-zinc-300">
          Nenhum projeto encontrado para os filtros atuais.
        </div>
      )}

      {/* grid de cards */}
      {!isLoading && !error && filtered.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr items-stretch">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      )}

      {/* gráfico */}
      {!isLoading && !error && (
        <div className="glass rounded-2xl p-4">
          <h2 className="font-semibold mb-2">
            Stacks mais usadas{" "}
            {activeTech ? `(filtrando por ${activeTech})` : ""}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <Card className="p-4 flex flex-col h-full">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-white/10 bg-gradient-to-br from-white/5 to-white/0">
        {p.coverUrl ? (
          <Image
            src={p.coverUrl}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">
            sem imagem
          </div>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
        <ProjectDialog p={p} />
      </div>

      <p className="mt-1 text-sm text-zinc-300 line-clamp-3">{p.summary}</p>

      <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
        {p.techs.map((t) => (
          <span key={t} className="px-2 py-1 rounded-xl border border-white/10">
            {t}
          </span>
        ))}
      </div>
    </Card>
  );
}

function ProjectDialog({ p }: { p: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{p.title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-[1fr,1.2fr]">
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-white/10">
            {p.coverUrl ? (
              <Image
                src={p.coverUrl}
                alt={p.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">
                sem imagem
              </div>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm text-zinc-300">{p.summary}</p>
            <div className="flex flex-wrap gap-2">
              {p.techs.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-xl border border-white/10 text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              {p.repoUrl && (
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {p.demoUrl && (
                <a
                  className="underline text-sm"
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded-xl border transition ${
        active
          ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
          : "border-white/10 text-zinc-300 hover:bg-white/5"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 p-4 animate-pulse"
        >
          <div className="w-full aspect-[16/9] rounded-xl bg-white/5" />
          <div className="h-4 w-2/3 bg-white/5 rounded mt-4" />
          <div className="h-3 w-full bg-white/5 rounded mt-2" />
          <div className="h-3 w-5/6 bg-white/5 rounded mt-1" />
          <div className="flex gap-2 mt-3">
            <div className="h-6 w-16 bg-white/5 rounded" />
            <div className="h-6 w-20 bg-white/5 rounded" />
            <div className="h-6 w-10 bg-white/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
