import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata = { title: "Serviços" };

export default async function Servicos() {
  const services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { title: "asc" } });
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Serviços</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((s)=> (
          <Card key={s.slug}>
            <CardHeader><h3 className="text-xl font-semibold">{s.title}</h3><p className="text-zinc-400">{s.shortDesc}</p></CardHeader>
            <CardContent>
              <div className="text-sm"><strong>Tecnologias:</strong> {s.baseStack.join(", ")}</div>
              <ul className="list-disc ml-6 text-sm">{s.features.map((f,i)=> <li key={i}>{f}</li>)}</ul>
              <div className="flex gap-3 pt-3">
                <a href={"/contato?service="+s.slug}><Button variant="outline">Briefing Rápido</Button></a>
                <a href={whatsappLink(s.ctaWhatsapp)}><Button variant="glow">Conversar no WhatsApp</Button></a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
