import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ClockIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Blog } from "@/types/blog";
import { formatReadingTime } from "@/lib/utils";

export function BlogItem({ blog }: { blog: Blog }) {
  return (
    <Card className="pt-0 overflow-hidden gap-3 group h-full">
      <div className="overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          width={300}
          height={200}
          className="w-full h-50 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg transition-colors duration-300 group-hover:text-primary">
          {blog.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-30">
        <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground line-clamp-4">
          {blog.description}
        </p>
        <div className="flex items-center gap-4 text-sm mt-4">
          <div className="flex items-center gap-2">
            <UserIcon className="size-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4" />
            <span>
              {formatReadingTime(
                blog.readingTime,
                blog.readingTimeUnit as "minutes" | "hours"
              )}
            </span>
          </div>
        </div>
      </CardContent>

      <Separator />
      <CardFooter className="flex items-center gap-2 flex-wrap">
        {blog.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
