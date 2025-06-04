import { connectToDatabase, Blog } from "./index";

async function seed() {
  await connectToDatabase();

  const sampleBlogs = [
    {
      author: "Alice",
      title: "First Blog Post",
      description: "An introduction to the blog.",
      content: "Welcome to the blog! This is the first post.",
      imageUrl: "https://placehold.co/600x400",
      tags: ["intro", "welcome"],
      readingTime: 2,
      readingTimeUnit: "minutes",
    },
    {
      author: "Bob",
      title: "Second Blog Post",
      description: "A deeper dive into blogging.",
      content: "Let's talk about why blogging is great.",
      imageUrl: "https://placehold.co/600x400",
      tags: ["blogging", "tips"],
      readingTime: 4,
      readingTimeUnit: "minutes",
    },
    {
      author: "Charlie",
      title: "Third Blog Post",
      description: "Advanced blogging techniques.",
      content: "Here are some advanced tips for blogging.",
      imageUrl: "https://placehold.co/600x400",
      tags: ["advanced", "blogging"],
      readingTime: 5,
      readingTimeUnit: "minutes",
    },
  ];

  try {
    await Blog.deleteMany({}); // Clear existing data
    await Blog.insertMany(sampleBlogs);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    process.exit();
  }
}

seed();
