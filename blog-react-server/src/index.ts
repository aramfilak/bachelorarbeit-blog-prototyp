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
import { blogFormSchema, blogs } from "./db/schema.js";
import { eq } from "drizzle-orm";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(morgan("dev"));
app.use(express.json());

/**
 * @Description Middleware to validate blog data
 */
const validateBlog = (req: Request, res: Response, next: NextFunction) => {
  const result = blogFormSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid blog data",
      errors: result.error.flatten().fieldErrors,
    });
  }
  next();
};

/**
 * @Method GET
 * @Route /blog
 * @Description Get all blogs
 */
app.get("/blog", async (_req, res) => {
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
      error,
    });
  }
});

/**
 * @Method GET
 * @Route /blog/:id
 * @Description Get a blog by id
 */
app.get("/blog/:id", async (req, res) => {
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
      error,
    });
  }
});

/**
 * @Method POST
 * @Route /blog
 * @Description Create a blog
 */
app.post("/blog", validateBlog, async (req, res) => {
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
      error,
    });
  }
});

/**
 * @Method PUT
 * @Route /blog/:id
 * @Description Update a blog
 */
app.put("/blog/:id", validateBlog, async (req, res) => {
  try {
    const [blog] = await db
      .update(blogs)
      .set(req.body)
      .where(eq(blogs.id, parseInt(req.params.id)))
      .returning();

    if (!blog) {
      res.status(404).json({ success: false, message: "Blog nicht gefunden" });
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
      error,
    });
  }
});

/**
 * @Method DELETE
 * @Route /blog/:id
 * @Description Delete a blog
 */
app.delete("/blog/:id", async (req, res) => {
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
      error,
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
