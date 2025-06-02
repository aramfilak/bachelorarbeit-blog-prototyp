import { BlogActions } from "./blog-actions";

interface BlogHeaderProps {
  title: string;
  description: string;
}

export function BlogHeader({ title, description }: BlogHeaderProps) {
  return (
    <header className="flex items-start justify-between">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground leading-7">{description}</p>
      </div>
      <BlogActions />
    </header>
  );
}
