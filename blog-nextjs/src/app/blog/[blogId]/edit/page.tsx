import { db } from "@/db/migrate";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditBlogForm } from "./edit-blog-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BlogEdit({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;

  const blogIdNumber = Number(blogId);
  if (isNaN(blogIdNumber)) {
    notFound();
  }

  const [blog] = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, blogIdNumber))
    .limit(1);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Button asChild className="mb-4" variant="ghost">
        <Link href={`/blog/${blog.id}`}>
          <ArrowLeft className="mr-2 size-4" /> Zurück
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-8">Blogbeitrag bearbeiten</h1>
      <EditBlogForm blog={blog} />
    </div>
  );
}
