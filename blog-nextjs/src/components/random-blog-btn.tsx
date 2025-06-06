import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { createRandomBlog } from "@/app/server/actions";

export async function RandomBlogBtn() {
  return (
    <form action={createRandomBlog}>
      <Button type="submit">
        Blitz Blog <Zap className="size-4 text-yellow-600" fill="#ffde59" />
      </Button>
    </form>
  );
}
