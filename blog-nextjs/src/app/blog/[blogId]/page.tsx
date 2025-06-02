import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogMetadata } from "@/components/blog/BlogMetadata";
import { BlogImage } from "@/components/blog/BlogImage";
import { BlogContent } from "@/components/blog/BlogContent";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt(blogId) },
  });

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <BlogHeader title={blog.title} description={blog.description} />
        <Separator className="my-4" />
        <BlogMetadata
          author={blog.author}
          readingTime={blog.readingTime}
          readingTimeUnit={blog.readingTimeUnit}
          createdAt={blog.createdAt}
        />
        <BlogImage imageUrl={blog.imageUrl} title={blog.title} />
        <BlogContent content={blog.content} />
      </div>
    </main>
  );
}
