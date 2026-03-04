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

  // Validar que sea una URL válida
  const isValidImageUrl = (url: string | null): boolean => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const validImageUrl = isValidImageUrl(imageUrl) ? imageUrl : null;

  return (
    <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
      {!showPlaceholder && validImageUrl && (
        <Image
          src={validImageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={priority}
          onError={() => setImageError(true)}
        />
      )}
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
