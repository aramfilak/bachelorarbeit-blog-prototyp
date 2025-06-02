import { prisma } from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.blog.findMany();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
