"use client";
import useSWR from "swr";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

async function fetcher(url:string){ const r = await fetch(url); return r.json(); }

export default function Projetos() {
  const { data } = useSWR("/api/projects", fetcher);
  const projects = data?.projects ?? [];
  const techCounts: Record<string, number> = {};
  projects.forEach((p:any)=> p.techs.forEach((t:string)=> techCounts[t]=(techCounts[t]||0)+1 ));
  const chart = Object.entries(techCounts).map(([name, value])=>({ name, value }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Projetos</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p:any)=> (
          <Card key={p.slug} className="p-4">
            <img src={p.coverUrl ?? ""} alt="" className="rounded-xl mb-3" />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <Dialog>
                <DialogTrigger className="text-neon-cyan text-sm underline">Detalhes</DialogTrigger>
                <DialogContent>
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-zinc-300">{p.summary}</p>
                  <div className="mt-4 flex gap-4 text-sm">
                    {p.repoUrl && <a className="underline" href={p.repoUrl}>GitHub</a>}
                    {p.demoUrl && <a className="underline" href={p.demoUrl}>Demo</a>}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-2 text-xs text-zinc-400">{p.techs.join(" • ")}</div>
          </Card>
        ))}
      </div>

      <div className="glass rounded-2xl p-4">
        <h2 className="font-semibold mb-2">Stacks mais usadas</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
