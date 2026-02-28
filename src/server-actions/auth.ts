"use server";

import z from "zod";
import { LoginState } from "@/types/login";
import { loginSchema } from "@/lib/validations";
import { createSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/users";

function getFieldErrorsFromTree(
  error: z.ZodError<z.infer<typeof loginSchema>>,
): Record<string, string[]> {
  const tree = z.treeifyError(error);
  const fieldErrors: Record<string, string[]> = {};

  for (const [fieldName, node] of Object.entries(tree.properties ?? {})) {
    if (node?.errors.length) {
      fieldErrors[fieldName] = node.errors;
    }
  }

  return fieldErrors;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const emailInput = String(formData.get("email"));
  const passwordInput = String(formData.get("password"));

  const parsed = loginSchema.safeParse({
    email: emailInput,
    password: passwordInput,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Revisa los campos marcados",
      errors: getFieldErrorsFromTree(parsed.error),
      values: { email: emailInput },
    };
  }

  const email = parsed.data.email.toLowerCase();
  const password = parsed.data.password;

  const user = await verifyPassword(email, password);

  if (!user) {
    return {
      success: false,
      message: "Credenciales incorrectas",
      errors: {},
      values: { email: emailInput },
    };
  }

  await createSession(user.id);

  return {
    success: true,
    message: "¡Login correcto! Redirigiendo...",
    errors: {},
    values: { email },
  };
}
