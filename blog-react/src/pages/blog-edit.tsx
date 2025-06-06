import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthorTitleFields } from "@/components/blog-form/AuthorTitleFields";
import { ContentFields } from "@/components/blog-form/ContentFields";
import { MediaFields } from "@/components/blog-form/MediaFields";
import { ReadingTimeFields } from "@/components/blog-form/ReadingTimeFields";
import {
  blogFormSchema,
  type BlogFormValues,
} from "@/components/blog-form/schema";
import { toast } from "sonner";
import { ArrowLeftIcon } from "lucide-react";
import { type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate, useParams } from "react-router";
import type { Blog, BlogResponse } from "@/types/blog";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import NotFound from "@/components/not-found";

export default function BlogEdit() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema) as Resolver<BlogFormValues>,
    mode: "onSubmit",
    defaultValues: {
      author: "",
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      tags: [],
      readingTime: 0,
      readingTimeUnit: "minutes",
    },
  });

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
            const blogData = data as Blog;
            form.reset({
              author: blogData.author,
              title: blogData.title,
              description: blogData.description,
              content: blogData.content,
              imageUrl: blogData.imageUrl,
              tags: blogData.tags,
              readingTime: blogData.readingTime,
              readingTimeUnit: blogData.readingTimeUnit as "minutes" | "hours",
            });
          } else {
            toast.error(message, {
              description: error,
            });
            navigate("/not-found");
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
  }, [blogId, form, navigate]);

  if (isPending) {
    return <Loading />;
  }

  if (!blogId || isNaN(Number(blogId))) {
    return <NotFound />;
  }

  const updateBlog = async (data: BlogFormValues) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/blog/${blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const { success, message, error } = await res.json();

      if (success) {
        navigate(`/blog/${blogId}`);
        toast.success(message);
      } else {
        toast.error(message, {
          description: error,
        });
      }
    } catch (error: unknown) {
      toast.error("Fehler beim Aktualisieren des Blogs", {
        description: String(error),
      });
    }
  };

  async function onSubmit(data: BlogFormValues) {
    await updateBlog(data);
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Button asChild variant="ghost" className="mb-4">
        <NavLink to="/">
          <ArrowLeftIcon className="size-4" /> Zurück
        </NavLink>
      </Button>
      <h1 className="text-3xl font-bold mb-8">Blogbeitrag bearbeiten</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AuthorTitleFields />
          <MediaFields />
          <ReadingTimeFields />
          <ContentFields />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Veröffentlichen..."
              : "Veröffentlichen"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
