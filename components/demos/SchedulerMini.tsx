"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SchedulerMini() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    when: "",
    notes: "",
  });
  const [ok, setOk] = useState<string | null>(null);

  async function submit(e: any) {
    e.preventDefault();
    const body = {
      name: form.name,
      email: form.email,
      message: `${form.notes} | Quando: ${form.when}`,
      service: "sistema-de-agendamento",
    };
    const r = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const j = await r.json();
    setOk("Lead criado! Abrindo WhatsApp…");
    setTimeout(() => (window.location.href = j.whatsapp), 600);
  }

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Nome</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>E-mail</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>
        <div>
          <Label>Quando</Label>
          <Input
            placeholder="ex: 10/11 às 15h"
            value={form.when}
            onChange={(e) => setForm({ ...form, when: e.target.value })}
          />
        </div>
        <div>
          <Label>Observações</Label>
          <Input
            placeholder="preferências, serviço desejado…"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        {ok && <p className="text-sm text-neon-cyan">{ok}</p>}
      </form>

      <div className="mt-auto pt-3 flex gap-2">
        <form onSubmit={submit}>
          <Button type="submit" variant="outline">
            Solicitar horário
          </Button>
        </form>
        <a
          href="https://github.com/alexsantos-djesus/Agendador-de-consultas"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline">Ver repositório</Button>
        </a>
      </div>
    </div>
  );
}
