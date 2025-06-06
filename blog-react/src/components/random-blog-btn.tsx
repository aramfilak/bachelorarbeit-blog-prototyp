import type { NewBlog } from "@/types/blog";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

const generateRandomBlog = (): NewBlog => {
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
    readingTimeUnit: "minutes",
    tags: getRandomTags(),
    imageUrl: `https://picsum.photos/1000/500?random=${Math.random()}`,
  };
};

export function RandomBlogBtn({ refetch }: { refetch: () => void }) {
  const onSubmit = async () => {
    try {
      const randomBlog = generateRandomBlog();
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(randomBlog),
      });

      const { success, message, error } = await res.json();

      if (success) {
        toast.success(message);
        refetch();
      } else {
        toast.error(message, {
          description: error,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(String(error));
    }
  };

  return (
    <Button onClick={onSubmit}>
      Blitz Blog <Zap className="size-4 text-yellow-600" fill="#ffde59" />
    </Button>
  );
}
