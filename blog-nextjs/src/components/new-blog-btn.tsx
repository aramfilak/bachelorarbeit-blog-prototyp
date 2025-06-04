import { Card } from "./ui/card";
import Link from "next/link";
import { CirclePlusIcon } from "lucide-react";

export function NewBlogBtn() {
  return (
    <Link href="/blog/new">
      <Card className="h-full hover:cursor-pointer group flex flex-col items-center justify-center gap-4 min-h-[350px]">
        <CirclePlusIcon className="size-12 text-muted-foreground group-hover:text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />
        <p className="text-muted-foreground group-hover:text-primary transition-colors duration-300 ease-in-out">
          Neuer Blogbeitrag
        </p>
      </Card>
    </Link>
  );
}
