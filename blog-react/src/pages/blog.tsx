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
import type { Blog } from "@/types/blog";
import { toast } from "sonner";
import Loading from "@/components/loading";
import NotFound from "@/components/not-found";

export default function Blog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    let ignore = false;

    if (!blogId) {
      return;
    }

    const fetchBlog = async () => {
      try {
        setIsPending(true);
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/blog/${blogId}`
        );
        const data = await res.json();
        if (!ignore) {
          setBlog(data.data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchBlog();

    return () => {
      ignore = true;
    };
  }, []);

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
