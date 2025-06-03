import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogActions } from "./blog-actions";

export function BlogToolbar() {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button asChild variant="ghost">
        <Link href="/">
          <ArrowLeft /> Zurück
        </Link>
      </Button>
      <BlogActions />
    </div>
  );
}
