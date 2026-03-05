"use client";

import { useState } from "react";
import Image from "next/image";

interface AdImageContainerProps {
  imageUrl: string | null;
  title: string;
  priority?: boolean;
}

export function AdImageContainer({
  imageUrl,
  title,
  priority = false,
}: AdImageContainerProps) {
  const [imageError, setImageError] = useState(false);

  const showPlaceholder = !imageUrl || imageError;

  // Detectar si es un data URL (base64)
  const isDataUrl = (url: string | null): boolean => {
    return url?.startsWith("data:") ?? false;
  };

  // Validar que sea una URL HTTP/HTTPS válida
  const isValidHttpUrl = (url: string | null): boolean => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const isDataURLImage = isDataUrl(imageUrl);
  const isHttpURLImage = isValidHttpUrl(imageUrl);

  return (
    <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
      {/* Data URL: usar <img> directo */}
      {!showPlaceholder && isDataURLImage && (
        <img
          src={imageUrl!}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}

      {/* HTTP/HTTPS URL: usar Next.js Image */}
      {!showPlaceholder && isHttpURLImage && (
        <Image
          src={imageUrl!}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={priority}
          onError={() => setImageError(true)}
        />
      )}

      {/* Placeholder cuando no hay imagen o hay error */}
      {showPlaceholder && (
        <svg
          className="w-16 h-16 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      )}
    </div>
  );
}
