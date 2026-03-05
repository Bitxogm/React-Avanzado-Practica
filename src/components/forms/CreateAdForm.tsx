"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { createAdAction } from "@/server-actions/ads";
import { isValidImageFile } from "@/lib/upload";

type ActionState = {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
};

const initialState: ActionState = { errors: {}, success: false, message: "" };

export default function CreateAdForm() {
  const [state, formAction, isPending] = useActionState(createAdAction, initialState);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state?.message, state?.success]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    const file = e.target.files?.[0];

    if (file) {
      // Validar archivo en cliente
      const validation = isValidImageFile(file);
      if (!validation.valid) {
        setImageError(validation.error || "Imagen no válida");
        setImagePreview("");
        setImageBase64("");
        return;
      }

      // Convertir a base64 en cliente
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageBase64(result);
        setImagePreview(result);
      };
      reader.onerror = () => {
        setImageError("Error al leer el archivo");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    // Agregar el imageBase64 al FormData
    if (imageBase64) {
      formData.set("imageBase64", imageBase64);
    }
    formAction(formData);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
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

      {/* Imagen desde archivo */}
      <div>
        <label className="block text-sm font-medium mb-2">Imagen desde archivo</label>
        <input type="file" accept="image/*" className="border rounded px-3 py-2 w-full" onChange={handleImageFileChange} />
        <p className="text-xs text-muted-foreground mt-1">Formatos: JPEG, PNG, WebP, GIF. Máximo 5MB.</p>
        {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 max-w-50 rounded border" />}
      </div>

      {/* Imagen desde URL */}
      <div>
        <label className="block text-sm font-medium mb-2">O imagen desde URL</label>
        <input name="imageUrl" type="url" placeholder="https://images.unsplash.com/photo-..." className="border rounded px-3 py-2 w-full" />
        <p className="text-xs text-muted-foreground mt-1">
          💡 Opcional. Para Unsplash: clic derecho en la foto → "Copiar enlace de la imagen"
        </p>
        {state?.errors?.imageUrl && <p className="text-red-500 text-sm mt-1">{state.errors.imageUrl[0]}</p>}
      </div>

      <button type="submit" disabled={isPending} className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 disabled:opacity-50">
        {isPending ? "Publicando..." : "Publicar anuncio"}
      </button>
    </form>
  );
}