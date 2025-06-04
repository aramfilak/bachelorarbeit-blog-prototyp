import { BlogItem } from "@/components/blog-item";
import { NewBlogBtn } from "@/components/new-blog-btn";
import Loading from "@/components/loading";
import type { Blog, BlogResponse } from "@/types/blog";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { toast } from "sonner";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/blog`);
        const { data, message, success, error } =
          (await res.json()) as BlogResponse;

        if (!ignore) {
          if (success) {
            setBlogs(data as Blog[]);
          } else {
            toast.error(message, {
              description: error,
            });
          }
        }
      } catch (error: unknown) {
        console.log(error);
      } finally {
        if (!ignore) {
          setIsPending(false);
        }
      }
    };

    fetchBlogs();
    return () => {
      ignore = true;
    };
  }, []);

  if (isPending) {
    return <Loading />;
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
