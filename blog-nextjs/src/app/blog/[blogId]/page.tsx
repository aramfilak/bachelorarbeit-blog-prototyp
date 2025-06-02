import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogMetadata } from "@/components/blog/blog-metadata";
import { BlogImage } from "@/components/blog/blog-image";
import { BlogContent } from "@/components/blog/blog-content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { BlogActions } from "@/components/blog/blog-actions";

export async function generateStaticParams() {
  const allBlogs = await db.select({ id: blogs.id }).from(blogs);
  return allBlogs.map((blog) => ({
    blogId: blog.id.toString(),
  }));
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const [blog] = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, parseInt(blogId)))
    .limit(1);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft /> Zurück
            </Link>
          </Button>
          <BlogActions />
        </div>

        <BlogHeader title={blog.title} description={blog.description} />
        <Separator className="my-4" />
        <BlogMetadata
          author={blog.author}
          readingTime={blog.readingTime}
          readingTimeUnit={blog.readingTimeUnit}
          createdAt={blog.createdAt}
        />
        <Separator className="mt-4" />
        <BlogImage imageUrl={blog.imageUrl} title={blog.title} />
        <BlogContent content={blog.content} />
      </div>
    </main>
  );
}
