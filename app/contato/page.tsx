"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

export default function Contato() {
  const [form, setForm] = useState({ name:"", email:"", message:"", service:"" });
  const submit = async (e:any)=> {
    e.preventDefault();
    const r = await fetch("/api/leads", { method: "POST", body: JSON.stringify(form) });
    const { whatsapp } = await r.json();
    window.location.href = whatsapp;
  };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Contato</h1>
      <form onSubmit={submit} className="space-y-3">
        <div><Label>Nome</Label><Input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required /></div>
        <div><Label>E-mail</Label><Input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required /></div>
        <div><Label>Tipo de serviço</Label><Input value={form.service} onChange={e=>setForm({...form, service:e.target.value})} placeholder="ex: Landing Page" /></div>
        <div><Label>Mensagem</Label><Textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} /></div>
        <Button type="submit" variant="glow">Enviar & abrir WhatsApp</Button>
      </form>

      <div className="flex gap-3">
        <a href={whatsappLink("Olá! Vim do site e quero conversar.")}><Button variant="outline">WhatsApp Direto</Button></a>
        <a href="https://www.linkedin.com/in/alex-santos-97977b29b"><Button variant="ghost">LinkedIn</Button></a>
        <a href="https://github.com/alexsantos-djesus"><Button variant="ghost">GitHub</Button></a>
        <a href="https://instagram.com/debuguei"><Button variant="ghost">Instagram</Button></a>
      </div>
    </div>
  );
}
