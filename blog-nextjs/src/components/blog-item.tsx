import { Blog } from "../generated/prisma/client";
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

const formatReadingTime = (time: number, unit: string) => {
  return `${time} ${unit}`;
};

export function BlogItem({ blog }: { blog: Blog }) {
  return (
    <Card className="pt-0 overflow-hidden">
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
      </CardContent>
      <Separator />
      <CardFooter>
        <div className="flex items-center gap-4 text-sm">
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
      </CardFooter>
    </Card>
  );
}
