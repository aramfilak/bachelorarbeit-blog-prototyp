import { type Blog } from "@/db/schema";
import { formatReadingTime } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function BlogItem({ blog }: { blog: Blog }) {
  return (
    <Card className="pt-0 overflow-hidden  gap-3 h-full">
      <Image
        src={blog.imageUrl}
        alt={blog.title}
        width={300}
        height={200}
        className="w-full h-50 object-cover"
      />
      <CardHeader>
        <CardTitle className="text-lg">{blog.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{blog.description}</p>
        <div className="flex items-center gap-4 text-sm mt-4">
          <div className="flex items-center gap-2">
            <UserIcon className="size-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4" />
            <span>
              {formatReadingTime(blog.readingTime, blog.readingTimeUnit)}
            </span>
          </div>
        </div>
      </CardContent>

      <Separator />
      <CardFooter className="flex items-center gap-2 flex-wrap">
        {blog.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
