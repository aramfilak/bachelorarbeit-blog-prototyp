"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import { revalidatePath } from "next/cache";
import {
  type BlogFormValues,
  blogFormSchema,
} from "@/components/blog-form/schema";
import { eq } from "drizzle-orm";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1599009434802-ca1dd09895e7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function validateBlogData(formData: BlogFormValues): {
  success: boolean;
  message?: string;
  data?: BlogFormValues;
} {
  const validationResult = blogFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      success: false,
      message:
        "Validierungsfehler: " +
        validationResult.error.errors.map((err) => err.message).join(", "),
    };
  }

  return {
    success: true,
    data: validationResult.data,
  };
}

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
    const validation = validateBlogData(formData);
    if (!validation.success) {
      return {
        success: false,
        message: validation.message!,
      };
    }

    if (!formData.imageUrl) {
      formData.imageUrl = defaultImageUrl;
    }

    const [blog] = await db.insert(blogs).values(formData).returning();

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

    const validation = validateBlogData(formData);
    if (!validation.success) {
      return {
        success: false,
        message: validation.message!,
      };
    }

    await db
      .update(blogs)
      .set({
        ...validation.data!,
        imageUrl: validation.data!.imageUrl || defaultImageUrl,
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

export async function createRandomBlog() {
  const generateRandomBlog = (): BlogFormValues => {
    const titles = [
      "De finibus bonorum et malorum",
      "Sed ut perspiciatis unde omnis iste",
      "Neque porro quisquam est, qui dolorem?",
      "Quis autem vel eum iure reprehenderit",
      "At vero eos et accusamus et iusto odio dignissimos ",
    ];
    const descriptions = [
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",
      "Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",
      "Dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",
      "Sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",
      "Amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",
    ];
    const contents = [
      `
     <p><strong>Lorem ipsum dolor sit <em>amet</em>, consetetur sadipscing elitr, sed diam </strong><br><br>nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 🇩🇪</p><hr class="my-2"><pre class="bg-primary text-primary-foreground p-2 text-sm rounded-md p-1"><code>console.log("hello world! 🌍")</code></pre><hr class="my-2"><p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p><p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. <em>Ut wisi enim ad</em> minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. 🧠</p><p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.<br><br></p><ol class="list-decimal"><li><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 🌄</p></li><li><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam⚡️</p></li><li><p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,<s> consetetur sadipscing elitr, sed diam✅</s><br><br></p></li></ol>`,
    ];
    const authors = [
      "John Doe",
      "Jane Smith",
      "Alex Johnson",
      "Sarah Williams",
      "Mike Brown",
    ];

    const getRandomItem = (array: string[]) => {
      return array[Math.floor(Math.random() * array.length)];
    };

    const getRandomTags = () => {
      const randomTags = [];
      const numTags = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < numTags; i++) {
        randomTags.push(`${Math.random().toString(36).substring(2, 15)}`);
      }

      return randomTags;
    };

    return {
      author: getRandomItem(authors),
      title: getRandomItem(titles),
      description: getRandomItem(descriptions),
      content: getRandomItem(contents),
      readingTime: Math.floor(Math.random() * 10) + 5,
      readingTimeUnit: "minutes" as const,
      tags: getRandomTags(),
      imageUrl: `https://picsum.photos/1000/500?random=${Math.random()}`,
    };
  };

  const randomBlog = generateRandomBlog();
  await createBlog(randomBlog);
  revalidatePath("/");
}
