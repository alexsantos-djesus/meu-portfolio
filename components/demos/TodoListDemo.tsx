"use client";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Todo = { id: string; text: string; done: boolean; createdAt: number };
type Filter = "todas" | "ativas" | "concluidas";

export default function TodoListDemo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("todas");

  useEffect(() => {
    const s = localStorage.getItem("todos:data");
    if (s) setTodos(JSON.parse(s));
  }, []);
  useEffect(() => {
    localStorage.setItem("todos:data", JSON.stringify(todos));
  }, [todos]);

  function add(e: any) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: t, done: false, createdAt: Date.now() },
      ...prev,
    ]);
    setText("");
  }
  function toggle(id: string) {
    setTodos((prev) =>
      prev.map((td) => (td.id === id ? { ...td, done: !td.done } : td))
    );
  }
  function remove(id: string) {
    setTodos((prev) => prev.filter((td) => td.id !== id));
  }
  function clearDone() {
    setTodos((prev) => prev.filter((td) => !td.done));
  }

  const view = useMemo(() => {
    if (filter === "ativas") return todos.filter((t) => !t.done);
    if (filter === "concluidas") return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={add} className="flex gap-2 mb-2">
        <Input
          placeholder="Nova tarefa..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="outline">
          Adicionar
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 text-xs mb-2">
        {(["todas", "ativas", "concluidas"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-xl border transition ${
              filter === f
                ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                : "border-white/10 text-zinc-300 hover:bg-white/5"
            }`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button
          onClick={clearDone}
          className="ml-auto px-3 py-1 rounded-xl border border-white/10 text-xs hover:bg-white/5"
        >
          Limpar concluídas
        </button>
      </div>

      <ul className="space-y-2">
        {view.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 glass rounded-2xl p-3"
          >
            <input
              type="checkbox"
              className="size-4"
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            <span
              className={`flex-1 ${t.done ? "line-through text-zinc-500" : ""}`}
            >
              {t.text}
            </span>
            <button
              onClick={() => remove(t.id)}
              className="text-sm underline text-red-400 hover:text-red-300"
            >
              Excluir
            </button>
          </li>
        ))}
        {view.length === 0 && (
          <li className="text-sm text-zinc-400">Nada por aqui.</li>
        )}
      </ul>

      <div className="mt-auto pt-3">
        <a
          href="https://github.com/alexsantos-djesus/To-do-list"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline">Ver repositório</Button>
        </a>
      </div>
    </div>
  );
}
