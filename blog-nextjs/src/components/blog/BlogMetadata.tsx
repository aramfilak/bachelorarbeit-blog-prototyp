import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { formatGermanDate, formatReadingTime } from "@/lib/utils";

interface BlogMetadataProps {
  author: string;
  readingTime: number;
  readingTimeUnit: string;
  createdAt: Date;
}

export function BlogMetadata({
  author,
  readingTime,
  readingTimeUnit,
  createdAt,
}: BlogMetadataProps) {
  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <UserIcon className="size-5" />
        <span className="font-medium">{author}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <ClockIcon className="size-5" />
        <span>{formatReadingTime(readingTime, readingTimeUnit)}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarIcon className="size-5" />
        <span>{formatGermanDate(createdAt)}</span>
      </div>
    </div>
  );
}
