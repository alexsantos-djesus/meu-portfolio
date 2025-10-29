import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },

  callbacks: {
    // só deixa prosseguir se isActive=true OU email na allowlist
    async signIn({ user }) {
      const email = user?.email?.toLowerCase();
      if (!email) return false;

      // allowlist via env (opcional)
      const allow = (process.env.ALLOWED_EMAILS || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      if (allow.includes(email)) return true;

      // consulta no banco
      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { isActive: true },
      });

      return !!dbUser?.isActive; // true = entra, false = bloqueia
    },

    async jwt({ token, user }) {
      // quando loga/atualiza, carregar role/isActive
      if (user?.email) {
        const u = await prisma.user.findUnique({
          where: { email: user.email },
          select: { role: true, isActive: true, name: true, image: true },
        });
        if (u) {
          token.role = u.role;
          token.isActive = u.isActive;
          token.name = u.name ?? token.name;
          token.picture = u.image ?? token.picture;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // expor no client
      (session.user as any).role = token.role;
      (session.user as any).isActive = token.isActive;
      return session;
    },
  },
});
