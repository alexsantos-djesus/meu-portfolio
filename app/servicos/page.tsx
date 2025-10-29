// app/servicos/page.tsx
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { whatsappLink } from "@/lib/whatsapp";
export const dynamic = "force-dynamic";

export const metadata = { title: "Serviços" };

// Exemplos por serviço (ajuste os slugs conforme seu seed)
const examplesBySlug: Record<string, { label: string; href: string }[]> = {
  "landing-page": [
    { label: "Samcreds Landing", href: "https://samcreds.debuguei.com.br/" },
    { label: "Refrigeração", href: "https://refrigeracao-site.vercel.app/" },
  ],
  "site-com-painel-adm": [
    {
      label: "Instituto Beth Leite",
      href: "https://www.institutobethleite.com.br/",
    },
  ],
  "dashboard-financeiro": [
    {
      label: "Finanças Pessoais",
      href: "https://github.com/alexsantos-djesus/financas-pessoais",
    },
  ],
  "sistema-de-agendamento": [
    { label: "Clinicadental", href: "https://lading.debuguei.com.br/" },
  ],
};

export default async function Servicos() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { title: "asc" },
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Serviços</h1>
        <p className="mt-2 text-zinc-300">
          Ofertas com escopo claro, prazos típicos e entregáveis definidos —
          prontas pra levar do briefing ao deploy.
        </p>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((s) => {
          const examples = examplesBySlug[s.slug] || [];
          const whats = whatsappLink(
            `${s.ctaWhatsapp} (utm_source=portfolio&utm_medium=cta&utm_campaign=${s.slug})`
          );

          return (
            <Card
              key={s.slug}
              className="bg-transparent ring-1 ring-white/10 rounded-2xl p-0"
            >
              <div className="metal-card">
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{s.title}</h3>
                      <p className="text-zinc-300">{s.shortDesc}</p>
                    </div>
                    <span className="text-xs text-zinc-300 whitespace-nowrap">
                      A partir de <span className="text-zinc-100/90">R$ —</span>
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  {/* tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {s.baseStack.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* Benefícios/escopo */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">O que você recebe</div>
                    <ul className="ml-4 list-disc text-sm text-zinc-300 space-y-1">
                      {s.features.length ? (
                        s.features.map((f, i) => <li key={i}>{f}</li>)
                      ) : (
                        <li>Escopo customizado conforme a necessidade.</li>
                      )}
                    </ul>
                  </div>

                  {/* Prazos típicos / Entregáveis */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-white/[0.03] ring-1 ring-white/10 p-3">
                      <div className="text-xs text-zinc-400">
                        Prazos típicos
                      </div>
                      <div className="mt-1 text-zinc-300">
                        {s.slug === "landing-page" && "7–14 dias"}
                        {s.slug === "site-com-painel" && "2–4 semanas"}
                        {s.slug === "dashboard" && "1–3 semanas"}
                        {s.slug === "sistema-agendamento" && "1–2 semanas"}
                        {![
                          "landing-page",
                          "site-com-painel",
                          "dashboard",
                          "sistema-agendamento",
                        ].includes(s.slug) && "Sob avaliação"}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/[0.03] ring-1 ring-white/10 p-3">
                      <div className="text-xs text-zinc-400">Entregáveis</div>
                      <div className="mt-1 text-zinc-300">
                        Código, deploy e instruções
                      </div>
                    </div>
                  </div>

                  {/* Exemplos */}
                  {examples.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-sm font-medium">Exemplos</div>
                      <div className="flex flex-wrap gap-2">
                        {examples.map((e) => (
                          <a
                            key={e.href}
                            href={e.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline text-neon-cyan"
                          >
                            {e.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="h-px bg-white/10" />

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a href={`/contato?service=${s.slug}`}>
                      <Button variant="outline">Briefing Rápido</Button>
                    </a>
                    <a href={whats} target="_blank" rel="noopener noreferrer">
                      <Button variant="glow">Conversar no WhatsApp</Button>
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
