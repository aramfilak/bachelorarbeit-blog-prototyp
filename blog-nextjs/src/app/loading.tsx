import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-2xl font-bold">
        <p>Inhalt wird geladen...</p>
      </div>
      <Spinner />
    </div>
  );
}
