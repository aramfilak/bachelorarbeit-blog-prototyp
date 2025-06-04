import { BlogItem } from "@/components/blog-item";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import Link from "next/link";
import { NewBlogBtn } from "@/components/new-blog-btn";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allBlogs = await db.select().from(blogs);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Aktuelle Beiträge</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 content-stretch">
        {allBlogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <BlogItem blog={blog} />
          </Link>
        ))}
        <NewBlogBtn />
      </div>
    </div>
  );
}
