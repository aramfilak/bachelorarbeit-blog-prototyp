import { BlogItem } from "@/components/blog-item";
import { NewBlogBtn } from "@/components/new-blog-btn";
import type { Blog } from "@/types/blog";
import { startTransition, useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/blogs");
        const data = await res.json();
        startTransition(() => {
          setBlogs(data);
        });
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Aktuelle Beiträge</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 content-stretch">
        {blogs.map((blog: Blog) => (
          <NavLink to={`/blog/${blog.id}`} key={blog.id}>
            <BlogItem blog={blog} />
          </NavLink>
        ))}
        <NewBlogBtn />
      </div>
    </div>
  );
}
