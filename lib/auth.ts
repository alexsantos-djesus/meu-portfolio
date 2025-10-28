import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true, // ajuda em dev quando o host não bate 100%
  callbacks: {
    async session({ session, token }) {
      if (session.user)
        (session.user as any).role = (token as any).role || "USER";
      return session;
    },
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role || "USER";
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
