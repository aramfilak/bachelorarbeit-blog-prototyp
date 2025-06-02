import Image from "next/image";

interface BlogImageProps {
  imageUrl: string;
  title: string;
}

export function BlogImage({ imageUrl, title }: BlogImageProps) {
  return (
    <div className="my-10 relative aspect-[16/9] w-full overflow-hidden ring-1 ring-border">
      <Image
        fill
        src={imageUrl}
        alt={title}
        className="object-cover"
        priority
      />
    </div>
  );
}
