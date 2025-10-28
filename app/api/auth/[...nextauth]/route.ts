// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";

// o objeto `handlers` já contém GET e POST.
// precisamos exportá-los assim:
export const { GET, POST } = handlers;
