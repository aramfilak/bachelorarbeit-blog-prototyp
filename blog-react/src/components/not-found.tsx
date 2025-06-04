import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">404 - Seite nicht gefunden</h1>
      <p className="text-sm text-muted-foreground">
        Die angeforderte Seite existiert nicht.
      </p>
      <Button asChild>
        <NavLink to="/" className="flex items-center gap-2">
          <ArrowLeft className="size-4" />
          Zurück zur Startseite
        </NavLink>
      </Button>
    </div>
  );
}
