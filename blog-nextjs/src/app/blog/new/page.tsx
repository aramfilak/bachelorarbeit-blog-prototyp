"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthorTitleFields } from "@/components/blog-form/AuthorTitleFields";
import { ContentFields } from "@/components/blog-form/ContentFields";
import { MediaFields } from "@/components/blog-form/MediaFields";
import { ReadingTimeFields } from "@/components/blog-form/ReadingTimeFields";
import { useRouter } from "next/navigation";
import {
  blogFormSchema,
  type BlogFormValues,
} from "@/components/blog-form/schema";
import { createBlog } from "@/app/server/actions";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function NewBlog() {
  const router = useRouter();
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

  async function onSubmit(data: BlogFormValues) {
    const result = await createBlog(data);
    if (result?.success && result.data) {
      router.push(`/blog/${result.data.id}`);
      toast.success(result.message);
    } else {
      toast.error(result?.message);
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ArrowLeftIcon className="size-4" /> Zurück
        </Link>
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
