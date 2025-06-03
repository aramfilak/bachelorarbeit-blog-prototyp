"use client";

import { updateBlog } from "@/app/server/actions";
import { AuthorTitleFields } from "@/components/blog-form/AuthorTitleFields";
import { ContentFields } from "@/components/blog-form/ContentFields";
import { MediaFields } from "@/components/blog-form/MediaFields";
import { ReadingTimeFields } from "@/components/blog-form/ReadingTimeFields";
import { blogFormSchema } from "@/components/blog-form/schema";
import { BlogFormValues } from "@/components/blog-form/schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Blog } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

export function EditBlogForm({ blog }: { blog: Blog }) {
  const router = useRouter();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema) as Resolver<BlogFormValues>,
    mode: "onSubmit",
    defaultValues: {
      author: blog.author,
      title: blog.title,
      description: blog.description,
      content: blog.content,
      imageUrl: blog.imageUrl,
      tags: blog.tags,
      readingTime: blog.readingTime,
      readingTimeUnit:
        blog.readingTimeUnit as BlogFormValues["readingTimeUnit"],
    },
  });

  async function onSubmit(data: BlogFormValues) {
    try {
      const result = await updateBlog(blog.id, data);
      if (result?.success) {
        router.replace(`/blog/${blog.id}`);
        toast.success(result.message);
      } else {
        toast.error(
          result?.message || "Ein unerwarteter Fehler ist aufgetreten"
        );
        console.error("Update failed:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Ein Fehler ist beim Aktualisieren des Blogs aufgetreten");
    }
  }

  return (
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
            ? "Änderungen werden gespeichert..."
            : "Änderungen speichern"}
        </Button>
      </form>
    </Form>
  );
}
