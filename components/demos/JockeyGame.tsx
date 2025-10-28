"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const choices = ["Pedra", "Papel", "Tesoura"] as const;
type Choice = (typeof choices)[number];

function winner(a: Choice, b: Choice) {
  if (a === b) return "Empate";
  if (
    (a === "Pedra" && b === "Tesoura") ||
    (a === "Papel" && b === "Pedra") ||
    (a === "Tesoura" && b === "Papel")
  )
    return "Você";
  return "CPU";
}

export default function JockeyGame() {
  const [me, setMe] = useState<Choice>("Pedra");
  const [cpu, setCpu] = useState<Choice>("Tesoura");
  const [score, setScore] = useState({ me: 0, cpu: 0 });
  const [result, setResult] = useState<string>("");

  function play(c: Choice) {
    const cpuC = choices[Math.floor(Math.random() * choices.length)];
    setMe(c);
    setCpu(cpuC);
    const r = winner(c, cpuC);
    setResult(r);
    if (r === "Você") setScore((s) => ({ ...s, me: s.me + 1 }));
    if (r === "CPU") setScore((s) => ({ ...s, cpu: s.cpu + 1 }));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 mb-3">
        {choices.map((c) => (
          <Button
            key={c}
            variant="outline"
            className="px-3 py-1"
            onClick={() => play(c)}
          >
            {c}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="glass rounded-2xl p-4 text-center">
          <div className="text-sm text-zinc-400">Você</div>
          <div className="text-xl font-semibold">{me}</div>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <div className="text-sm text-zinc-400">Robô</div>
          <div className="text-xl font-semibold">{cpu}</div>
        </div>
      </div>

      <div className="text-center space-y-1 mb-3">
        <div className="text-sm text-zinc-400">Resultado</div>
        <div className="text-2xl font-bold text-neon-cyan">{result || "-"}</div>
        <div className="mt-2 text-sm text-zinc-300">
          Placar: {score.me} x {score.cpu}
        </div>
      </div>

      <a
        href="https://github.com/alexsantos-djesus/Jockey-pow"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="outline">Ver repositório</Button>
      </a>
    </div>
  );
}
