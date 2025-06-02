"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export default function NewBlog() {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
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

  async function onSubmit(data: BlogFormValues) {
    console.log(data);
    // TODO: Implement the API call to save the blog
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Neuen Blogbeitrag erstellen</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AuthorTitleFields />
          <MediaFields />
          <ReadingTimeFields />
          <ContentFields />

          <Button type="submit" className="w-full">
            Veröffentlichen
          </Button>
        </form>
      </Form>
    </div>
  );
}
