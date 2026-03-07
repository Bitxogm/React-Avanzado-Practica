"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { TrashIcon } from "@primer/octicons-react";
import { deleteAdAction } from "@/server-actions/ads";

interface DeleteAdButtonProps {
  adId: number;
}

export default function DeleteAdButton({ adId }: DeleteAdButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("¿Estás seguro de que quieres borrar este anuncio?")) return;

    startTransition(async () => {
      const result = await deleteAdAction(adId);
      if (result?.success === false) {
        toast.error(result.message);
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer disabled:opacity-50"
    >
      <TrashIcon size={16} />
      {isPending ? "Borrando..." : "Borrar anuncio"}
    </button>
  );
}