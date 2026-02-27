"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createAdAction } from "@/lib/actions";

const initialState = { errors: {} as Record<string, string[]>, success: false, message: "" };

export default function CreateAdForm() {
  const [state, formAction, isPending] = useActionState(createAdAction, initialState);

  useEffect(() => {
    if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state?.message, state?.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <input name="title" type="text" placeholder="Título" className="border rounded px-3 py-2 w-full" />
        {state?.errors?.title && <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>}
      </div>
      <div>
        <textarea name="description" placeholder="Descripción" rows={4} className="border rounded px-3 py-2 w-full" />
        {state?.errors?.description && <p className="text-red-500 text-sm mt-1">{state.errors.description[0]}</p>}
      </div>
      <div>
        <input name="price" type="number" placeholder="Precio" className="border rounded px-3 py-2 w-full" />
        {state?.errors?.price && <p className="text-red-500 text-sm mt-1">{state.errors.price[0]}</p>}
      </div>
      <div>
        <input name="tags" type="text" placeholder="Tags separados por coma (ej: tecnología, móvil)" className="border rounded px-3 py-2 w-full" />
        {state?.errors?.tags && <p className="text-red-500 text-sm mt-1">{state.errors.tags[0]}</p>}
      </div>
      <button type="submit" disabled={isPending} className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 disabled:opacity-50">
        {isPending ? "Publicando..." : "Publicar anuncio"}
      </button>
    </form>
  );
}