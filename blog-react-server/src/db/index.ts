import mongoose from "mongoose";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
  } catch (err) {
    throw new Error("MongoDB connection error: " + err);
  }
}

const blogSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, maxlength: 255 },
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true, maxlength: 512, default: "" },
    tags: { type: [String], required: true, default: [] },
    readingTime: { type: Number, required: true },
    readingTimeUnit: { type: String, required: true, maxlength: 50 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export { connectToDatabase, Blog };
