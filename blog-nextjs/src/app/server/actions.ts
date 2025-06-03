"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { type BlogFormValues } from "@/components/blog-form/schema";
import { eq } from "drizzle-orm";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1599009434802-ca1dd09895e7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

type CreateBlogResponse =
  | {
      success: boolean;
      message: string;
      data?: { id: number };
    }
  | {
      success: false;
      message: string;
    }
  | null;

export async function createBlog(
  formData: BlogFormValues
): Promise<CreateBlogResponse> {
  try {
    if (!formData.imageUrl) {
      formData.imageUrl = defaultImageUrl;
    }

    const [blog] = await db.insert(blogs).values(formData).returning();

    revalidatePath("/blog");

    return {
      success: true,
      message: "Blog erfolgreich erstellt",
      data: { id: blog.id },
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      message: "Blog konnte nicht erstellt werden",
    };
  }
}

type DeleteBlogResponse =
  | {
      success: boolean;
      message: string;
      data?: { id: number };
    }
  | {
      success: false;
      message: string;
    }
  | null;

export async function deleteBlog(id: number): Promise<DeleteBlogResponse> {
  try {
    await db.delete(blogs).where(eq(blogs.id, id));
    revalidatePath("/blog");
    return {
      success: true,
      message: "Blog erfolgreich gelöscht",
      data: { id },
    };
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return {
      success: false,
      message: "Blog konnte nicht gelöscht werden",
    };
  }
}

type UpdateBlogResponse =
  | {
      success: boolean;
      message: string;
    }
  | {
      success: false;
      message: string;
    }
  | null;

export async function updateBlog(
  id: number,
  formData: BlogFormValues
): Promise<UpdateBlogResponse> {
  try {
    if (!id) {
      return {
        success: false,
        message: "Blog ID ist erforderlich",
      };
    }

    await db
      .update(blogs)
      .set({
        ...formData,
        imageUrl: formData.imageUrl || defaultImageUrl,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id));

    revalidatePath(`/blog/${id}`);
    return {
      success: true,
      message: "Blog erfolgreich aktualisiert",
    };
  } catch (error) {
    console.error("Failed to update blog:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return {
      success: false,
      message: `Blog konnte nicht aktualisiert werden: ${errorMessage}`,
    };
  }
}
