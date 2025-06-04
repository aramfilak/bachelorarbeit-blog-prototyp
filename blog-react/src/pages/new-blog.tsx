"use client";

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
import { NavLink, useNavigate } from "react-router";
import type { Blog, BlogResponse } from "@/types/blog";

export default function NewBlog() {
  const navigate = useNavigate();
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
      readingTime: 1,
      readingTimeUnit: "minutes",
    },
  });

  const createBlog = async (data: BlogFormValues) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/blog`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const {
      message,
      success,
      error,
      data: blogData,
    } = (await res.json()) as BlogResponse;
    if (success) {
      const blog = blogData as Blog;
      navigate(`/blog/${blog.id}`);
      toast.success(message);
    } else {
      toast.error(message, {
        description:
          typeof error === "string" ? error : "Ein Fehler ist aufgetreten",
      });
      console.log(error);
    }
  };

  async function onSubmit(data: BlogFormValues) {
    await createBlog(data);
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Button asChild variant="ghost" className="mb-4">
        <NavLink to="/">
          <ArrowLeftIcon className="size-4" /> Zurück
        </NavLink>
      </Button>
      <h1 className="text-3xl font-bold mb-8">Neuen Blogbeitrag erstellen</h1>
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
