import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db/index.js";
import { Blog, blogFormSchema, blogs } from "./db/schema.js";
import { eq } from "drizzle-orm";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());

type BlogResponse = {
  success: boolean;
  message: string;
  data?: Blog | Blog[];
  error?: string;
};

/**
 * @Description Middleware to validate blog data
 */
const validateBlog: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = blogFormSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Ungültige Blog-Daten",
      error: result.error.errors
        .map((err, index) => `${index + 1}. ${err.message}`)
        .join("\n"),
    });
    return;
  }
  next();
};

/**
 * @Method GET
 * @Route /blog
 * @Description Get all blogs
 */
app.get("/blog", async (_req: Request, res: Response<BlogResponse>) => {
  try {
    const allBlogs = await db.select().from(blogs);
    res.json({
      success: true,
      message: "Blog wurde erfolgreich abgerufen",
      data: allBlogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fehler beim Abrufen der Blogs",
      error: error instanceof Error ? error.message : "Server error",
    });
  }
});

/**
 * @Method GET
 * @Route /blog/:id
 * @Description Get a blog by id
 */
app.get("/blog/:id", async (req: Request, res: Response<BlogResponse>) => {
  try {
    const [blog] = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, parseInt(req.params.id)));
    if (!blog) {
      res.status(404).json({ success: false, message: "Blog nicht gefunden" });
    }
    res.json({
      success: true,
      message: "Blog wurde erfolgreich abgerufen",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fehler beim Abrufen des Blogs",
      error: error instanceof Error ? error.message : "Server error",
    });
  }
});

/**
 * @Method POST
 * @Route /blog
 * @Description Create a blog
 */
app.post(
  "/blog",
  validateBlog,
  async (req: Request, res: Response<BlogResponse>) => {
    try {
      const [blog] = await db.insert(blogs).values(req.body).returning();
      res.json({
        success: true,
        message: "Blog wurde erfolgreich erstellt",
        data: blog,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Fehler beim Erstellen des Blogs",
        error: error instanceof Error ? error.message : "Server error",
      });
    }
  }
);

/**
 * @Method PUT
 * @Route /blog/:id
 * @Description Update a blog
 */
app.put(
  "/blog/:id",
  validateBlog,
  async (req: Request, res: Response<BlogResponse>) => {
    try {
      const [blog] = await db
        .update(blogs)
        .set(req.body)
        .where(eq(blogs.id, parseInt(req.params.id)))
        .returning();

      if (!blog) {
        res
          .status(404)
          .json({ success: false, message: "Blog nicht gefunden" });
      }
      res.json({
        success: true,
        message: "Blog wurde erfolgreich aktualisiert",
        data: blog,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Fehler beim Aktualisieren des Blogs",
        error: error instanceof Error ? error.message : "Server error",
      });
    }
  }
);

/**
 * @Method DELETE
 * @Route /blog/:id
 * @Description Delete a blog
 */
app.delete("/blog/:id", async (req: Request, res: Response<BlogResponse>) => {
  try {
    const [blog] = await db
      .delete(blogs)
      .where(eq(blogs.id, parseInt(req.params.id)))
      .returning();

    if (!blog) {
      res.status(404).json({ success: false, message: "Blog nicht gefunden" });
    }
    res.json({
      success: true,
      message: "Blog wurde erfolgreich gelöscht",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fehler beim Löschen des Blogs",
      error: error instanceof Error ? error.message : "Server error",
    });
  }
});

/*
 * RUN SERVER
 */
(async function run() {
  const port = 3000;
  const serverLocal = `http://localhost:${port}`;

  try {
    console.info("  ➜  Connected to database ✅");

    app.listen(port, () => {
      console.info("  ➜  Server listening on port", port, "🛜");
      console.info("\x1b[1m", " ➜  Local:", "\x1b[36m", serverLocal);
    });
  } catch (e) {
    console.error("\x1b[0;31m", " ➜  Server error 500 🚨");
    console.error(e);
    process.exit(1);
  }
})();
