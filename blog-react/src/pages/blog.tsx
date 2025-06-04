import { Separator } from "@/components/ui/separator";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogMetadata } from "@/components/blog/blog-metadata";
import { BlogImage } from "@/components/blog/blog-image";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogActions } from "@/components/blog/blog-actions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { NavLink, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Blog, BlogResponse } from "@/types/blog";
import Loading from "@/components/loading";
import NotFound from "@/components/not-found";
import { toast } from "sonner";

export default function Blog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchBlog = async () => {
      setIsPending(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/blog/${blogId}`
        );
        const { data, message, success, error } =
          (await res.json()) as BlogResponse;

        if (!ignore) {
          if (success) {
            setBlog(data as Blog);
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

    fetchBlog();

    return () => {
      ignore = true;
    };
  }, [blogId]);

  if (isPending) {
    return <Loading />;
  }

  if (!blogId || !blog) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <Button asChild variant="ghost">
            <NavLink to="/">
              <ArrowLeft /> Zurück
            </NavLink>
          </Button>
          <BlogActions blogId={parseInt(blogId)} />
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
