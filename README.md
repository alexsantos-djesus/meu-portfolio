# Alex Santos — Portfólio (Next.js 14 + TS)

Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Three.js, shadcn/ui (minimal), Recharts, Prisma ORM (PostgreSQL/Neon), NextAuth (Google), WhatsApp CTAs. 

## Rodando localmente

```bash
pnpm install
cp .env.example .env
# edite DATABASE_URL e credenciais Google
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

## Estrutura
- `app/` rotas (Home, Sobre, Serviços, Projetos, Contato, Admin)
- `app/api/leads` salva lead e redireciona para WhatsApp
- `components/ui` shadcn/ui simplificado
- `components/3d/TechCube.tsx` efeito 3D leve
- `prisma/schema.prisma` modelos solicitados
- `prisma/seed.ts` seeds para Serviços e Projetos
- `lib/auth.ts` NextAuth (Google) — somente Admin
- `lib/whatsapp.ts` helper de link com UTM

## Integrações
- **WhatsApp**: todos CTAs usam `WHATSAPP_PHONE` e UTM.
- **Email (opcional Resend)**: adicione `RESEND_API_KEY` e implemente no `app/api/leads/route.ts` se desejar.
- **S3 (opcional)**: variáveis preparadas no `.env.example`.

## SEO
- Metadados por rota, sitemap e robots prontos. Canonical `https://www.debuguei.com.br`.

## Conteúdos & Migração
Este projeto inclui placeholders compatíveis com os modelos citados. Para extrair **nome/contatos/links do seu Currículo PDF** e preencher `Schema.org` e seção de contato, coloque o PDF em `content/cv.pdf` e crie um script Node/Python para ler e atualizar o JSON de contato (exemplo a adicionar).

## Admin
Acesso a `/admin` protegido por Google OAuth (NextAuth). Configure `GOOGLE_CLIENT_ID/SECRET`. Roles: `USER`/`ADMIN` (upgrade manual no banco).

## Qualidade
- A11y: foco visível, contraste, navegação por teclado.
- Playwright: `pnpm test:e2e` executa smoke simples.

## Deploy
- Vercel recomendado. Configure as variáveis de ambiente.
