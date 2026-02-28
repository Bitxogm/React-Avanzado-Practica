"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/app/login/actions";
import { initialLoginState } from "@/app/login/types";

type LoginFormProps = {
  from: string;
};

type TestCredential = {
  env: string;
  email: string;
  password: string;
};

const TEST_CREDENTIALS: TestCredential[] = [
  {
    env: "🐳 Local (Docker)",
    email: "dev1@local.com",
    password: "123456",
  },
  {
    env: "☁️ Cloud (Supabase)",
    email: "carlos@marketplace.com",
    password: "123456",
  },
];

function getInputClassName(hasError: boolean) {
  return [
    "w-full rounded border bg-background px-3 py-2 text-sm",
    hasError
      ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      : "border-border",
  ].join(" ");
}

export default function LoginForm({ from }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, initialLoginState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const safeState = state ?? initialLoginState;

  useEffect(() => {
    if (safeState.success) {
      toast.success(safeState.message);
      const timer = setTimeout(() => {
        router.push(from ?? "/");
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (!safeState.success && safeState.message && Object.keys(safeState.errors).length === 0) {
      toast.error(safeState.message);
    }
  }, [safeState.success, safeState.message, router, from, safeState.errors]);

  const fillCredentials = (credential: TestCredential) => {
    setEmail(credential.email);
    setPassword(credential.password);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Credenciales de testing */}
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-4">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Credenciales para testing:
        </p>
        <div className="space-y-2">
          {TEST_CREDENTIALS.map((cred) => (
            <button
              key={cred.env}
              type="button"
              onClick={() => fillCredentials(cred)}
              className="w-full text-left p-3 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
            >
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {cred.env}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-mono">{cred.email}</span>
                {" / "}
                <span className="font-mono">{cred.password}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Formulario */}
      <form action={formAction} className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@marketplace.com"
            className={getInputClassName(Boolean(safeState.errors.email?.length))}
          />
          {safeState.errors.email?.[0] ? (
            <p className="text-xs text-red-600 dark:text-red-400">{safeState.errors.email[0]}</p>
          ) : null}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-semibold">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="1234"
            className={getInputClassName(Boolean(safeState.errors.password?.length))}
          />
          {safeState.errors.password?.[0] ? (
            <p className="text-xs text-red-600 dark:text-red-400">
              {safeState.errors.password[0]}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Iniciando..." : "Iniciar sesion"}
        </button>
      </form>
    </div>
  );
}