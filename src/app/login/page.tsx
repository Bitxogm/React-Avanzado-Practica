"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions";
import LoginForm from "@/components/forms/LoginForm";

const initialState = {   errors: {} as Record<string, string[]>  };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="max-w-md mx-auto">
     <LoginForm from="/" />
    </div>
  );
}