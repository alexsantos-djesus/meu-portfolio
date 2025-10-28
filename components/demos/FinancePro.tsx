"use client";
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Kind = "RECEITA" | "DESPESA";
type Item = {
  id: string;
  kind: Kind;
  valor: number;
  categoria: string;
  subcategoria: string;
  descr?: string;
};

const CATEGORIAS: Record<Kind, Record<string, string[]>> = {
  RECEITA: {
    Salário: ["Mensal", "Bônus"],
    Freelance: ["Web", "Design", "Consultoria"],
    Investimentos: ["Dividendos", "Juros"],
    Outras: ["Venda", "Reembolso"],
  },
  DESPESA: {
    Alimentação: ["Mercado", "Restaurante", "Delivery"],
    Moradia: ["Aluguel", "Energia", "Água", "Internet"],
    Transporte: ["Combustível", "App", "Ônibus"],
    Lazer: ["Cinema", "Viagem", "Streaming"],
    Saúde: ["Farmácia", "Consulta"],
    Educação: ["Curso", "Livro"],
    Outras: ["Imprevistos", "Taxas"],
  },
};

const COLORS = [
  "#00FFE1",
  "#FF00F5",
  "#00A3FF",
  "#F59E0B",
  "#22C55E",
  "#E11D48",
  "#A78BFA",
  "#38BDF8",
  "#F97316",
];

export default function FinancePro() {
  const [kind, setKind] = useState<Kind>("DESPESA");
  const [categoria, setCategoria] = useState<string>("Alimentação");
  const [subcat, setSubcat] = useState<string>("Mercado");
  const [valor, setValor] = useState<string>("");
  const [descr, setDescr] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("finance:items");
    if (saved) setItems(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("finance:items", JSON.stringify(items));
  }, [items]);

  // atualiza subcategoria quando muda categoria
  useEffect(() => {
    const arr = CATEGORIAS[kind][categoria] ?? [];
    if (!arr.includes(subcat)) setSubcat(arr[0] ?? "");
  }, [kind, categoria]); // eslint-disable-line

  function addItem(e: any) {
    e.preventDefault();
    const v = parseFloat(valor.replace(",", "."));
    if (!v || v <= 0) return;
    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        kind,
        valor: v,
        categoria,
        subcategoria: subcat,
        descr,
      },
      ...prev,
    ]);
    setValor("");
    setDescr("");
  }
  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const totalReceita = useMemo(
    () =>
      items
        .filter((i) => i.kind === "RECEITA")
        .reduce((a, b) => a + b.valor, 0),
    [items]
  );
  const totalDespesa = useMemo(
    () =>
      items
        .filter((i) => i.kind === "DESPESA")
        .reduce((a, b) => a + b.valor, 0),
    [items]
  );
  const saldo = totalReceita - totalDespesa;

  const byCat = (k: Kind) => {
    const map = new Map<string, number>();
    items
      .filter((i) => i.kind === k)
      .forEach((i) =>
        map.set(i.categoria, (map.get(i.categoria) || 0) + i.valor)
      );
    return Array.from(map, ([name, value]) => ({ name, value }));
  };

  const recData = byCat("RECEITA");
  const desData = byCat("DESPESA");

  return (
    <div className="space-y-4">
      {/* Form */}
      <form
        onSubmit={addItem}
        className="grid md:grid-cols-[110px,1fr,1fr,1fr,1fr,120px] gap-2"
      >
        <div>
          <Label className="mb-1 block">Tipo</Label>
          <select
            className="w-full rounded-xl bg-black/40 border border-white/15 px-2 py-2"
            value={kind}
            onChange={(e) => {
              const k = e.target.value as Kind;
              setKind(k);
              setCategoria(Object.keys(CATEGORIAS[k])[0]);
            }}
          >
            <option value="DESPESA">Despesa</option>
            <option value="RECEITA">Receita</option>
          </select>
        </div>
        <div>
          <Label className="mb-1 block">Categoria</Label>
          <select
            className="w-full rounded-xl bg-black/40 border border-white/15 px-2 py-2"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {Object.keys(CATEGORIAS[kind]).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="mb-1 block">Subcategoria</Label>
          <select
            className="w-full rounded-xl bg-black/40 border border-white/15 px-2 py-2"
            value={subcat}
            onChange={(e) => setSubcat(e.target.value)}
          >
            {(CATEGORIAS[kind][categoria] ?? []).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="mb-1 block">Valor</Label>
          <Input
            placeholder="0,00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <div>
          <Label className="mb-1 block">Descrição</Label>
          <Input
            placeholder="ex: almoço, projeto X..."
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button type="submit" className="w-full">
            Adicionar
          </Button>
        </div>
      </form>

      {/* Totais */}
      <div className="grid md:grid-cols-3 gap-3">
        <div className="glass rounded-2xl p-4">
          <div className="text-sm text-zinc-400">Receitas</div>
          <div className="text-2xl font-bold text-neon-cyan">
            R$ {totalReceita.toLocaleString("pt-BR")}
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-sm text-zinc-400">Despesas</div>
          <div className="text-2xl font-bold text-neon-magenta">
            R$ {totalDespesa.toLocaleString("pt-BR")}
          </div>
        </div>
        <div
          className={`glass rounded-2xl p-4 ${saldo >= 0 ? "" : "ring-1 ring-red-500/30"}`}
        >
          <div className="text-sm text-zinc-400">Saldo</div>
          <div className="text-2xl font-bold">
            {saldo >= 0 ? "🟢" : "🔴"} R$ {saldo.toLocaleString("pt-BR")}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-4 h-[320px]">
          <h4 className="font-semibold mb-2">Despesas por categoria</h4>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={desData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {desData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-2xl p-4 h-[320px]">
          <h4 className="font-semibold mb-2">Receitas por categoria</h4>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={recData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {recData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="p-3">Tipo</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Subcategoria</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-t border-white/10">
                <td className="p-3">
                  {i.kind === "RECEITA" ? "Receita" : "Despesa"}
                </td>
                <td className="p-3">{i.categoria}</td>
                <td className="p-3">{i.subcategoria}</td>
                <td className="p-3">{i.descr || "-"}</td>
                <td className="p-3">R$ {i.valor.toLocaleString("pt-BR")}</td>
                <td className="p-3">
                  <button
                    onClick={() => removeItem(i.id)}
                    className="text-sm underline text-red-400 hover:text-red-300"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="p-4 text-zinc-400" colSpan={6}>
                  Sem lançamentos ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 pt-3 border-t border-white/10">
        <a
          href="https://github.com/alexsantos-djesus/financas-pessoais"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline">Ver repositório</Button>
        </a>
      </div>
    </div>
  );
}
