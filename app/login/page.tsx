import { auth, signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  const session = await auth();

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Acessar Admin</h1>
      <p className="text-zinc-300">
        Faça login com Google para gerenciar Serviços, Projetos e Leads.
      </p>

      <form
        action={async () => {
          "use server";
          const s = await auth();
          if (s) {
            await signOut({ redirectTo: "/" }); // ← volta para a home
            return;
          }
          await signIn("google", { redirectTo: "/admin" });
        }}
      >
        <Button variant="glow">{session ? "Sair" : "Entrar com Google"}</Button>
      </form>
    </div>
  );
}
