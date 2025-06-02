import BlogItem from "@/components/blog-item";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const blogs = await prisma.blog.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Aktuelle Beiträge</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
