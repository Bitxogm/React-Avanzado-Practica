/**
 * Valida que el archivo sea una imagen válida (se ejecuta en el cliente)
 * @param file - Archivo a validar
 * @returns true si es válido, false en caso contrario
 */
export function isValidImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: "El archivo es demasiado grande. Máximo 5MB.",
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Formato no permitido. Usa JPEG, PNG, WebP o GIF.",
    };
  }

  return { valid: true };
}
