import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const services = [
    {
      slug: "landing-page",
      title: "Landing Page",
      shortDesc: "Landing page de alta conversão com SEO e performance.",
      longDesc: "Ideal para campanhas e validação rápida. Inclui layout responsivo, copy enxuta e integração com WhatsApp.",
      baseStack: ["Next.js", "Tailwind", "Vercel"],
      features: ["SEO técnico", "Seção de depoimentos", "Analytics básico"],
      ctaWhatsapp: "Quero uma Landing Page 🚀"
    },
    {
      slug: "site-com-painel-adm",
      title: "Site com Painel ADM",
      shortDesc: "Site institucional com CMS/ADM leve para gestão de conteúdo.",
      longDesc: "Gerencie páginas, posts, projetos e leads com praticidade.",
      baseStack: ["Next.js", "Prisma", "Postgres"],
      features: ["Área Admin", "Auth Google", "CRUD de conteúdo"],
      ctaWhatsapp: "Quero um site com painel ✅"
    },
    {
      slug: "dashboard-financeiro",
      title: "Dashboard Financeiro",
      shortDesc: "Visualize métricas e KPIs com gráficos claros.",
      longDesc: "Conecte fontes de dados e tome decisões informadas.",
      baseStack: ["Next.js", "Recharts", "Prisma"],
      features: ["Gráficos", "Filtros", "Exportação CSV"],
      ctaWhatsapp: "Quero um dashboard 📊"
    },
    {
      slug: "sistema-de-agendamento",
      title: "Sistema de Agendamento",
      shortDesc: "Agendamentos online com confirmações e painel.",
      longDesc: "Perfeito para barbearias, clínicas e serviços.",
      baseStack: ["Next.js", "Prisma", "Postgres"],
      features: ["Calendário", "Notificação por e-mail (opcional)"],
      ctaWhatsapp: "Quero um sistema de agendamento ✂️"
    }
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
  }

  const projects = [
    {
      slug: "agendador",
      title: "Sistema de Agendamento",
      summary: "Agendamentos com painel do administrador.",
      content: { highlights: ["CRUD completo", "Calendário", "Auth"], year: 2024 },
      repoUrl: "https://github.com/alex/agendador",
      demoUrl: "https://demo.example.com/agendador",
      coverUrl: "https://images.unsplash.com/photo-1557800636-894a64c1696f",
      techs: ["Next.js", "Prisma", "Postgres"],
      featured: true
    },
    {
      slug: "dashboard-financeiro",
      title: "Dashboard Financeiro",
      summary: "KPIs e métricas com gráficos Recharts.",
      content: { highlights: ["Gráficos", "Filtros", "CSV"], year: 2024 },
      repoUrl: "https://github.com/alex/dashboard-financeiro",
      demoUrl: "https://demo.example.com/finance",
      coverUrl: "https://images.unsplash.com/photo-1551281044-8e00794d9a2d",
      techs: ["Next.js", "Recharts", "Prisma"],
      featured: false
    },
    {
      slug: "landing-pages",
      title: "Landing Pages",
      summary: "Coleção de LPs de alta conversão.",
      content: { highlights: ["SEO", "Componentes", "Teste A/B"], year: 2023 },
      repoUrl: "https://github.com/alex/landing-pages",
      demoUrl: "https://demo.example.com/lps",
      coverUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      techs: ["Next.js", "Tailwind"],
      featured: false
    },
    {
      slug: "fsw-barber",
      title: "FSW Barber",
      summary: "App de barbearia em Next/Prisma/Postgres.",
      content: { highlights: ["Auth", "Agendamento", "Admin"], year: 2024 },
      repoUrl: "https://github.com/alex/fsw-barber",
      demoUrl: "https://demo.example.com/barber",
      coverUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      techs: ["Next.js", "Prisma", "Postgres"],
      featured: true
    },
    {
      slug: "clima-e-tempo",
      title: "Clima e Tempo",
      summary: "Consulta de clima com UI leve.",
      content: { highlights: ["API pública", "Cache", "Skeleton"], year: 2023 },
      repoUrl: "https://github.com/alex/clima-e-tempo",
      demoUrl: "https://demo.example.com/weather",
      coverUrl: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63",
      techs: ["Next.js", "Node.js"],
      featured: false
    }
  ];

  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
  }

  console.log("✅ Seed concluído");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
