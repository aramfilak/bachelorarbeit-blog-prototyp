import { Card } from "./ui/card";
import { NavLink } from "react-router";
import { CirclePlusIcon } from "lucide-react";

export function NewBlogBtn() {
  return (
    <NavLink to="/blog/new">
      <Card className="h-full hover:cursor-pointer group flex flex-col items-center justify-center gap-4">
        <CirclePlusIcon className="size-12 text-muted-foreground group-hover:text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />
        <p className="text-muted-foreground group-hover:text-primary transition-colors duration-300 ease-in-out">
          Neuer Blogbeitrag
        </p>
      </Card>
    </NavLink>
  );
}
