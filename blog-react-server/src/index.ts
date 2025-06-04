import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(morgan("dev"));
app.use(express.json());

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
