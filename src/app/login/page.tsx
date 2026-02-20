"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions";

const initialState = {   errors: {} as Record<string, string[]>  };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8">Iniciar sesión</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2 w-full"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="border rounded px-3 py-2 w-full"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password[0]}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Cargando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}