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
  const [imageTab, setImageTab] = useState<"file" | "url">("file");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state?.message, state?.success]);

  const processImageFile = (file: File) => {
    setImageError("");

    if (!file) return;

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
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
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
        <label className="block text-sm font-medium mb-2">Título</label>
        <input name="title" type="text" placeholder="Ej: iPhone 13 Pro" className="border rounded px-3 py-2 w-full" />
        {state?.errors?.title && <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descripción</label>
        <textarea name="description" placeholder="Describe tu producto..." rows={4} className="border rounded px-3 py-2 w-full" />
        {state?.errors?.description && <p className="text-red-500 text-sm mt-1">{state.errors.description[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Precio (€)</label>
        <input name="price" type="number" placeholder="99.99" className="border rounded px-3 py-2 w-full" />
        {state?.errors?.price && <p className="text-red-500 text-sm mt-1">{state.errors.price[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <input name="tags" type="text" placeholder="tecnología, móvil, segunda mano" className="border rounded px-3 py-2 w-full" />
        {state?.errors?.tags && <p className="text-red-500 text-sm mt-1">{state.errors.tags[0]}</p>}
      </div>

      {/* Tabs para imagen */}
      <div>
        <div className="flex gap-2 border-b mb-4">
          <button
            type="button"
            onClick={() => {
              setImageTab("file");
              setImageError("");
            }}
            className={`px-4 py-2 transition-all ${imageTab === "file"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            📤 Desde archivo
          </button>
          <button
            type="button"
            onClick={() => setImageTab("url")}
            className={`px-4 py-2 transition-all ${imageTab === "url"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            🔗 Desde URL
          </button>
        </div>

        {/* Tab: Desde archivo */}
        {imageTab === "file" && (
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5"
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageFileChange}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="text-5xl">🖼️</div>
                <div>
                  <p className="font-medium text-sm mb-1">Arrastra una imagen aquí</p>
                  <p className="text-xs text-muted-foreground mb-3">o</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm hover:opacity-90"
                  >
                    Seleccionar archivo
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                JPEG, PNG, WebP, GIF • Máximo 5MB
              </p>
            </div>

            {imageError && <p className="text-red-500 text-sm mt-2">{imageError}</p>}

            {/* Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Vista previa</p>
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-96 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setImageBase64("");
                      setImageError("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                  >
                    ✕ Cambiar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Desde URL */}
        {imageTab === "url" && (
          <div>
            <div>
              <input
                name="imageUrl"
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                className="border rounded px-3 py-2 w-full"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Pega el enlace directo de la imagen. Para Unsplash: clic derecho en la foto → "Copiar enlace de la imagen"
              </p>
              {state?.errors?.imageUrl && <p className="text-red-500 text-sm mt-1">{state.errors.imageUrl[0]}</p>}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground px-4 py-3 rounded font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {isPending ? "📤 Publicando..." : "✓ Publicar anuncio"}
      </button>
    </form>
  );
}