import { loginAction } from "@/server-actions/auth";
import { initialLoginState } from "@/types/login";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  createSession: vi.fn(),
}));

vi.mock("@/lib/users", () => ({
  verifyPassword: vi.fn(),
}));

function buildFormData(email: string, password: string): FormData {
  const formData = new FormData();
  formData.set("email", email);
  formData.set("password", password);
  return formData;
}

describe("loginAction", () => {
  it("retorna error cuando el usuario no existe", async () => {
    const { verifyPassword } = await import("@/lib/users");
    const formData = buildFormData("prueba@google.com", "1234");

    vi.mocked(verifyPassword).mockResolvedValue(null);

    const result = await loginAction(initialLoginState, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Credenciales incorrectas");
    expect(result.errors).toEqual({});
    expect(result.values).toEqual({ email: "prueba@google.com" });
  });

  it("retorna error cuando la contraseña es muy corta", async () => {
    const formData = buildFormData("prueba@google.com", "123");

    const result = await loginAction(initialLoginState, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveProperty("password");
  });

  it("crea sesión y devuelve success cuando las credenciales son correctas", async () => {
    const { verifyPassword } = await import("@/lib/users");
    const { createSession } = await import("@/lib/auth");
    const formData = buildFormData("prueba@google.com", "1234");

    vi.mocked(verifyPassword).mockResolvedValue({
      id: 123,
      email: "prueba@google.com",
    });

    const result = await loginAction(initialLoginState, formData);

    expect(createSession).toHaveBeenCalledWith(123);
    expect(result.success).toBe(true);
    expect(result.message).toBe("¡Login correcto! Redirigiendo...");
  });
});