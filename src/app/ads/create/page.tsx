import CreateAdForm from "@/components/forms/CreateAdForm";

export default function CreateAdPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear anuncio</h1>
      <CreateAdForm />
    </div>
  );
}